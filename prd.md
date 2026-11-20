# Product Requirement Document (PRD)

## Project Name: Non-NFC Transit Hub (Malaysia)

**Document Reference:** PRD-NFC-TH-2026-V1  
**Document Status:** Approved / Production Specification  
**Author:** Sourav Barua  
**Creation Date:** March 2026  
**Target Environment:** Web Application (Desktop, Tablet, & Mobile Browsers)  
**Primary Tech Stack:** HTML5, CSS3, JavaScript (ES6+), Chart.js, jsPDF, QRCode.js  

---

## 1. Document Control & Metadata

### 1.1 Revision History

| Revision | Date | Author | Summary of Changes |
| :--- | :--- | :--- | :--- |
| **0.1.0** | 2026-03-01 | Sourav Barua | Initial draft outlining core feature set and user personas. |
| **0.5.0** | 2026-03-10 | Sourav Barua | Added administrative database schemas, gate fare algorithms, and PDF receipt specifications. |
| **1.0.0** | 2026-03-20 | Sourav Barua | Finalized end-to-end PRD incorporating mock API contracts, security matrix, and localized transit rules. |

### 1.2 Review & Approval Matrix

| Stakeholder Role | Name | Status | Approval Date |
| :--- | :--- | :--- | :--- |
| Lead Systems Architect | Sourav Barua | Approved | 2026-03-21 |
| Transit UX Designer | Interface Team | Approved | 2026-03-21 |
| Operations Lead | Rapid KL / TNG Simulator Ops | Approved | 2026-03-22 |

---

## 2. Executive Summary & Business Justification

### 2.1 Project Vision & Mission

