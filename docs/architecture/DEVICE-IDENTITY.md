# SPIKER — Device Identity & Cryptographic Keystore Specification

**Status:** ARCHITECTURE READY — PENDING PHASE 4 IMPLEMENTATION  
**Document ID:** SPK-ARCH-002  
**Standard:** Cryptographic Device Identification & Privacy Shielding  

---

## 1. Identity Model Overview

In the SPIKER decentralized ecosystem, device identity is rooted purely in asymmetric cryptography. Devices have **no telephone numbers, SIM card bindings, email addresses, or cloud-assigned UUIDs**.

A device identity consists of:
1. **Long-Term Identity Keypair ($IK$):**
   - **$IK_{sign}$ (Ed25519):** 256-bit elliptic curve keypair used for signing identity assertions, protocol handshakes, and public credentials.
   - **$IK_{dh}$ (X25519):** Converted or paired Montgomery curve keypair used for Diffie-Hellman static key agreement.
2. **Ephemeral Radio Identifiers ($EID$):**
   - A 16-byte pseudorandom identifier broadcast in BLE advertising packets and Wi-Fi Direct beacons.
   - Rotates periodically (every 15 minutes or upon each physical transport reconnect) to prevent RF triangulation, MAC-address correlation, and physical surveillance.

---

## 2. Key Derivation & Hierarchy

All keys are derived using **HKDF-SHA256** (RFC 5869) from an entropy seed initialized during the first application launch:

```
+-------------------------------------------------------------+
|             Master Entropy Seed (256-bit CSPRNG)            |
+-------------------------------------------------------------+
                              |
                     HKDF-Expand(PRK, Info)
                              |
      +-----------------------+-----------------------+
      |                                               |
      v                                               v
+-----------------------------+     +-----------------------------+
| Long-term Ed25519 Keypair   |     | Ephemeral Rotation Seed     |
| (Identity Signing)          |     | (EID Generation)            |
+-----------------------------+     +-----------------------------+
      |                                               |
      v                                               v
+-----------------------------+     +-----------------------------+
| Derived X25519 Keypair      |     | EID[t] = HMAC-SHA256(       |
| (Static Diffie-Hellman)     |     |   Seed, Epoch_15min         |
+-----------------------------+     +-----------------------------+
```

---

## 3. Ephemeral Radio Identifier (EID) Generation

To protect users against RF tracking in contested or adversarial environments:

$$\text{Epoch} = \lfloor \frac{\text{UnixTime}}{900} \rfloor$$
$$\text{EID}_t = \text{Truncate}_{128}(\text{HMAC-SHA256}(K_{eid}, \text{Epoch} \parallel \text{Salt}))$$

- When two peers have previously paired (trusted contacts), they exchange an $EID$ matching secret ($K_{eid}$). This allows a peer to recognize a trusted friend's beacon without revealing the friend's real identity to passive eavesdroppers.
- For unknown peers in "Public Discovery Mode", a cryptographically random nonce is combined with a public capability flag byte.

---

## 4. Hardware-Backed Secure Storage

Private keys must never exist in plaintext on non-volatile flash storage.

| Platform | Target Keystore Technology | Protection Level |
| :--- | :--- | :--- |
| **Android 9–15** | Android KeyStore Provider with StrongBox Keymaster / TEE | Hardware isolation (`KeyProperties.PURPOSE_SIGN`), biometric authorization gating, user-presence validation. |
| **iOS 15–18** | Apple Keychain Services backed by the Secure Enclave (SEP) | `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` + ECC NIST P-256 / Secure Enclave hardware wrapping for Ed25519 seeds. |
| **Windows 10/11** | Windows Cryptography API: Next Generation (CNG) / DPAPI | TPM 2.0 sealed hardware keys (`MS_PLATFORM_KEY_STORAGE_PROVIDER`). |

---

## 5. Contact Verification & Trust Establishment

Because SPIKER operates without a central Certificate Authority (CA):

1. **Out-of-Band QR Code Exchange (In-Person):**
   - Users scan each other's visual QR code containing:
     $$\text{QR} = \text{Base64URL}(IK_{sign}^{pub} \parallel IK_{dh}^{pub} \parallel \text{Fingerprint} \parallel \text{Nickname})$$
2. **Short Authentication String (SAS):**
   - During the first ad-hoc radio handshake between unverified peers, the protocol computes a 4-word mnemonic or 6-digit decimal SAS from the shared handshake hash:
     $$\text{SAS} = \text{KDF}(\text{HandshakeHash}) \pmod{10^6}$$
   - Users verbally compare the SAS to ensure no Man-in-the-Middle (MitM) active interception.

