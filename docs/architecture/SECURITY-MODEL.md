# SPIKER — Security Architecture & Threat Model

**Status:** ARCHITECTURE READY — PENDING PHASE 4 IMPLEMENTATION  
**Document ID:** SPK-ARCH-007  
**Cryptographic Primitives:** Noise Protocol Framework (Noise_XX), Double Ratchet, ChaCha20-Poly1305, Ed25519, X25519  

---

## 1. Threat Model & Adversarial Capabilities

SPIKER assumes an **untrusted, hostile physical and radio environment**. Communication occurs over broadcast radio channels (2.4 GHz / 5 GHz) accessible to adversaries equipped with high-gain software-defined radios (SDR), automated RF sniffers, and active jamming/injection equipment.

| Threat Class | Adversary Action | SPIKER Mitigation Mechanism |
| :--- | :--- | :--- |
| **Passive Radio Eavesdropping** | Intercepting BLE/Wi-Fi packets to reconstruct conversations or data. | End-to-end encryption using **ChaCha20-Poly1305**; zero plaintext data over the air. |
| **Active Man-in-the-Middle (MitM)** | Intercepting, modifying, or spoofing handshake packets in real-time. | **Noise XX mutual authentication** + Out-of-band verification via QR code / Short Authentication Strings (SAS). |
| **Replay & Reflection Attacks** | Capturing valid encrypted packets and re-transmitting them later to cause duplicate execution or state disruption. | **128-bit Message UUIDs**, monotonic sequence numbers, and a 64-bit sliding window anti-replay filter. |
| **RF Triangulation & Surveillance** | Tracking physical device movement by correlating static MAC addresses or advertised IDs. | **Ephemeral Radio Identifiers (EID)** rotating every 15 minutes; hardware MAC address randomization. |
| **Malicious Mesh Relaying** | Rogue nodes tampering with or inspecting forwarded packets in an ad-hoc mesh. | **End-to-End Cryptographic Envelopes**; relays have zero access to decryption keys or inner metadata. |
| **Traffic Analysis & Fingerprinting** | Inferring message types or voice activity based on packet lengths and intervals. | **Fixed-Block Padding**; packets padded to 128-byte increments to mask exact payload size. |
| **Denial of Service (DoS) via Flooding** | Overloading node queues by broadcasting millions of bogus radio frames. | **Link-Layer Cryptographic Pre-Filters**; unauthenticated frames dropped at radio buffer without database writes. |

---

## 2. End-to-End Encryption: Double Ratchet & Noise XX

SPIKER combines the **Noise Protocol Framework (Noise_XX pattern)** for initial connection establishment with the **Double Ratchet Algorithm** for ongoing session protection:

```
+-----------------------------------------------------------------------------+
|                          DOUBLE RATCHET STATE                               |
|                                                                             |
|  [Root KDF Chain]                                                           |
|         |                                                                   |
|   (DH Step: Alice & Bob generate new ephemeral X25519 pairs)                |
|         v                                                                   |
|  [Sending Chain Key]  ===========> [Message Key 1] -> Encrypt Frame 1       |
|         |                                                                   |
|         v                                                                   |
|  [Sending Chain Key]  ===========> [Message Key 2] -> Encrypt Frame 2       |
|                                                                             |
|  [Receiving Chain Key] ==========> [Message Key 1] -> Decrypt Frame 1       |
+-----------------------------------------------------------------------------+
```

### 2.1 Cryptographic Guarantees

1. **Forward Secrecy:** Each message is encrypted with a distinct, single-use message key derived from the symmetric ratchet. Once a message key is used, it is irrevocably deleted from memory. If an attacker captures the device at time $t$, they cannot decrypt any messages sent prior to $t$.
2. **Post-Compromise Security (Break-in Recovery):** Every round-trip message exchange triggers a Diffie-Hellman ratchet step, mixing new fresh entropy into the root key. Even if an attacker temporarily extracts the entire state of a node, they lose decryption ability as soon as the compromised node performs a single unobserved DH ratchet step.

---

## 3. Metadata Privacy & Traffic Analysis Defense

Passive RF monitors can learn communication relationships even from encrypted traffic by observing packet timing and frame sizes:
1. **Header Encryption:** The packet header (flags, message type, fragment count) is encrypted with the session key; passive observers cannot distinguish an audio packet from a text message.
2. **Fixed-Size Block Padding:** Payloads are padded with PKCS#7 / zero-bytes to the nearest 128-byte boundary, preventing payload fingerprinting.
3. **No Central Telemetry:** No crash reporting, analytics, or behavioral telemetry is gathered or transmitted.

---

## 4. Post-Quantum Transition Roadmap

While current SPIKER builds rely on Ed25519 and X25519 (classical 128-bit security level), the architecture includes a formal pathway for **Hybrid Post-Quantum Cryptography (PQC)**:
- Target algorithm: **ML-KEM (FIPS 203 / Kyber-768)** combined with X25519 in a dual-KEM construction:
  $$\text{SharedSecret} = \text{HKDF}(\text{SS}_{X25519} \parallel \text{SS}_{\text{ML-KEM-768}})$$
- Scheduled for Phase 4.6 evaluation to ensure long-term resilience against "Harvest Now, Decrypt Later" adversaries.
