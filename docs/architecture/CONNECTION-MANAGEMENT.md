# SPIKER — Connection Management & Lifecycle State Machine

**Status:** ARCHITECTURE READY — PENDING PHASE 4 IMPLEMENTATION  
**Document ID:** SPK-ARCH-004  
**Scope:** Transport Negotiation, Group Formation, and Session Resumption  

---

## 1. The 8-Stage Connection Lifecycle

Every ad-hoc radio communication between two SPIKER nodes progresses through a deterministic 8-stage lifecycle:

```
[1. Proximity Discovery]
         |
[2. Cryptographic Identity Beacon]
         |
[3. Transport Negotiation & GO Election]
         |
[4. Mutual Zero-Trust Handshake (Noise XX)]
         |
[5. Secure Encrypted Channel Establishment]
         |
[6. Multiplexed Binary Frame Exchange]
         |
[7. Heartbeat & Keep-Alive Monitoring]
         |
[8. Teardown / 0-RTT Session Resumption]
```

### Stage 1: Proximity Discovery
The nodes detect each other's RF footprint via BLE advertisements containing the 128-bit SPIKER Service UUID.

### Stage 2: Cryptographic Identity Beacon
The initiating node connects to the peer's BLE GATT Server and reads the Identity Characteristic, obtaining the peer's ephemeral public key ($E_{peer}^{pub}$) and protocol capabilities.

### Stage 3: Transport Negotiation & Group Owner Election
Nodes determine the optimal transport medium based on payload size:
- Small text or telemetry (< 2 KB): Transmitted directly over **BLE GATT / L2CAP CoC**.
- Large files or voice stream: Upgraded to **Wi-Fi Direct** or **Wi-Fi Aware (NAN)**.
- **Group Owner (GO) Tie-Breaker:** When both nodes simultaneously request to be Wi-Fi Direct Group Owner:
  $$\text{Score}_A = \text{SHA256}(IK_A^{pub} \parallel \text{SessionNonce})$$
  $$\text{Score}_B = \text{SHA256}(IK_B^{pub} \parallel \text{SessionNonce})$$
  The node with the numerically higher score assumes the Group Owner (GO) role and hosts the soft-AP DHCP server.

### Stage 4: Mutual Zero-Trust Handshake (Noise XX)
A 3-message cryptographic handshake authenticates both parties without transmitting identities in plaintext:
1. $A \to B$: $e$ (initiator ephemeral key)
2. $B \to A$: $e$, $ee$, $s$, $es$ (responder ephemeral, DH exchanges, encrypted responder static key)
3. $A \to B$: $s$, $se$ (encrypted initiator static key, final DH exchange)

### Stage 5: Secure Encrypted Channel Establishment
Both nodes derive directional symmetric session keys:
- $K_{A \to B}$ (ChaCha20-Poly1305 key for frames from A to B)
- $K_{B \to A}$ (ChaCha20-Poly1305 key for frames from B to A)
- Initial sequence numbers reset to 0.

### Stage 6: Multiplexed Binary Frame Exchange
Nodes transmit fragmented binary TLV packets (text messages, audio frames, sync vectors) interleaved with selective acknowledgments.

### Stage 7: Heartbeat & Keep-Alive Monitoring
- Periodic 4-byte ping frames sent every **15 seconds** during radio inactivity.
- If no response or link ACK is received within **45 seconds** (3 consecutive misses), the transport is marked disconnected.

### Stage 8: Teardown / 0-RTT Session Resumption
- Upon link failure or user moving out of RF range, both nodes store a short-lived **Session Resumption Token ($SRT$)** valid for **30 minutes**.
- If radio contact is re-established within the window, the nodes execute a 1-round-trip 0-RTT reconnection, bypassing full Diffie-Hellman renegotiation.

---

## 2. Connection State Machine

```
                      +-------------------+
                      |   STATE: IDLE     |
                      +-------------------+
                                |
                   (BLE Advert / Scan Match)
                                v
                      +-------------------+
                      | STATE: DISCOVERED |
                      +-------------------+
                                |
                     (GATT / L2CAP Connected)
                                v
                      +-------------------+
                      | STATE: HANDSHAKING|
                      +-------------------+
                                |
                     (Noise XX Auth Verified)
                                v
                      +-------------------+
    +---------------->| STATE: ENCRYPTED  |<----------------+
    |                 +-------------------+                 |
    |                           |                           |
(Data Flow)             (Payload > 2KB)            (Transport Downgrade)
    |                           v                           |
    |                 +-------------------+                 |
    +-----------------| STATE: P2P_WIFI   |-----------------+
                      +-------------------+
                                |
                      (RF Loss / Link Drop)
                                v
                      +-------------------+
                      | STATE: SUSPENDED  |
                      |   (0-RTT SRT)     |
                      +-------------------+
                                |
                       (TTL Expired > 30m)
                                v
                      +-------------------+
                      | STATE: TERMINATED |
                      +-------------------+
```

---

## 3. Timeout & Retry Matrix

| Parameter | Default Value | Maximum Bound | Action on Breach |
| :--- | :--- | :--- | :--- |
| **GATT Connection Timeout** | 5,000 ms | 10,000 ms | Abort, retry with backoff |
| **Wi-Fi Direct Group Formation** | 7,000 ms | 12,000 ms | Fallback to BLE L2CAP |
| **Handshake Response Timeout** | 3,000 ms | 5,000 ms | Discard session keys, reset state |
| **Frame Link ACK Timeout** | 350 ms | 1,200 ms | Retransmit frame (max 3 retries) |
| **Session Resumption Window** | 30 minutes | 60 minutes | Invalidate token, force full handshake |
