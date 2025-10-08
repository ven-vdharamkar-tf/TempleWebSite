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
    "C://Users//ravishankar.mk//TempleWebSite//images//Pushkarni.jpg",
    "C://Users//ravishankar.mk//TempleWebSite//images//Fort.jpg",
    "C://Users//ravishankar.mk//TempleWebSite//images//Swamiji1.jpg",
    "C://Users//ravishankar.mk//TempleWebSite//images//Aerial2.jpg",
    "C://Users//ravishankar.mk//TempleWebSite//images//Swamiji2.jpg"
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
      image: "C://Users//ravishankar.mk//TempleWebSite//images//Mata.jpg"
    },
    annadana: {
      title: "Nitya Annadana (Free Meal Service)",
      description: "Nitya Annadana is offered daily to devotees and the needy, continuing our sacred tradition of serving food to all who visit the temple.",
      image: "https://www.ayyappa.org/wp-content/uploads/2019/05/Annadanam-1.jpg"
    },
    goushala: {
      title: "Goushala (Cow Shelter)",
      description: "The Goushala houses sacred cows that are lovingly cared for. Devotees can participate by sponsoring their feed and well-being.",
      image: "C://Users//ravishankar.mk//TempleWebSite//images//Swamiji3.jpg"
    },
    yatri: {
      title: "Yatri Nivas (Accommodation)",
      description: "Yatri Nivas offers clean and peaceful accommodation for devotees visiting the temple, ensuring a restful stay near the shrine.",
      image: "https://cdn.yatradham.org/media/catalog/product/s/c/screenshot_2024-10-05_155618.jpg"
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
        </div>
      `;
      descriptionBox.classList.add("active");
      descriptionBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });


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
