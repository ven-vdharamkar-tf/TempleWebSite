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
  const images = [
    "./images/Pushkarni.jpg",
    "./images/Fort.jpg",
    "./images/Swamiji1.jpg",
    "./images/Aerial2.jpg",
    "./images/Swamiji2.jpg"
  ];
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Temple Image";
    gallery.appendChild(img);
  });


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
      "<span class='highlight'>For more details about bookings  reach out to given contact details '9380057453'.</span>"
 
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

      // Generate list HTML if poojas exist
let poojaListHTML = "";
if (detail.poojas) {
  poojaListHTML = `<ul class="service-poojas">
    ${detail.poojas.map(item => `<li>${item}</li>`).join("")}
  </ul>`;
}
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.service;
    const detail = serviceDetails[key];
    if (!detail) return;

    // Create the card HTML without the list yet
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
    
    // Animate the list after insertion
    const list = descriptionBox.querySelector(".service-poojas");
    if(list) {
      setTimeout(() => {
        list.classList.add("show");
      }, 50); // small delay for transition
    }

    descriptionBox.classList.add("active");
    descriptionBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

      descriptionBox.classList.add("active");
      descriptionBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery-grid");
  const loadBtn = document.getElementById("load-more-btn");

  const images = [
    "./images/Pushkarni.jpg",
    "./images/Fort.jpg",
    "./images/Swamiji1.jpg",
    "./images/Aerial2.jpg",
    "./images/Swamiji2.jpg",
    "./images/Temple1.jpg",
    "./images/Temple2.jpg",
    "./images/Temple3.jpg"
  ];

  let visibleCount = 4; // show first 4 initially

  function renderGallery() {
    gallery.innerHTML = "";
    images.slice(0, visibleCount).forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Temple Image";
      gallery.appendChild(img);
    });

    // Hide button if all images are shown
    loadBtn.style.display = visibleCount >= images.length ? "none" : "inline-block";
  }

  loadBtn.addEventListener("click", () => {
    visibleCount += 4; // show 4 more on each click
    renderGallery();
  });

  renderGallery();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const logo = document.querySelector(".site-logo");
if (logo) {
  logo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


  // ===== DONATION FORM =====
  const donationForm = document.getElementById("donation-form");
  const message = document.getElementById("donation-message");

  donationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("donor-name").value.trim();
    const contact = document.getElementById("donor-contact").value.trim();
    const address = document.getElementById("donor-address").value.trim();
    const amount = Number(document.getElementById("donation-amount").value);

    if (!name || !contact || !address || !amount || amount < 1) {
      message.style.color = "red";
      message.innerHTML = "⚠️ Please fill in all details and enter a valid amount.";
      return;
    }

    message.style.color = "green";
    message.innerHTML = `
      🙏 <strong>Thank you, ${name}!</strong><br>
      Your generous donation of ₹${amount.toLocaleString()} has been received.<br>
      May Goddess Durga bless you and your family with prosperity.
    `;

    donationForm.reset();
  });
});
