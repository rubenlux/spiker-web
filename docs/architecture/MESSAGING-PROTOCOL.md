# SPIKER — Messaging Protocol & Binary Framing Specification

**Status:** ARCHITECTURE READY — PENDING PHASE 4 IMPLEMENTATION  
**Document ID:** SPK-ARCH-005  
**Data Framing:** Binary TLV (Type-Length-Value) with AEAD ChaCha20-Poly1305  

---

## 1. Binary Packet Frame Layout

All link-layer frames transmitted over BLE or Wi-Fi Direct adhere to a strict, compact binary layout:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|       Magic (0x5350)          |    Version    |  Packet Type  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Flags (16 bits)       | Fragment Idx  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| Total Frags   |              Monotonic Sequence Number        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                      Message UUID (128 bits)                  +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Payload Length (16 bits)                  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|             Encrypted Payload Data (Variable Length)           |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                   Poly1305 AEAD Tag (128 bits)                |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### 1.1 Field Definitions

- **Magic (16 bits):** `0x5350` ("SP" in ASCII) to detect frame boundaries.
- **Version (8 bits):** `0x01` (Current Phase 4 protocol revision).
- **Packet Type (8 bits):**
  - `0x01`: Handshake Frame (Noise XX)
  - `0x02`: Text Message
  - `0x03`: Audio Stream (Opus Frame)
  - `0x04`: File / Telemetry Slice
  - `0x05`: Link-Layer Selective ACK (SACK)
  - `0x06`: Ping / Keep-Alive
  - `0x07`: Mesh Sync Vector / Bloom Filter
- **Flags (16 bits):**
  - Bit 0: Encrypted Payload (`1` = ChaCha20-Poly1305 active)
  - Bit 1: Urgent Priority (bypasses queue tail)
  - Bit 2: Receipt Requested
  - Bit 3: Epidemic Relay Allowed (`1` = mesh store-carry-forward)
- **Fragment Index / Total Frags (8 bits each):** Supports fragmenting large messages into up to 255 discrete MTU slices.
- **Sequence Number (16 bits):** Monotonically increasing per-connection packet counter.
- **Message UUID (128 bits):** Unique RFC 4122 v4 identifier for message deduplication across hops.
- **Payload Length (16 bits):** 0 to 65,535 bytes (bounded by physical MTU).
- **Poly1305 AEAD Tag (128 bits):** Cryptographic authentication tag covering the header and encrypted ciphertext.

---

## 2. MTU Fragmentation & Reassembly (BLE & Wi-Fi)

Because radio layers enforce distinct Maximum Transmission Units (MTU):

| Radio Medium | Layer 2 MTU | SPIKER Max Fragment Payload |
| :--- | :--- | :--- |
| **BLE 4.2 (Legacy)** | 23 bytes (ATT default) | 18 bytes (unusable for rich media, text only) |
| **BLE 5.x (ATT MTU Exchange)** | 247–512 bytes | 200–465 bytes |
| **BLE L2CAP CoC** | Up to 65,535 bytes | 512 bytes (recommended nominal) |
| **Wi-Fi Direct / Wi-Fi Aware** | 1500 bytes (Ethernet standard)| 1400 bytes |

### Fragmentation Algorithm
When payload $P$ exceeds transport fragment capacity:
1. Divide $P$ into $N = \lceil |P| / \text{MaxPayload} \rceil$ segments.
2. Assign shared `Message UUID` and sequential `Fragment Index` ($0 \dots N-1$).
3. Receiver maintains a dynamic reassembly buffer with an expiration timer (30 seconds). Once all $N$ slices arrive, the message is verified via Poly1305 and committed to local storage.

---

## 3. Reliability Layer: Selective ACKs & Sliding Window

To guarantee message delivery without connection stalling:
- **Sliding Window:** Sender maintains an unacknowledged window of up to **8 frames** ($W = 8$).
- **Selective ACK (SACK):** Receiver replies with:
  ```
  [AckSeqNum (16 bits)] + [SelectiveBitmask (32 bits)]
  ```
  Bit $k$ in the mask indicates receipt of packet `AckSeqNum + k`.
- **Retransmission:** If an ACK is missing after $RTO = \text{RTT} \times 1.5 + 50\text{ms}$, only the missing fragments are retransmitted (Selective Repeat ARQ), avoiding expensive re-sends of already-received bytes.

---

## 4. Deduplication & Anti-Replay Architecture

To prevent duplicate processing caused by radio multi-path or mesh store-and-forward loops:
1. **Bloom Filter / Cache:** Receiver maintains an LRU memory cache of the last **10,000 processed Message UUIDs** (persisted to SQLite).
2. **64-bit Anti-Replay Sliding Window:**
   - Any packet with `Sequence Number` older than `HighestSeq - 64` is immediately dropped.
   - A 64-bit bitmask tracks which of the last 64 sequence numbers have been observed. Duplicate sequence numbers are dropped before cryptographic decryption.

