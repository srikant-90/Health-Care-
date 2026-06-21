# E-Care — Clinic Booking & Specialist Routing Portal

**E-Care** is a two-sided healthcare booking simulator and clinic queue routing platform. It bridges the gap between patient pre-consultation diagnostics and clinic operations, turning a static booking form into an interactive patient-doctor management ecosystem.

Developed to tackle real-world clinic congestion, patient misrouting, and scheduling transparency.

---

## 🚀 Key Problems Solved

### 1. Patient Specialty Misrouting (The Smart Diagnostic Router)
* **The Problem**: Patients booking appointments online often select the wrong specialist for their symptoms (e.g., booking a General Physician when they need an Orthopedist), leading to clinic bottle-necks, scheduling delays, and patient frustration.
* **The Solution**: An interactive **Smart Symptom Checker** (`symptom-checker.html`). It uses a weighted rule-based routing algorithm to evaluate symptoms (Metabolic, Bone/Joint, Vision, Respiratory) and recommend the correct specialist (e.g., Diabetologist vs Orthopaedist). A one-click deep link auto-fills the doctor's name on the booking form and scrolls the patient to checkout.

### 2. Clinic Administrative Gaps (The Admin Dashboard)
* **The Problem**: Healthcare front-desk staff need a direct interface to manage appointment queues, confirm availability, and cancel/reschedule bookings in real time.
* **The Solution**: A central **Hospital Dashboard** (`admin.html`) containing:
  * **Real-time KPI metrics**: Dynamic counters for Total Bookings, Confirmed, Pending, and Cancelled slots.
  * **Advanced Filters**: Real-time table searching by Patient Name/Phone and instant filtering by specialization or scheduling status.
  * **Queue Actions**: Immediate scheduling updates (Confirm, Cancel, or Delete) with zero lag.

### 3. Patient Tracking Transparency (Patient Booking Tracker)
* **The Problem**: Patients have no way to verify if their reservation was saved or track whether it was approved by clinic staff.
* **The Solution**: A persistent **My Bookings** panel on the homepage. It pulls records from local storage, dynamically sorting newest bookings first, and reflects confirmation updates made in the admin panel.

---

## 🛠️ Architecture & Tech Stack

The application is built entirely as a client-side architecture simulating server database state using browser persistent storage.

```
       [Symptom Checker]              [Booking Form]
              │                              │
              ▼                              ▼
     (Route & Recommend)              (Create Booking)
              │                              │
              └──────────────┬───────────────┘
                             │
                             ▼
                    [LocalStorage Database]
                     (Local JSON Records)
                             │
              ┌──────────────┴───────────────┐
              │                              │
              ▼                              ▼
     [My Bookings Panel]             [Admin Dashboard]
    (Patient-side Tracker)          (Staff confirmation)
```

* **Frontend Layout**: Semantic HTML5 & Modern CSS3 (Variables, Flexbox, CSS Grid, Transitions, Keyframe Animations, Glassmorphic Modals).
* **Logical Engine**: Vanilla JavaScript (ES6 DOM Manipulation, Event Listeners).
* **URL Parameter APIs**: `URLSearchParams` parses referral metrics from the diagnostic routing wizard to streamline checkouts.
* **Client-Side database**: HTML5 Web Storage (`localStorage`) persists appointments, simulating backend storage without API overhead.

---

## 📂 Project Directory Structure

```
E-Care-2025/
├── index.html                 # Patient Landing Page & Booking form
├── admin.html                 # Clinic Administrative Dashboard
├── symptom-checker.html       # Smart Symptom Routing wizard
├── service-checkups.html      # Free checkups informational subpage
├── service-ambulance.html     # Ambulance service subpage
├── service-doctors.html       # Doctors details page
├── service-medicines.html     # Medicines network page
├── js/
│   ├── script.js              # Home navbar, bookings rendering, prefill controllers
│   └── admin.js               # Admin filters, statistics & action controls
└── css/
    ├── e-care.css             # Main styling, modals, and landing layouts
    ├── admin.css              # Dashboard grids, tables & KPI widgets styling
    ├── symptom-checker.css    # Interactive wizard form styles
    └── service.css            # Standardized layout styles for service pages
```

---

## 🚀 How to Run the Project

1. Clone or download the repository to your local directory.
2. Open `index.html` in any web browser to access the Patient portal.
3. Book an appointment. You'll see a success modal prompting confirmation.
4. Scroll to the bottom of the home page to find your booking under **My Bookings** (marked as **Pending**).
5. Click **Admin Portal** in the navigation header. Use this page to search, filter, and click **Confirm** or **Cancel** on the booking.
6. Return to `index.html` to see the status automatically update.
