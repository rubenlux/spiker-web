# SPIKER — Offline-First Architecture & Store-and-Forward Engine

**Status:** ARCHITECTURE READY — PENDING PHASE 4 IMPLEMENTATION  
**Document ID:** SPK-ARCH-006  
**Storage Engine:** Local Encrypted SQLite (SQLCipher 256-bit AES)  
**Routing Paradigm:** Delay-Tolerant Networking (DTN) / Epidemic Store-Carry-Forward  

---

## 1. Zero Cloud Dependency Guarantee

SPIKER is designed with a strict **Offline-First Invariant**:
> The application must achieve 100% operational functionality for discovery, pairing, text messaging, voice communication, and message relaying when operating in an isolated Faraday cage with cellular, internet, Wi-Fi infrastructure, and GPS disabled.

Under no circumstances does the messaging core make outbound calls to cloud databases, Supabase servers, or remote certificate providers.

---

## 2. Local Encrypted Datastore (SQLCipher)

All persistent data resides inside a hardware-isolated SQLite database encrypted with **SQLCipher (AES-256 in CBC mode with PBKDF2/HMAC-SHA512 key derivation)**.

### 2.1 Database Schema Overview

```sql
-- Core Contacts & Public Key Registry
CREATE TABLE contacts (
    public_key TEXT PRIMARY KEY,       -- 32-byte Ed25519 Public Key (Hex)
    x25519_key TEXT NOT NULL,          -- 32-byte X25519 DH Key (Hex)
    nickname TEXT NOT NULL,            -- Local user-assigned label
    trust_level TEXT NOT NULL,         -- 'unverified', 'verified_sas', 'verified_qr'
    last_seen_epoch INTEGER,           -- Timestamp of last direct radio contact
    created_at INTEGER NOT NULL
);

-- Store-and-Forward Outbound & Inbound Message Queue
CREATE TABLE message_queue (
    message_uuid TEXT PRIMARY KEY,     -- 16-byte UUID
    sender_pubkey TEXT NOT NULL,       -- Originator public key
    recipient_pubkey TEXT NOT NULL,    -- Final destination public key (or 0x00 for broadcast)
    payload_ciphertext BLOB NOT NULL,  -- ChaCha20-Poly1305 encrypted content
    payload_type INTEGER NOT NULL,     -- 1: Text, 2: Audio, 3: File, 4: Telemetry
    priority INTEGER NOT NULL,         -- 0: Emergency, 1: High, 2: Standard, 3: Bulk
    status TEXT NOT NULL,              -- 'draft', 'queued', 'transmitting', 'delivered_link', 'read_receipt', 'expired'
    hop_count INTEGER DEFAULT 0,       -- Number of intermediate mesh relays
    max_hops INTEGER DEFAULT 4,        -- Maximum allowable mesh hops
    created_at INTEGER NOT NULL,       -- Unix timestamp
    expires_at INTEGER NOT NULL,       -- TTL expiration timestamp
    delivery_receipt_received INTEGER  -- Boolean flag
);

-- Anti-Replay & Deduplication Cache
CREATE TABLE message_dedup_cache (
    message_uuid TEXT PRIMARY KEY,
    received_at INTEGER NOT NULL
);

-- Ephemeral Session Tokens (0-RTT Reconnect)
CREATE TABLE session_resumption_tokens (
    peer_pubkey TEXT PRIMARY KEY,
    resumption_token BLOB NOT NULL,
    session_secret BLOB NOT NULL,
    valid_until INTEGER NOT NULL
);
```

---

## 3. Message Lifecycle & State Machine

```
   [DRAFT]
      |
 (User Send)
      v
   [QUEUED] <------------------------------------------+
      |                                                |
 (Radio Contact Established)                   (Transmission Failed)
      v                                                |
 [TRANSMITTING] ---------------------------------------+
      |
 (Selective Link ACK Received)
      v
[DELIVERED_LINK]
      |
 (End-to-End Cryptographic Read Receipt)
      v
 [READ_RECEIPT]
      |
 (TTL Expiration / Retention Purge)
      v
   [EXPIRED] ---> [PURGED FROM DISK]
```

---

## 4. Store-Carry-Forward & Epidemic Relaying

When two SPIKER nodes encounter each other via BLE/Wi-Fi:
1. **Sync Vector Exchange:** Nodes exchange a compact **Bloom Filter (128 bytes)** representing the message UUIDs currently in their local queue.
2. **Missing Message Identification:** Node A determines which messages it holds destined for other mesh participants that Node B has not yet encountered.
3. **Opportunistic Relay:** Node A transmits encrypted bundles to Node B with `hop_count = hop_count + 1`.
4. **Zero Knowledge for Relays:** Intermediate relay nodes **cannot decrypt message contents or read metadata**; they carry opaque ciphertext envelopes until coming into radio range of the final recipient.

---

## 5. Storage Quota & TTL Garbage Collection

To prevent flash memory exhaustion on constrained mobile hardware:
- **Maximum Storage Cap:** Default allocation of **500 MB** for the local SPIKER database.
- **TTL Policies:**
  - Emergency Alerts: 72 hours TTL.
  - Standard Direct Messages: 24 hours TTL.
  - Large Audio / Telemetry Attachments: 6 hours TTL.
- **Automatic Eviction:** When disk storage exceeds 90% of the allocated cap, a background vacuum evicts expired and delivered bulk attachments using a Least-Recently-Used (LRU) priority eviction strategy.