The **Non-NFC Transit Hub** is an enterprise-grade digital portal and real-time simulator engineered to bridge the gap between physical, legacy non-NFC transit cards (e.g., standard Touch 'n Go cards, Rapid KL concession passes) and modern digital financial management platforms.

While smartphone-based NFC reloading is increasingly common, millions of commuters rely on physical cards without smartphone chip capabilities—specifically university students, senior citizens, and differently-abled (OKU) cardholders. This system delivers a unified web framework that virtualizes physical cards, enables online reload simulations, manages peer-to-peer balance transfers, automates multi-tier concession fare calculations, renders instantly downloadable PDF receipts, and provides real-time administrative oversight.

### 2.2 Core Business Objectives & KPIs

1. **Queue Mitigation:** Simulate the reduction of physical kiosk queue dependency by up to **75%** through online portal reloads and balance auditing.
2. **Concession Equity:** Guarantee **100% accuracy** in applying the 50% fare reduction for validated Student, OKU, and Senior Citizen pass holders across all simulated LRT/MRT rail lines.
3. **Auditing & Transparency:** Provide continuous end-to-end receipt generation (PDF export) and database change logging for **100%** of monetary transactions (reloads, transfers, gate deductions, admin adjustments).
4. **Zero-Hardware Dependency:** Execute all client-side operations natively inside modern browser runtime environments using standard Web APIs (`localStorage`, `sessionStorage`, Canvas API).

### 2.3 Regulatory & Compliance Framework

Although functioning primarily as a web simulator, the software architecture adheres to key principles modeled after real-world fintech regulations:

* **Personal Data Protection Act 2010 (PDPA Malaysia):** User identification credentials (IC/Passport) are masked by default in the visual user interface.
* **Bank Negara Malaysia (BNM) Interoperability Guidelines:** Stored-value card balances are capped at RM 1,500.00 to prevent unregulated high-value transfer risks.
* **Web Content Accessibility Guidelines (WCAG 2.1 Level AA):** Visual interfaces support high-contrast theme toggles and semantic keyboard navigation for OKU accessibility.

### 2.4 Assumptions & Dependencies

* **Browser Runtime:** Target clients execute modern JavaScript (ES6+).
* **Storage Limits:** Browser `localStorage` quota provides at least 5MB of persistent storage space per domain.
* **Third-Party CDN Dependencies:** Dynamic UI rendering relies on valid script execution of Chart.js (v4.x), jsPDF (v2.x), and QRCode.js.

---

## 3. Problem Statement & Market Analysis

### 3.1 Background of Malaysian Public Transit Ecosystem

The Klang Valley Integrated Transit System (covering LRT Ampang/Sri Petaling Lines, LRT Kelana Jaya Line, MRT Kajang Line, MRT Putrajaya Line, KL Monorail, and Rapid Bus networks) serves over 800,000 daily commuters.

```text
                                KLANG VALLEY TRANSIT NETWORK SIMULATOR
                                
  [ LRT Kelana Jaya ] <-------> [ MRT Kajang Line ] <-------> [ MRT Putrajaya Line ]
           |                                                           |
           +-------------------> [ NON-NFC TRANSIT HUB ] <-------------+
                                           |
                                           v
                       +---------------------------------------+
                       |   CONCESSION ENGINE (50% DISCOUNT)   |
                       |  - Student Pass                       |
                       |  - Senior Citizen Pass                |
                       |  - OKU (Differently-Abled) Pass       |
                       +---------------------------------------+
```

While contactless payment infrastructures exist, physical non-NFC cards remain the primary vehicle for identity verification and subsidized concessions:

* **Student Concession Cards:** Tied to accredited institution enrollments; require annual physical validation.
* **OKU Passes:** Government-issued identity passes granting mandatory half-fare travel.
* **Senior Citizen Cards:** Age-verified physical cards granting half-fare travel.

### 3.2 Key Pain Points

1. **Blind Balance Visibility:** Commuters cannot check physical non-NFC card balances without walking to a physical gate terminal or self-service machine.
2. **Friction in Peer-to-Peer Support:** Parents cannot remotely top up funds for their children's student transit cards.
3. **Lost Receipt Friction:** Paper receipts printed at physical kiosks frequently fade or get lost, making corporate/educational expense claims cumbersome.
4. **Administrative Blind Spots:** Transit operations teams lack unified, real-time analytics displaying concession distribution vs. active/blocked card states.

---

## 4. Stakeholders & User Personas

### 4.1 Persona Profiles

#### Persona 1: Ahmad Bin Razak (University Student)
* **Age:** 21 | **Location:** Subang Jaya, Selangor
* **Card Type:** Student Concession Pass
* **Primary Goal:** Commute daily between SS15 LRT Station and Pasar Seni for classes.
* **Pain Point:** Has limited cash on hand and needs quick DuitNow QR reloads funded by his parents, along with downloadable PDF receipts to claim monthly travel allowances from his university grant.

#### Persona 2: Uncle Tan Kok Wai (Senior Citizen)
* **Age:** 68 | **Location:** Cheras, Kuala Lumpur
* **Card Type:** Senior Citizen Pass
* **Primary Goal:** Travel to hospital appointments via MRT Kajang Line.
* **Pain Point:** Finds small web fonts difficult to read and needs simple visual confirmation that his 50% discount has been correctly applied at gate tap-out.

#### Persona 3: Manager Kumar (Transit System Administrator)
* **Age:** 44 | **Location:** Rapid KL Operations Control Centre
* **Primary Goal:** Audit transit database activity, address customer card balance disputes, and temporarily suspend reported lost cards.
* **Pain Point:** Lacks an intuitive central dashboard to audit transaction streams or instantly restore corrupted user database instances.

---

## 5. System Architecture & Data Flow

### 5.1 Architecture Overview

The system follows a client-side Single-Page Application (SPA) architecture operating across two primary operational views: `index.html` (User Portal) and `admin.html` (Administrative Control Panel). Both views share a single logical data persistence engine backed by browser `localStorage`.

```text
+-----------------------------------------------------------------------------------+
|                                 BROWSER RUNTIME                                   |
|                                                                                   |
|  +-----------------------------------+     +-----------------------------------+  |
|  |       USER PORTAL (index.html)    |     |    ADMIN CONTROL (admin.html)     |  |
|  | - Virtual Card Display            |     | - KPI Analytics (Chart.js)        |  |
|  | - Reload Simulator (FPX/DuitNow)  |     | - User Database Grid              |  |
|  | - P2P Transfer Engine             |     | - Credit/Debit Override Engine    |  |
|  | - Rail Gate Simulator             |     | - Audit System Event Logging      |  |
|  | - jsPDF Statement Generator       |     | - JSON/CSV Backup Engine          |  |
|  +-----------------------------------+     +-----------------------------------+  |
|                    |                                         |                    |
|                    v                                         v                    |
|  +-----------------------------------------------------------------------------+  |
|  |                        CORE JAVASCRIPT ENGINE (script.js)                   |  |
|  | - State Controller   - Fare Calculation Engine   - Card PIN Verification    |  |
|  +-----------------------------------------------------------------------------+  |
|                                         |                                         |
|                                         v                                         |
|  +-----------------------------------------------------------------------------+  |
|  |                        LOCALSTORAGE PERSISTENCE LAYER                       |  |
|  |  [transit_cards]   [transit_transactions]   [transit_logs]   [admin_session]  |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### 5.2 Card Lifecycle State Machine

Every card stored in the system moves through a strictly defined set of operational states:

```text
    +------------------+           Registration           +------------------+
    |  UNREGISTERED    | -------------------------------> |      ACTIVE      |
    +------------------+                                  +------------------+
                                                              |          ^
                                            Report Lost /     |          | Admin
                                            Incorrect PIN     v          | Unblock
                                                        +------------------+
                                                        |      BLOCKED     |
                                                        +------------------+
                                                              |
                                                              | Admin Permanent
                                                              v Delete
                                                        +------------------+
                                                        |     TERMINATED   |
                                                        +------------------+
```

---

## 6. Data Models & Storage Schema

Data is stored persistently in browser `localStorage` as serialized JSON arrays. The core entities are defined below.

### 6.1 `transit_cards` Schema
Key: `transit_cards_db`

```json
[
  {
    "id": "CARD-984210",
    "cardNumber": "3800123456789012",
    "holderName": "AHMAD BIN RAZAK",
    "icPassport": "030512-10-5491",
    "phone": "+601112215903",
    "email": "ahmad.razak@student.edu.my",
    "category": "Student",
    "balance": 45.50,
    "pinHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "status": "Active",
    "failedPinAttempts": 0,
    "createdAt": "2026-01-15T08:30:00.000Z",
    "lastTapStation": null,
    "tapInTimestamp": null
  }
]
```

### 6.2 `transit_transactions` Schema
Key: `transit_transactions_db`

```json
[
  {
    "transactionId": "TXN-20260322-8819",
    "cardNumber": "3800123456789012",
    "type": "GATE_TAP",
    "amount": -1.60,
    "baseFare": 3.20,
    "concessionDiscount": 1.60,
    "originStation": "Ampang Park",
    "destinationStation": "Cyberjaya Utara",
    "paymentMethod": "CARD_BALANCE",
    "timestamp": "2026-03-22T14:22:10.000Z",
    "referenceNote": "LRT/MRT Commute (50% Student Discount Applied)",
    "resultingBalance": 43.90
  }
]
```

### 6.3 `transit_logs` Schema
Key: `transit_logs_db`

```json
[
  {
    "logId": "LOG-10492",
    "timestamp": "2026-03-22T14:25:00.000Z",
    "actor": "ADMIN (admin@transit.my)",
    "action": "BALANCE_OVERRIDE",
    "targetCard": "3800123456789012",
    "details": "Credited RM 10.00. Reason: Customer Service Refund for Faulty Gate Gate-04."
  }
]
```

---

## 7. Detailed Functional Requirements

### Module 1: User Onboarding & Authentication

* **FR-101: Card Registration**  
  The system shall allow users to register a new card by providing Holder Name, Identity/Passport Number, Phone Number, Email, Category selection, and a 4-digit PIN.

* **FR-102: Card Number Auto-Generation**  
  The system shall auto-assign a 16-digit card number prefixed with `3800` followed by 12 random numerical digits.

* **FR-103: Dynamic PIN Hashing**  
  The 4-digit security PIN must be converted into a SHA-256 hash string before storage in `localStorage`. Plaintext PINs must never be persisted.

* **FR-104: Simulated OTP Validation**  
  During registration, the system shall display a modal prompt simulating a 6-digit SMS OTP sent to the user's phone number. The step completes only when the user enters the correct OTP code.

* **FR-105: Session Management**  
  Upon valid login (Card Number/Phone + PIN match), the system shall write the active card's ID to `sessionStorage.getItem('active_user_card')`.

* **FR-106: Failed PIN Lockout**  
  After three (3) consecutive failed login or transfer PIN attempts, the system shall automatically set the card status to `Blocked` and log a security alert event in `transit_logs`.

---

### Module 2: Virtual Card Interface & Visual Display

* **FR-201: Glassmorphic UI Render**  
  The virtual card container shall dynamically update its background CSS gradient depending on the card category:
  * **Standard Adult:** `linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)`
  * **Student:** `linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)`
  * **OKU / Senior Citizen:** `linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`

* **FR-202: Live Balance Synchronizer**  
  The card interface shall update the displayed balance text instantly whenever a transaction occurs without requiring a full page refresh.

* **FR-203: Dynamic QR Code Rendering**  
  Using `QRCode.js`, the system shall render an active QR code on the virtual card containing a payload string formatted as `TRANSIT_CARD:<CardNumber>|<Status>`.

* **FR-204: Masked Sensitive Info**  
  The user interface shall provide an interactive eye toggle to mask or unmask the full 16-digit card number and IC/Passport number.

---

### Module 3: Simulated Wallet Reload Gateways

* **FR-301: Reload Channels**  
  The system shall support three distinct top-up methods in the user modal:
  1. **DuitNow QR:** Render a dynamic QR modal with a 5-minute expiry countdown timer.
  2. **FPX Online Banking:** Provide bank selection dropdown (Maybank2u, CIMB Clicks, Public Bank, RHB, Hong Leong Bank).
  3. **Debit / Credit Card:** Simulated card details input form (16-digit number, expiry date, CVV).

* **FR-302: Preset & Custom Reload Quantities**  
  Users can select quick-reload chip buttons (RM 10, RM 20, RM 50, RM 100) or enter a custom amount between RM 10.00 and RM 500.00.

* **FR-303: Maximum Balance Cap Guard**  
  If a reload attempt would cause the total card balance to exceed **RM 1,500.00**, the transaction must be blocked with an explicit error message: `"Reload declined: Stored value limit of RM 1,500.00 exceeded."`

* **FR-304: Reload Transaction Logging**  
  Every successful top-up must write a positive balance entry (`amount: +X.XX`) into `transit_transactions` and issue an auto-generated receipt ID.

---

### Module 4: Peer-to-Peer (P2P) Balance Transfer System

* **FR-401: Recipient Validation**  
  When initiating a balance transfer, the user must enter the target 16-digit card number. The system shall query `transit_cards` to verify that the target card exists and is in `Active` status.

* **FR-402: Self-Transfer Prevention**  
  The system must reject transfers where the sender card number equals the target card number.

* **FR-403: Sender PIN Re-Authentication**  
  Prior to executing a transfer, the sender must re-enter their 4-digit security PIN.

* **FR-404: Atomic Balance Execution**  
  Transfers must execute atomically:  
  $\text{Sender Balance} = \text{Sender Balance} - \text{Transfer Amount}$  
  $\text{Recipient Balance} = \text{Recipient Balance} + \text{Transfer Amount}$  
  If either update fails, both operations must roll back to original values.

* **FR-405: Minimum Balance Safeguard**  
  Transfers are rejected if $\text{Sender Balance} - \text{Transfer Amount} < \text{RM 5.00}$ to ensure sufficient minimum travel credit remains.

---

### Module 5: Rail Network Fare & Gate Tap Simulator

#### 5.1 Station Network Dataset

The gate simulator incorporates a built-in station fare distance lookup table spanning key Rapid KL rail nodes:

```text
[ Ampang Park ] <---> [ KLCC ] <---> [ KL Sentral ] <---> [ USJ 7 ] <---> [ Cyberjaya Utara ]
```

#### 5.2 Station Base Fare Matrix (RM)

| Origin \ Destination | Ampang Park | KLCC | KL Sentral | USJ 7 | Cyberjaya Utara |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ampang Park** | RM 0.00 | RM 1.30 | RM 2.40 | RM 4.10 | RM 5.80 |
| **KLCC** | RM 1.30 | RM 0.00 | RM 1.90 | RM 3.80 | RM 5.50 |
| **KL Sentral** | RM 2.40 | RM 1.90 | RM 0.00 | RM 3.10 | RM 4.80 |
| **USJ 7** | RM 4.10 | RM 3.80 | RM 3.10 | RM 0.00 | RM 3.40 |
| **Cyberjaya Utara** | RM 5.80 | RM 5.50 | RM 4.80 | RM 3.40 | RM 0.00 |

#### 5.3 Concession Calculation Logic & Formula

The system evaluates the final fare based on the registered card category:

$$
\text{Final Fare} = \begin{cases} \text{Base Fare} \times 0.50 & \text{if Category } \in \{\text{Student}, \text{OKU}, \text{Senior Citizen}\} \\ \text{Base Fare} & \text{if Category } = \text{Standard} \end{cases}
$$

* **FR-501: Entry/Exit Simulation**  
  Users select an **Origin Station** and a **Destination Station** from select dropdowns and click **"Tap Card at Gate"**.

* **FR-502: Insufficient Balance Rejection**  
  If the card balance is less than the calculated final fare, the gate simulator shall display a red warning indicator ("GATE ENTRY DENIED: INSUFFICIENT BALANCE"), sound a simulated error audio tone, and block entry.

* **FR-503: Automated Concession Deduction**  
  Upon successful gate tap execution, the calculated final fare is deducted from `transit_cards`, and a detailed transaction record is stored with specific breakdown notes (e.g., `"LRT Commute: Base RM 5.80 -> 50% Concession Fare RM 2.90"`).

---

### Module 6: Transaction Receipts & Account Statements Engine

#### 6.1 Interactive Receipt Viewer

* **FR-601: Transaction History Table**  
  The user portal shall render a chronologically sorted table displaying date, transaction type, station route/method, amount, and an **"Action"** column.

* **FR-602: Individual Receipt Modal Rendering**  
  Clicking **"View Receipt"** on any row launches a styled slip modal mimicking an official transit terminal receipt:

```text
+-------------------------------------------------------+
|                RAPID KL / TRANSIT HUB                 |
|               OFFICIAL PAYMENT RECEIPT                |
+-------------------------------------------------------+
| Receipt No:     REC-20260322-9912                     |
| Date/Time:      22 MAR 2026, 14:22:10                   |
| Card Number:    3800-****-****-9012                     |
| Holder Name:    AHMAD BIN RAZAK                        |
| Category:       STUDENT (50% CONCESSION)              |
+-------------------------------------------------------+
| Description:    LRT Fare: Ampang Park -> Cyberjaya    |
| Base Fare:      RM 5.80                               |
| Concession Disc: -RM 2.90                             |
+-------------------------------------------------------+
| TOTAL PAID:     RM 2.90                               |
| PAYMENT METHOD: CARD BALANCE                          |
| NEW BALANCE:    RM 42.60                              |
+-------------------------------------------------------+
|          Thank you for commuting with us!             |
+-------------------------------------------------------+
```

* **FR-603: Single Receipt PDF Download (`jsPDF`)**  
  Clicking **"Download PDF Receipt"** programmatically compiles the modal slip into a structured `.pdf` document and triggers an automatic browser file download (`Receipt-REC-20260322-9912.pdf`).

* **FR-604: Full Statement Export**  
  Users can select a date range (e.g., "Last 30 Days") and download a combined PDF account statement or raw CSV data file listing all transactions.

---

### Module 7: Card Security, Lock & Recovery Workflow

* **FR-701: Self-Service Lost Card Reporting**  
  Users can click **"Report Lost/Stolen Card"** on the dashboard. Upon PIN confirmation, the system changes card status to `Blocked` immediately to prevent further unauthorized gate taps or transfers.

* **FR-702: Temporary Security PIN Reset**  
  Users who forget their PIN can initiate a recovery sequence verifying their registered IC/Passport number and email via an SMS OTP prompt. Once validated, the system prompts for a new 4-digit PIN setup.

---

### Module 8: Administrative Control Panel (`admin.html`)

#### 8.1 KPI Metrics & Analytics Dashboard

* **FR-801: Real-Time Counter Widgets**  
  The admin view shall display summary KPI cards:
  * Total Registered Cards
  * Total System Balance Reserve (Sum of all active card balances in RM)
  * Total Volume of Gate Transactions
  * Active Blocked/Suspended Cards Count

* **FR-802: Interactive Chart Integration (`Chart.js`)**  
  Render two real-time visual charts:
  1. **Doughnut Chart:** Breakdown of cards by category (Standard vs. Student vs. OKU vs. Senior).
  2. **Bar Chart:** Daily transaction volume breakdown (Reloads vs. Gate Fares vs. P2P Transfers).

```text
+-----------------------------------------------------------------------------------+
|                            ADMIN CONTROL PANEL KPI BOARD                          |
+-------------------+ +-------------------+ +-------------------+ +-----------------+
| TOTAL CARDS       | | SYSTEM RESERVE    | | TOTAL FARE TAPS   | | BLOCKED CARDS   |
|      1,420        | |   RM 84,250.00    | |      18,940       | |       12        |
+-------------------+ +-------------------+ +-------------------+ +-----------------+
|                                                                                   |
|  [ CHART 1: Card Category Share ]             [ CHART 2: Daily Transaction Type ]  |
|     (Doughnut Chart View)                            (Bar Chart View)             |
+-----------------------------------------------------------------------------------+
```

#### 8.2 User Database Auditing & Administrative Override

* **FR-803: Data Grid Table**  
  Searchable, filterable table listing all registered cards in the system with pagination (10 items per page).

* **FR-804: Manual Balance Adjustment (Credit / Debit)**  
  Admins can click **"Adjust Balance"** on any user row, enter an adjustment amount (positive or negative), and provide a mandatory **Audit Reason text string**.

* **FR-805: Security Override (Block / Unblock / Reset PIN)**  
  Admins can toggle any card between `Active` and `Blocked` states or issue a temporary reset PIN (`1234`).

* **FR-806: System Audit Log Tracking**  
  All administrative balance adjustments or status updates must automatically log a permanent entry into `transit_logs` detailing admin identity, timestamp, target card, and reason string.

#### 8.3 System Maintenance & Data Portability

* **FR-807: Full JSON Database Backup & Restore**  
  Admins can click **"Export System Database"** to download a unified JSON file containing all cards, transactions, and audit logs. The admin panel must provide a file input to restore system state from an uploaded backup JSON file.

* **FR-808: User Registry CSV Export**  
  Admins can download a sanitized CSV spreadsheet of all registered cardholders for offline transit reporting.

---

### Module 9: Localization, Accessibility & Theme Engine

* **FR-901: Multilingual Translation Engine**  
  The application shall support full interface language switching across three languages:
  1. **English (EN)** - Default
  2. **Bahasa Malaysia (BM)**
  3. **Bengali (BN)**  
  All UI buttons, headings, table headers, and system feedback alerts must dynamically update language key values instantly upon dropdown selection.

* **FR-902: Dark / Light Mode Toggle**  
  The interface shall support high-contrast Dark and Light CSS color themes using CSS root custom variables (`:root`). Theme selection persists across user sessions in `localStorage.getItem('preferred_theme')`.

---

## 8. Non-Functional Requirements (NFRs)

### 8.1 Performance & Latency Metrics

* **NFR-101 (DOM Render Time):** Card balance and transaction table re-rendering must execute within **< 50 milliseconds** following state updates.
* **NFR-102 (PDF Generation):** Direct jsPDF receipt generation and document stream assembly must complete within **< 800 milliseconds** from user click.
* **NFR-103 (Storage Footprint):** Client data serialization structures must maintain lightweight profiles (less than 500 KB total storage usage for 1,000 transactions).

### 8.2 Security & Data Integrity

* **NFR-201 (Input Sanitization):** All user inputs across registration, transfer, and admin search inputs must undergo XSS sanitization (escaping HTML characters like `<`, `>`, `&`) before DOM injection.
* **NFR-202 (Session Isolation):** Regular user sessions in `index.html` must not be granted access to administrative override JavaScript functions without valid admin auth flags stored in `sessionStorage`.
* **NFR-203 (PIN Privacy):** Security PINs are never stored or logged in plain text.

### 8.3 Browser Compatibility

* Full functional support guaranteed for:
  * Google Chrome (v110+)
  * Mozilla Firefox (v110+)
  * Apple Safari (v16+)
  * Microsoft Edge (v110+)

---

## 9. Simulated API & Data Interface Contracts

While the current system architecture relies on direct client-side storage, the internal functions are designed as modular mock controllers matching RESTful backend specifications for seamless future API migration.

### Endpoint 1: Card Registration
`POST /api/v1/cards/register`

#### Request Payload
```json
{
  "holderName": "AHMAD BIN RAZAK",
  "icPassport": "030512105491",
  "phone": "+601112215903",
  "email": "ahmad.razak@student.edu.my",
  "category": "Student",
  "pin": "4921"
}
```

#### Response Payload (201 Created)
```json
{
  "status": "success",
  "message": "Transit card created successfully.",
  "data": {
    "cardId": "CARD-984210",
    "cardNumber": "3800123456789012",
    "category": "Student",
    "balance": 0.00,
    "status": "Active"
  }
}
```

### Endpoint 2: Gate Tap Simulation
`POST /api/v1/transit/gate-tap`

#### Request Payload
```json
{
  "cardNumber": "3800123456789012",
  "originStation": "Ampang Park",
  "destinationStation": "Cyberjaya Utara"
}
```

#### Response Payload (200 OK)
```json
{
  "status": "success",
  "data": {
    "transactionId": "TXN-20260322-8819",
    "baseFare": 5.80,
    "concessionDiscount": 2.90,
    "finalFareDeducted": 2.90,
    "previousBalance": 45.50,
    "newBalance": 42.60,
    "timestamp": "2026-03-22T14:22:10.000Z"
  }
}
```

### Endpoint 3: Admin Balance Override
`POST /api/v1/admin/cards/override`

#### Request Payload
```json
{
  "adminToken": "ADM-SESSION-99218",
  "targetCardNumber": "3800123456789012",
  "adjustmentType": "CREDIT",
  "amount": 10.00,
  "auditReason": "Customer service compensation for gate failure."
}
```

#### Response Payload (200 OK)
```json
{
  "status": "success",
  "message": "Card balance adjusted successfully.",
  "data": {
    "cardNumber": "3800123456789012",
    "updatedBalance": 52.60,
    "logId": "LOG-10492"
  }
}
```

---

## 10. Edge Cases, Risk Matrix & Failure Handling

| # | Error Scenario | Trigger Event | System Response & Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **E-01** | Insufficient Balance at Rail Gate | User attempts gate tap with card balance < final calculated fare. | **Block Entry:** Display red visual warning modal `"GATE ENTRY DENIED"`. Sound error tone. Balance remains untouched. |
| **E-02** | Stored Limit Overflow | User attempts reload causing total balance to exceed RM 1,500.00. | **Reject Transaction:** Display notification `"Reload limit exceeded. Maximum card balance capped at RM 1,500.00"`. |
| **E-03** | Transfer to Invalid Card | User enters non-existent card number during P2P transfer. | **Form Error:** Highlight recipient field in red `"Target card number not found in transit registry"`. |
| **E-04** | Transfer to Blocked Card | Recipient card exists but is currently set to `Blocked` status. | **Transaction Block:** Inform sender `"Target card is inactive/blocked. Cannot accept transfers"`. |
| **E-05** | Storage Corruption | Local browser `localStorage` payload corrupted or manually edited via DevTools. | **Fallback Handler:** System catches JSON parse exception, initializes clean fallback database schema, and prompts Admin to restore from JSON backup. |
| **E-06** | Identical Gate Tap Stations | User selects Same Origin and Destination (e.g., Ampang Park to Ampang Park). | **Minimum Fare Charge:** Deduct base minimum rail entry fee (RM 1.00 standard / RM 0.50 concession) as platform entry fee. |
| **E-07** | Concurrent Admin Sessions | Multiple browser tabs attempting simultaneous admin balance edits. | **State Synchronizer:** Register window `storage` event listener in JavaScript to auto-refresh UI across open tabs whenever `localStorage` changes. |

---

## 11. Testing Matrix & Acceptance Criteria

### 11.1 Test Cases (User Acceptance Testing - UAT)

```text
                       UAT EXECUTION FLOW CHART
                       
  [ UAT-01: Reg ] ---> [ UAT-02: Reload ] ---> [ UAT-03: Tap Gate ]
                                                      |
                                                      v
  [ UAT-06: Admin ] <-- [ UAT-05: Receipt ] <-- [ UAT-04: Concession ]
