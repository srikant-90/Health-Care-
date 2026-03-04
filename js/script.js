let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};
const doctors = [
  {
    name: "Dr. Chinmaya Debasis Panda",
    degree: "MBBS, MD (Diabetology Specialist)",
    experience: "15+ Years",
    image: "image/dr1.jpeg",
  },
  {
    name: "Dr. A V Ranganadham",
    degree: "MBBS, MS - Orthopaedics",
    experience: "12+ Years",
    image: "image/dr2.jpeg",
  },
  {
    name: "Dr. C K Deepa",
    degree: "MBBS, MS - Ophthalmology",
    experience: "13+ Years",
    image: "image/dr3.jpeg",
  },
];

const container = document.getElementById("doctor-container");

if (container) {
  doctors.forEach((doc) => {
    const box = document.createElement("div");
    box.classList.add("box");

    box.innerHTML = `
      <img src="${doc.image}" alt="${doc.name}">
      <h3>${doc.name}</h3>
      <span>${doc.degree}</span>
      <p>Experience: ${doc.experience}</p>
      <button type="button" class="btn" onclick="bookAppointment('${doc.name}')">
  Book Appointment
</button>
    `;

    container.appendChild(box);
  });
}
function bookAppointment(name) {
  document.getElementById("doctor-name").value = name;

  // Scroll to booking section
  document.getElementById("book").scrollIntoView({
    behavior: "smooth",
  });
}
// ===== Appointment Form Submit =====

const form = document.getElementById("appointment-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page reload

    const appointment = {
      patientName: document.getElementById("patient-name").value,
      patientNumber: document.getElementById("patient-number").value,
      patientEmail: document.getElementById("patient-email").value,
      appointmentDate: document.getElementById("appointment-date").value,
      doctorName: document.getElementById("doctor-name").value,
    };

    // Get old appointments or empty array
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Add new appointment
    appointments.push(appointment);

    // Save back to LocalStorage
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment booked successfully!");

    form.reset();
  });
}

// ===== Prevent all # links from jumping =====
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});
