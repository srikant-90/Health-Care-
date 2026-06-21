let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  // Close dropdown on scroll too
  const dd = document.querySelector(".dropdown-content");
  const btn = document.querySelector(".dropbtn");
  if (dd) dd.classList.remove("show");
  if (btn) btn.classList.remove("active");
};

// ===== Fix #13: Mobile Dropdown Click Toggle =====
// On touch/mobile, :hover doesn't work — add click-based toggle
const dropbtn = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

if (dropbtn && dropdownContent) {
  dropbtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = dropdownContent.classList.contains("show");
    dropdownContent.classList.toggle("show");
    dropbtn.classList.toggle("active");
  });

  // Close dropdown when clicking anywhere outside it
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      dropdownContent.classList.remove("show");
      dropbtn.classList.remove("active");
    }
  });
}

// Set today as the minimum appointment date (Critical Fix: prevents past-date booking)
const dateInput = document.getElementById("appointment-date");
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

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
      id: "APT-" + Date.now(),
      patientName: document.getElementById("patient-name").value,
      patientNumber: document.getElementById("patient-number").value,
      patientEmail: document.getElementById("patient-email").value,
      appointmentDate: document.getElementById("appointment-date").value,
      doctorName: document.getElementById("doctor-name").value,
      patientSymptoms: document.getElementById("patient-symptoms") ? document.getElementById("patient-symptoms").value : "",
      status: "Pending", // Default status for new appointments
      createdAt: new Date().toISOString()
    };

    // Get old appointments or empty array
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Add new appointment
    appointments.push(appointment);

    // Save back to LocalStorage
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Refresh My Bookings display
    renderMyBookings();

    // Show Success Modal
    const modal = document.getElementById("success-modal");
    if (modal) {
      modal.style.display = "flex";

      const closeBtn = document.getElementById("close-modal-btn");
      const closeTimes = document.getElementById("close-modal-times");
      const closeModal = () => { modal.style.display = "none"; };

      if (closeBtn) closeBtn.onclick = closeModal;
      if (closeTimes) closeTimes.onclick = closeModal;

      window.onclick = function(event) {
        if (event.target == modal) closeModal();
      };
    }

    form.reset();

    // Re-set the min date after form reset
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);
    }
  });
}

// ===== Prevent all # links from jumping =====
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

// ===== Reviews Data and Render =====
const reviews = [
  {
    name: "Rajesh Kumar",
    image: "image/sk.jpg",
    stars: 5,
    text: "E-Care made booking my appointment incredibly easy. I selected my doctor, filled in my symptoms, and got a confirmation call within the hour. The staff was professional and the doctor was thorough. Highly recommend this platform to anyone looking for hassle-free healthcare!"
  },
  {
    name: "Priya Mohanty",
    image: "image/chandan.jpg",
    stars: 4,
    text: "I used E-Care to book an appointment for my father who was suffering from a persistent fever. The disease info section helped us understand his symptoms before the visit. The booking process was smooth and the doctor gave us a detailed diagnosis. Very satisfied with the experience."
  },
  {
    name: "Arjun Das",
    image: "image/durga.jpg",
    stars: 5,
    text: "As someone who dreads hospital visits, E-Care changed my perspective completely. The online appointment system is simple, the doctors listed are genuine specialists, and the whole process — from browsing to booking — took under 5 minutes. This is what modern healthcare should look like."
  }
];

const reviewContainer = document.getElementById("review-container");
if (reviewContainer) {
  reviews.forEach(review => {
    const box = document.createElement("div");
    box.classList.add("box");

    // Build star icons dynamically from review.stars value
    const fullStars = Math.floor(review.stars);
    const hasHalf = review.stars % 1 !== 0;
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalf) starsHTML += '<i class="fas fa-star-half-alt"></i>';
    // Empty stars to fill up to 5
    for (let i = fullStars + (hasHalf ? 1 : 0); i < 5; i++) {
      starsHTML += '<i class="far fa-star"></i>';
    }

    box.innerHTML = `
      <img src="${review.image}" alt="${review.name}">
      <h3>${review.name}</h3>
      <div class="stars">${starsHTML}</div>
      <p class="text">${review.text}</p>
    `;
    reviewContainer.appendChild(box);
  });
}