```

#### Test Case UAT-01: Card Registration & Activation
* **Step 1:** Open `index.html` and click "Register Card".
* **Step 2:** Enter valid details (Select category "Student") and set PIN `1234`.
* **Step 3:** Enter simulated OTP `123456`.
* **Pass Criteria:** System creates new card with balance `RM 0.00`, status `Active`, and displays dynamic virtual card container.

#### Test Case UAT-02: DuitNow Top-Up Simulation
* **Step 1:** Click "Reload Funds" on active virtual card.
* **Step 2:** Select "DuitNow QR", choose amount `RM 50.00`.
* **Step 3:** Click "Confirm Simulated Payment".
* **Pass Criteria:** Card balance updates from `RM 0.00` to `RM 50.00` instantly. New transaction entry logged in history table.

#### Test Case UAT-03: Rail Gate Concession Calculation Verification
* **Step 1:** Select Origin `Ampang Park` and Destination `Cyberjaya Utara` (Base Fare = RM 5.80).
* **Step 2:** Click "Tap Card at Gate" on a **Student Concession Card**.
* **Pass Criteria:** System applies 50% discount ($\text{RM } 5.80 \times 0.50 = \text{RM } 2.90$). Balance drops from `RM 50.00` to `RM 47.10`. Transaction details note discount application.

#### Test Case UAT-04: Single PDF Receipt Generation
* **Step 1:** Click "View Receipt" on the gate tap transaction row in transaction history.
* **Step 2:** Click "Download PDF Receipt".
* **Pass Criteria:** Modal compiles transaction data and initiates browser file download of `Receipt-REC-XXXX.pdf` containing valid receipt markup.

#### Test Case UAT-05: Admin Credit Override & Audit Logging
* **Step 1:** Open `admin.html` and authenticate with admin credentials.
* **Step 2:** Locate student card in database grid, click "Adjust Balance".
* **Step 3:** Select "Credit", enter `10.00`, enter reason `"Test Refund"`.
* **Pass Criteria:** User balance increases by RM 10.00. Audit log entry is permanently written in system log table with timestamp and admin ID.

---

## 12. Deployment Setup & Installation Guide

### 12.1 Directory Layout

```text
non-nfc-transit-hub/
├── index.html          # User Portal (Dashboard, Modals, Gate Simulator, Receipts)
├── admin.html          # Admin Control Panel (KPIs, Charts, User Grid, Audit Logs)
├── script.js           # Core Application Logic, Controllers, & LocalStorage Handler
├── style.css           # UI Stylesheet (Glassmorphism, Animations, Themes)
└── PRD.md              # Detailed Product Requirement Document
```

### 12.2 Local Execution

1. Clone the project repository to your local computer:
   ```bash
   git clone https://github.com/baruasourav031/non-nfc-transit-hub.git
   cd non-nfc-transit-hub
   ```

2. Open `index.html` directly in any web browser, or serve using the VS Code **Live Server** extension.

3. Access administrative controls by navigating to `admin.html`. Default admin login credentials:
   * **Email:** `admin@transit.my`
   * **Password:** `admin123`

---

## 13. Future Product Roadmap

### Phase 1: Prototype Launch (Current)
* Pure client-side browser simulator (`localStorage` driven).
* Full fare calculation, concession management, PDF receipt generation, and admin control panel.

### Phase 2: Hardware Reader & Cloud Synchronization
* Integration with WebUSB / WebNFC API for physical smart card reader hardware connected to desktop PCs.
* Node.js / Express backend server implementation with PostgreSQL database migration.

### Phase 3: Mobile Native App Integration
* React Native cross-platform mobile app release with Push Notifications for low balance alerts and integrated Malaysian payment gateways (Touch 'n Go eWallet SDK, FPX Direct API).

---

*End of Product Requirement Document (PRD-NFC-TH-2026-V1).*