## 🧪 Mock Data Overview

### 👤 User 1 – Yash

- Having access to **2 firms**:
- **Firm 1**: Sky Accounting _(Vendor)_
- **Firm 2**: EY _(User Firm)_

### 👤 User 2 – Marco

- Having access to **2 firms**:
- **Firm 1**: Cimplico _(Vendor)_
- **Firm 2**: Auditpro Solutions _(User Firm)_

### 👤 User 3 – Admin

- **No firm**

---

## 📦 Features

### Listings

- Each **vendor firm** (Sky Accounting & Cimplico) has:
  - **10 total listings**
    - **7** with `public` visibility
    - **3** with `request_access` visibility

### 📄 Content for Creation

- Both **vendor firms** – **Cimplico** and **Sky Accounting** – have:
  - **5 pieces of content** available for creating listings.
  - Each content object includes a property: `ownerFirmId`.
    - This `ownerFirmId` is mapped to the corresponding firm.
    - The mock SDK uses this mapping to return content specific to each vendor firm.
