// ===== System Parameters & Live Time Clock =====
function updateTime() {
    const clock = document.getElementById("live-time");
    if (!clock) return;
    
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    }) + " | " + now.toLocaleTimeString("en-US", { hour12: false });
    
    clock.innerHTML = `<i class="far fa-clock"></i> System Time: ${formatted}`;
}
setInterval(updateTime, 1000);
updateTime();

// ===== Core Dashboard Operations =====

let appointments = [];

// Load from database (localStorage)
function loadAppointments() {
    appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    calculateKPIs();
    renderTable();
}

// Calculate and render statistics KPIs
function calculateKPIs() {
    const total = appointments.length;
    const confirmed = appointments.filter(apt => apt.status === "Confirmed").length;
    const pending = appointments.filter(apt => apt.status === "Pending" || !apt.status).length;
    const cancelled = appointments.filter(apt => apt.status === "Cancelled").length;

    document.getElementById("stat-total").innerText = total;
    document.getElementById("stat-confirmed").innerText = confirmed;
    document.getElementById("stat-pending").innerText = pending;
    document.getElementById("stat-cancelled").innerText = cancelled;
}

// Render dynamic appointments list
function renderTable() {
    const tableBody = document.getElementById("appointments-body");
    const noData = document.getElementById("no-data-display");
    const table = document.getElementById("appointments-table");

    if (!tableBody) return;

    // Get filters
    const searchVal = document.getElementById("search-input").value.toLowerCase();
    const docVal = document.getElementById("doctor-filter").value;
    const statusVal = document.getElementById("status-filter").value;

    // Filter appointments
    const filtered = appointments.filter(apt => {
        const matchesSearch = 
            (apt.patientName && apt.patientName.toLowerCase().includes(searchVal)) || 
            (apt.patientNumber && apt.patientNumber.includes(searchVal)) ||
            (apt.patientEmail && apt.patientEmail.toLowerCase().includes(searchVal));

        const matchesDoc = !docVal || apt.doctorName === docVal || (docVal === "General Consultation" && !apt.doctorName);
        const matchesStatus = !statusVal || apt.status === statusVal || (statusVal === "Pending" && !apt.status);

        return matchesSearch && matchesDoc && matchesStatus;
    });

    // Sort newest first
    const sorted = [...filtered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    if (sorted.length === 0) {
        tableBody.innerHTML = "";
        table.style.display = "none";
        noData.style.display = "block";
        return;
    }

    table.style.display = "table";
    noData.style.display = "none";
    tableBody.innerHTML = "";

    sorted.forEach(apt => {
        const tr = document.createElement("tr");

        // Format dates
        const dateFormatted = new Date(apt.appointmentDate).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric"
        });

        const statusClass = apt.status === "Confirmed" 
            ? "status-confirmed" 
            : (apt.status === "Cancelled" ? "status-cancelled" : "status-pending");

        tr.innerHTML = `
            <td>
                <div style="font-weight: 600; color: var(--green);">${apt.id || 'N/A'}</div>
                <div style="font-size:1.2rem; color:var(--light-color); margin-top:0.4rem;">Date: ${dateFormatted}</div>
            </td>
            <td>
                <div style="font-weight:600;">${apt.patientName}</div>
                <div style="font-size:1.2rem; color:var(--light-color);"><i class="fas fa-phone-alt"></i> ${apt.patientNumber}</div>
                <div style="font-size:1.2rem; color:var(--light-color);"><i class="fas fa-envelope"></i> ${apt.patientEmail}</div>
            </td>
            <td>
                <div style="font-weight: 500;">${apt.doctorName || 'General Consultation'}</div>
            </td>
            <td style="max-width: 25rem; font-size:1.3rem; line-height:1.4;">
                ${apt.patientSymptoms || '<span style="color:#bbb; font-style:italic;">None entered</span>'}
            </td>
            <td>
                <span class="status-badge ${statusClass}">${apt.status || 'Pending'}</span>
            </td>
            <td>
                <div class="action-group">
                    ${apt.status !== 'Confirmed' ? `
                        <button class="act-btn btn-confirm" onclick="updateStatus('${apt.id}', 'Confirmed')" title="Confirm Appointment">
                            <i class="fas fa-check"></i> Confirm
                        </button>
                    ` : ''}
                    
                    ${apt.status !== 'Cancelled' ? `
                        <button class="act-btn btn-cancel" onclick="updateStatus('${apt.id}', 'Cancelled')" title="Cancel Appointment">
                            <i class="fas fa-ban"></i> Cancel
                        </button>
                    ` : ''}

                    <button class="act-btn btn-delete" onclick="deleteAppointment('${apt.id}')" title="Delete Records">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// ===== Action Functions =====

// Update status of appointment
window.updateStatus = function(id, newStatus) {
    appointments = appointments.map(apt => {
        if (apt.id === id) {
            return { ...apt, status: newStatus };
        }
        return apt;
    });
    localStorage.setItem("appointments", JSON.stringify(appointments));
    calculateKPIs();
    renderTable();
};

// Delete appointment
window.deleteAppointment = function(id) {
    if (confirm("Are you sure you want to permanently delete this appointment record? This action cannot be undone.")) {
        appointments = appointments.filter(apt => apt.id !== id);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        calculateKPIs();
        renderTable();
    }
};

// ===== Bind Filters Event Handlers =====
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-input").addEventListener("input", renderTable);
    document.getElementById("doctor-filter").addEventListener("change", renderTable);
    document.getElementById("status-filter").addEventListener("change", renderTable);
    
    // Initial Load
    loadAppointments();
});
