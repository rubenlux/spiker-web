# SPIKER — Device Discovery & Multi-Radio Orchestration

**Status:** ARCHITECTURE READY — PENDING PHASE 4 IMPLEMENTATION  
**Document ID:** SPK-ARCH-003  
**Radios:** BLE 4.2/5.x, Wi-Fi Direct (P2P), Wi-Fi Aware (NAN)  

---

## 1. Discovery Architecture Overview

SPIKER employs a tiered **Dual-Radio Discovery Architecture**:
1. **Tier 1 — Low-Power Continuous Beaconing (BLE):**
   - Operates continuously in the background at minimal energy consumption.
   - Detects peer proximity, broadcasts rotating Ephemeral IDs ($EID$), and signals readiness for high-bandwidth data transfers.
2. **Tier 2 — High-Bandwidth Ad-Hoc Transport (Wi-Fi Direct / Wi-Fi Aware):**
   - Activated on-demand when high-volume transfers (voice streams, photo attachments, multi-megabyte offline bundle syncing) are required.

```
+-------------------------------------------------------------+
|                      DISCOVERY TIMELINE                     |
|                                                             |
| Peer A (BLE Beacon)  === 150ms Advert ===>   Peer B (BLE Scan)|
|                                                             |
| Peer B               --- BLE Handshake --->  Peer A         |
|                          (Exchange Wi-Fi Direct Creds)      |
|                                                             |
| Peer A & B           <== Establish Wi-Fi Direct P2P Link ==>|
|                                                             |
| [High Speed Channel Established: 15–54 Mbps Throughput]     |
+-------------------------------------------------------------+
```

---

## 2. Bluetooth Low Energy (BLE) Specifications

### 2.1 BLE Advertising Packet Structure (31-byte Payload)

```
Offset | Length | Field Name         | Value / Description
-------+--------+--------------------+--------------------------------------------
0x00   | 1 byte | Length             | 0x02
0x01   | 1 byte | Type               | 0x01 (Flags: LE General Discoverable)
0x02   | 1 byte | Value              | 0x06 (BR/EDR Not Supported, Dual Mode)
0x03   | 1 byte | Length             | 0x11
0x04   | 1 byte | Type               | 0x07 (Complete 128-bit Service UUID)
0x05   | 16 b   | Service UUID       | 0000SPK1-0000-1000-8000-00805F9B34FB
0x15   | 1 byte | Length             | 0x09
0x16   | 1 byte | Type               | 0xFF (Manufacturer Specific Data)
0x17   | 2 byte | Company ID         | 0xFFFF (Experimental / Reserved)
0x19   | 4 byte | Ephemeral Prefix   | EID[0..3] (Rotating 32-bit peer hash)
0x1D   | 1 byte | Radio Capabilities | Bitmask: [0:Wi-Fi Direct, 1:NAN, 2:Voice]
0x1E   | 1 byte | Queue Status       | Bitmask: [0..3: Pending packet count]
```

### 2.2 Duty Cycles & Power Consumption

| State | Advertising Interval | Scan Window | Scan Interval | Estimated Power Draw |
| :--- | :--- | :--- | :--- | :--- |
| **Active Screen-On** | 100 ms | 40 ms | 100 ms (40% duty) | ~18 mA |
| **Standard Background** | 350 ms | 30 ms | 300 ms (10% duty) | ~2.8 mA |
| **Deep Standby (Doze)** | 1280 ms | 20 ms | 1280 ms (1.5% duty)| ~0.4 mA |

---

## 3. Platform-Specific Constraints & Edge Cases

### 3.1 Android (Versions 8 through 15)
- **Permissions:**
  - Android 13+ (API 33+): Requires runtime `android.permission.NEARBY_WIFI_DEVICES` (with `neverForLocation` flag), `BLUETOOTH_SCAN`, and `BLUETOOTH_ADVERTISE`.
  - Android 8–11: Requires `ACCESS_FINE_LOCATION` and active GPS toggle for BLE and Wi-Fi Direct scans.
- **Wi-Fi Scan Throttling:**
  - Starting with Android 9, background applications are restricted to **4 Wi-Fi scans every 2 minutes**.
  - *Mitigation:* Continuous Wi-Fi Direct discovery is prohibited. BLE is used to negotiate connection intent, and `WifiP2pManager.discoverPeers()` is invoked only after a confirmed BLE proximity trigger.
- **Doze Mode & Battery Whitelist:**
  - When the screen is off and device is stationary, Android enters Deep Doze. Alarm timers and network wakeups are batched.
  - *Mitigation:* Foreground service execution with `FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE` notification.

### 3.2 iOS (CoreBluetooth & Multipeer Constraints)
- **Background Advertising Limitations:**
  - When an iOS application enters background:
    1. The device name is completely stripped from advertising packets.
    2. All service UUIDs are placed into a proprietary Apple "overflow area" that can only be detected by iOS devices explicitly scanning with that exact service UUID. Android devices cannot see these UUIDs in standard passive scans.
  - *Mitigation:* Android devices act as persistent Advertisers while iOS devices act as Centrals in background, or cross-platform handshakes initiate when either device brings SPIKER to the foreground.
- **Wi-Fi Direct Socket Prohibition:**
  - iOS strictly blocks direct userland access to Wi-Fi Direct (Wi-Fi P2P Group Owner) sockets.
  - *Mitigation:* SPIKER implements a hybrid transport layer:
    - Android-to-Android: Native Wi-Fi Direct & Wi-Fi Aware (NAN).
    - iOS-to-iOS: `MultipeerConnectivity.framework` / Apple Wireless Direct Link (AWDL).
    - Cross-Platform (Android <-> iOS): BLE GATT L2CAP Connection-Oriented Channels (CoC) or local Wi-Fi Hotspot SoftAP negotiation.

### 3.3 Windows 10/11
- Utilizes the `Windows.Devices.WiFiDirect` namespace and `BluetoothLEAdvertisementWatcher`.
- Requires elevation for automated P2P GO role assignment if not initiated via the standard Windows pairing prompt.
