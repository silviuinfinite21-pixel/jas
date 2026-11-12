/* Jas Blooming — interacțiuni ușoare și accesibile. */

/* 1. Galerie — slider infinit cu imagini reale */
const GALLERY_IMAGES = [
  { src: "assets/img/gal1.jpg", label: "Floare de crochet în nuanțe pastel" },
  { src: "assets/img/gal2.jpg", label: "Aranjament floral personalizat" },
  { src: "assets/img/gal3.jpg", label: "Breloc de crochet trandafir" },
  { src: "assets/img/gal4.jpg", label: "Mărțișoare de crochet unice" },
  { src: "assets/img/gal5.jpg", label: "Ornament de brad de crochet" },
];

function buildSlider() {
  const sliderTrack = document.getElementById("sliderTrack");
  if (!sliderTrack) return;

  // Adaugă imagini pentru slider (doar prima instanță pentru loop)
  GALLERY_IMAGES.forEach((img) => {
    const imgEl = document.createElement("img");
    imgEl.className = "slider-item";
    imgEl.src = img.src;
    imgEl.alt = img.label;
    imgEl.loading = "lazy";
    sliderTrack.appendChild(imgEl);
  });

  // După ce am adăugat primele imagini, adaugăm din nou pentru loop infinit
  GALLERY_IMAGES.forEach((img) => {
    const imgEl = document.createElement("img");
    imgEl.className = "slider-item slider-item--duplicate";
    imgEl.src = img.src;
    imgEl.alt = `${img.label} (continuare)`;
    imgEl.loading = "lazy";
    sliderTrack.appendChild(imgEl);
  });
}

/* 2. Reveal la scroll (Intersection Observer) */
const observerOptions = { threshold: 0.12, rootMargin: "0px 0px -60px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* 3. Nav mobil — deschide / închide meniul */
const navBtn = document.querySelector(".nav-btn");
const nav = document.querySelector(".nav");

navBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navBtn.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
});

// Închide meniul când dai click pe un link
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

/* 4. Formular de contact — validare în timp real + feedback la trimite */
const form = document.getElementById("contactForm");
const fields = [
  { id: "name", errorId: "nameError", validate: (v) => v.trim().length >= 2, msg: "Introdu numele tău" },
  { id: "email", errorId: "emailError", validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Introdu un email valid" },
  { id: "message", errorId: "messageError", validate: (v) => v.trim().length >= 10, msg: "Scrie cel puțin câteva cuvinte" },
];

const submitBtn = document.getElementById("submitBtn");
const formOk = document.getElementById("formOk");

// Validare în timp real (pe input)
fields.forEach((field) => {
  const input = document.getElementById(field.id);
  const error = document.getElementById(field.errorId);

  input.addEventListener("input", () => {
    if (input.value.trim() === "") {
      error.textContent = "";
      input.setAttribute("aria-invalid", "false");
      return;
    }
    if (field.validate(input.value)) {
      error.textContent = "";
      input.setAttribute("aria-invalid", "false");
    } else {
      error.textContent = field.msg;
      input.setAttribute("aria-invalid", "true");
    }
  });

  input.addEventListener("blur", () => {
    if (input.value.trim() !== "" && !field.validate(input.value)) {
      error.textContent = field.msg;
      input.setAttribute("aria-invalid", "true");
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let allValid = true;
  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);
    if (!field.validate(input.value)) {
      error.textContent = field.msg;
      input.setAttribute("aria-invalid", "true");
      allValid = false;
    }
  });

  if (!allValid) return;

  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Se trimite…";

  // Simulează trimiterrea (înlocuiește cu fetch real când e gata backend-ul)
  setTimeout(() => {
    submitBtn.textContent = "Trimis!";
    submitBtn.style.background = "#5c4033";
    formOk.textContent = "Mulțumesc pentru mesaj! Îți voi răspunde cât mai repede.";
    form.reset();
    fields.forEach((field) => {
      document.getElementById(field.id).setAttribute("aria-invalid", "false");
      document.getElementById(field.errorId).textContent = "";
    });
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      formOk.textContent = "";
    }, 4000);
  }, 1400);
});

/* 5. Inițializează slider-ul */
buildSlider();