document.addEventListener("DOMContentLoaded", () => {

  // ===== NAVBAR ACTIVE LINK =====
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 70;
      if (pageYOffset >= sectionTop) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
  });

  // ===== GALLERY =====
  const gallery = document.getElementById("gallery-grid");
  const loadBtn = document.getElementById("load-more-btn");
  const galleryImages = [
    "./images/Pushkarni.jpg",
    "./images/Fort.jpg",
    "./images/Swamiji1.jpg",
    "./images/Aerial2.jpg",
    "./images/Swamiji2.jpg",
    "./images/Topshot2.jpg",
    "./images/Open1.jpg",
    "./images/Topshot1.jpg"
  ];
  let visibleCount = 6;

  function renderGallery() {
    gallery.innerHTML = "";
    galleryImages.slice(0, visibleCount).forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Temple Image";
      gallery.appendChild(img);
    });
    loadBtn.style.display = visibleCount >= galleryImages.length ? "none" : "inline-block";
  }

  loadBtn.addEventListener("click", () => {
    visibleCount += 4;
    renderGallery();
  });

  renderGallery();

  // ===== SERVICES =====
  const serviceDetails = {
    pooja: {
      title: "Daily Pooja & Aarti",
      description: "Daily Pooja & Aarti are conducted every morning and evening with Vedic chants and devotional hymns to invoke the blessings of Goddess Durga.",
      image: "./images/Mata.jpg",
      poojas: [
        "Suprabhata Seva (Morning)",
        "Alankara Seva",
        "Kumkuma Archana",
        "Lalitha Sahasranama Kumkuma Archana",
        "Sarvaseva with Prasada",
        "Sandhya Aarti (Evening)",
        "Lalitha Yaaga Homa",
        "Chandi Homa",
        "Nava Chandi Homa",
        "<span class='highlight'>For more details about bookings and pooja activities reach out to given contact details '9380057453'.</span>"
      ]
    },
    annadana: {
      title: "Nitya Annadana (Free Meal Service)",
      description: "Nitya Annadana is offered daily to devotees and the needy, continuing our sacred tradition of serving food to all who visit the temple.",
      image: "https://www.ayyappa.org/wp-content/uploads/2019/05/Annadanam-1.jpg",
      poojas: [
        "Morning Meals for Devotees",
        "Afternoon Annadana",
        "Evening Prasadam Distribution"
      ]
    },
    goushala: {
      title: "Goushala (Cow Shelter)",
      description: "The Goushala houses sacred cows that are lovingly cared for. Devotees can participate by sponsoring their feed and well-being.",
      image: "./images/Swamiji3.jpg",
      poojas: [
        "Feeding the Cows",
        "Maintenance & Cleanliness",
        "Cow Adoption Program",
        "Gaupuja",
        "Kamadhenu Yaaga"
      ]
    },
    yatri: {
      title: "Yatri Nivas (Accommodation)",
      description: "Yatri Nivas offers clean and peaceful accommodation for devotees visiting the temple, ensuring a restful stay near the shrine.",
      image: "https://cdn.yatradham.org/media/catalog/product/s/c/screenshot_2024-10-05_155618.jpg",
      poojas: [
        "Clean Rooms for Devotees",
        "Hot Water Facility",
        "Temple Proximity Stay",
        "<span class='highlight'>For more details about bookings reach out to given contact details '9380057453'.</span>"
      ]
    }
  };

  const buttons = document.querySelectorAll(".service-btn");
  const descriptionBox = document.getElementById("service-description");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.service;
      const detail = serviceDetails[key];
      if (!detail) return;

      descriptionBox.innerHTML = `
        <div class="service-card fade-in">
          <h3>${detail.title}</h3>
          <img src="${detail.image}" alt="${detail.title}">
          <p>${detail.description}</p>
          <ul class="service-poojas">
            ${detail.poojas ? detail.poojas.map(item => `<li>${item}</li>`).join("") : ""}
          </ul>
        </div>
      `;
      const list = descriptionBox.querySelector(".service-poojas");
      if(list) setTimeout(() => list.classList.add("show"), 50);
      descriptionBox.classList.add("active");
      descriptionBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // ===== MOBILE HAMBURGER MENU =====
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");

  if(hamburger && navMenu){
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navMenu.classList.toggle("show");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if(navMenu.classList.contains("show")){
          navMenu.classList.remove("show");
          hamburger.classList.remove("open");
        }
      });
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ===== LOGO CLICK SCROLL =====
  const logo = document.querySelector(".site-logo");
  if (logo) {
    logo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // ===== DONATION FORM WITH UPI + GOOGLE SHEET =====
  
  // ===== DONATION FORM WITH UPI + GOOGLE SHEET =====
const donationForm = document.getElementById("donation-form");
const message = document.getElementById("donation-message");
const qrBox = document.getElementById("upi-box");
const upiLinkEl = document.getElementById("upi-link");
const donationTypeEl = document.getElementById("donation-type");
const donationAmountEl = document.getElementById("donation-amount");
const amountFormGroup = donationAmountEl.closest(".form-group");

// Replace with your UPI ID and Apps Script URL
const templeUpiId = "9380057453@ybl";
const sheetUrl = "https://script.google.com/macros/s/AKfycbxAi7oCU_fSmOz0iYaa1e3VAw5lEBbuR5frE-_bXaRp4j44RDQ0gU-QWm0FT3x_-SQe/exec";

// Fixed seva amounts
const sevaAmounts = {
  "kumkuma-archana": 251,
  "lalitha": 501,
  "abhisheka": 1001,
  "sarva-seva": 2001,
  "annadasoha": 10000,
  "adoption": 11001
};

// Hide amount box initially
amountFormGroup.style.display = "none";

// Show amount input only for "Others"
donationTypeEl.addEventListener("change", () => {
  const selected = donationTypeEl.value;

  if (sevaAmounts[selected]) {
    amountFormGroup.style.display = "none";
    donationAmountEl.value = sevaAmounts[selected];
    donationAmountEl.readOnly = true;
  } else if (selected === "others") {
    amountFormGroup.style.display = "block";
    donationAmountEl.value = "";
    donationAmountEl.readOnly = false;
  } else {
    amountFormGroup.style.display = "none";
    donationAmountEl.value = "";
    donationAmountEl.readOnly = false;
  }
});

donationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("donor-name").value.trim();
  const contact = document.getElementById("donor-contact").value.trim();
  const address = document.getElementById("donor-address").value.trim();
  let amount = Number(donationAmountEl.value);

  const selectedSeva = donationTypeEl.value;
  if (!sevaAmounts[selectedSeva] && selectedSeva !== "others") {
    amount = 0;
  } else if (sevaAmounts[selectedSeva] && selectedSeva !== "others") {
    amount = sevaAmounts[selectedSeva]; // fixed amount for selected seva
  }

  // Validate fields
  if (!name || !contact || !address || !amount || amount < 1) {
    message.style.color = "red";
    message.innerHTML = "⚠️ Please fill in all details and enter a valid amount.";
    qrBox.style.display = "none";
    return;
  }

  // Generate UPI link
  const upiLink = `upi://pay?pa=${encodeURIComponent(templeUpiId)}&pn=${encodeURIComponent("Aadishakti Durga Temple")}&tn=${encodeURIComponent("Temple Donation")}&am=${amount}&cu=INR`;
  qrBox.style.display = "block";
  upiLinkEl.innerHTML = `<a href="${upiLink}" target="_blank" style="font-size:1.4rem; font-weight:700; color:#c0392b; text-decoration:underline;">Pay ₹${amount.toLocaleString()} via UPI</a>`;

  // Send data to Google Sheets
  try {
    await fetch(sheetUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact, address, amount })

    });
  } catch (err) {
    console.log("Error sending to Google Sheets:", err);
  }

  // Success message
  message.style.color = "green";
  message.innerHTML = `🙏 Thank you, ${name}!<br>Please click the link above to complete your donation of ₹${amount.toLocaleString()}.<br>May Goddess Durga bless you!`;

  // Reset form but keep donationType and amount hidden correctly
  donationForm.reset();
  amountFormGroup.style.display = "none";
});


});