// ===== Blogs Data and Render =====
const blogs = [
  {
    image: "image/blog-1.jpg",
    date: "15th Mar, 2023",
    author: "Health Team",
    title: "Quickly deploy COVID-19 services",
    text: "Rapidly implement and scale essential services up or down as needs change. Healthcare agencies, providers, and payers continue to experience an increase in support needs for high volumes of COVID-19 testing, vaccine scheduling, and credential management services.",
    link: "blog-1.html"
  },
  {
    image: "image/blog-2.jpg",
    date: "22nd Jun, 2023",
    author: "Dr. S. Kumar",
    title: "Unlimited TBHI Training",
    text: "TBHI (Training for Basic Health Improvement) programs focus on educating individuals and healthcare workers about preventive healthcare practices. These trainings cover essential topics such as hygiene awareness, early disease detection, nutrition guidance, and community health management.",
    link: "blog-2.html"
  },
  {
    image: "image/blog-3.jpg",
    date: "10th Sep, 2023",
    author: "E-Care Admin",
    title: "How to Find the Right Doctor for You",
    text: "If you have a medical condition of any kind, finding the right specialist makes all the difference. Healthcare professionals, like physicians and specialists, can help you significantly if you know how to choose the right expert for your specific needs.",
    link: "blog-3.html"
  }
];

const blogContainer = document.getElementById("blog-container");
if (blogContainer) {
  blogs.forEach(blog => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <div class="image">
          <img src="${blog.image}" alt="">
      </div>
      <div class="content">
          <div class="icon">
              <a href="${blog.link}"> <i class="fas fa-calendar"></i> ${blog.date} </a>
              <a href="${blog.link}"> <i class="fas fa-user"></i> by ${blog.author} </a>
          </div>
          <h3>${blog.title}</h3>
          <p>${blog.text}</p>
          <a href="${blog.link}" class="btn"> learn more <span class="fas fa-chevron-right"></span> </a>
      </div>
    `;
    blogContainer.appendChild(box);
  });
}

// ===== My Bookings Renderer =====
function renderMyBookings() {
  const container = document.getElementById("bookings-list");
  if (!container) return;

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  if (appointments.length === 0) {
    container.innerHTML = `
      <div class="no-bookings" style="grid-column: 1/-1; text-align: center; padding: 3rem; background: rgba(255, 255, 255, 0.9); border-radius: .5rem; box-shadow: var(--box-shadow);">
        <i class="fas fa-calendar-times" style="font-size: 4rem; color: var(--light-color); margin-bottom: 1rem;"></i>
        <p style="font-size: 1.6rem; color: var(--light-color);">You have no active appointments booked. Book one above to see it here!</p>
      </div>
    `;
    return;
  }

  // Sort appointments by creation date desc (newest first)
  const sorted = [...appointments].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  container.innerHTML = "";
  sorted.forEach(apt => {
    const card = document.createElement("div");
    card.classList.add("booking-card");
    
    // Status color mapping
    let statusClass = "status-pending";
    if (apt.status === "Confirmed") statusClass = "status-confirmed";
    if (apt.status === "Cancelled") statusClass = "status-cancelled";

    // Format date nicely
    const dateFormatted = new Date(apt.appointmentDate).toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    card.innerHTML = `
      <div class="booking-header">
        <span class="booking-id">${apt.id || 'APT-TEMP'}</span>
        <span class="booking-status ${statusClass}">${apt.status || 'Pending'}</span>
      </div>
      <div class="booking-body">
        <h3><i class="fas fa-user-md"></i> ${apt.doctorName || 'General Consultation'}</h3>
        <p><strong>Patient:</strong> ${apt.patientName}</p>
        <p><strong>Date:</strong> ${dateFormatted}</p>
        <p><strong>Symptoms:</strong> ${apt.patientSymptoms || 'None described'}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// ===== DOMContentLoaded Handlers =====
window.addEventListener("DOMContentLoaded", () => {
  // Parse query parameters for pre-filling doctor
  const urlParams = new URLSearchParams(window.location.search);
  const doctorParam = urlParams.get("doctor");
  
  if (doctorParam) {
    const docInput = document.getElementById("doctor-name");
    if (docInput) {
      docInput.value = doctorParam;
      // Scroll to booking form smoothly
      setTimeout(() => {
        const bookSec = document.getElementById("book");
        if (bookSec) {
          bookSec.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }

  // Initial render of patient bookings
  renderMyBookings();
});

