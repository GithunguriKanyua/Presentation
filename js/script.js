document.addEventListener("DOMContentLoaded", () => {

  const landing = document.getElementById("landing");
  const presentation = document.getElementById("presentation");
  const enterBtn = document.getElementById("enterBtn");

  const slidesContainer = document.getElementById("slidesContainer");
  const currentSlideEl = document.getElementById("currentSlide");
  const totalSlidesEl = document.getElementById("totalSlides");

  const navLeft = document.querySelector(".nav-left");
  const navRight = document.querySelector(".nav-right");

  let currentSlide = 0;
  let slides = [];

  /* 🔧 DEFINE YOUR SLIDES HERE */
  const slideFiles = [
    "slides/slide1.html",
    "slides/slide2.html",
    "slides/slide3.html"
  ];

  /* LOAD SLIDES */
  async function loadSlides() {
    for (let file of slideFiles) {
      const response = await fetch(file);
      const content = await response.text();

      const section = document.createElement("section");
      section.classList.add("slide");
      section.innerHTML = content;

      slidesContainer.appendChild(section);
    }

    slides = document.querySelectorAll(".slide");
    totalSlidesEl.textContent = slides.length;
    updateSlide();
  }

  /* ENTER MODE */
  enterBtn.addEventListener("click", async () => {
    landing.classList.add("hidden");
    presentation.classList.remove("hidden");
    document.body.classList.add("presentation-mode");

    if (!slides.length) {
      await loadSlides();
    }

    if (presentation.requestFullscreen) {
      presentation.requestFullscreen();
    }
  });

  /* UPDATE SLIDE */
  function updateSlide() {
    slides.forEach(s => s.classList.remove("active"));
    slides[currentSlide].classList.add("active");
    currentSlideEl.textContent = currentSlide + 1;
  }

  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlide();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  }

  function exitPresentation() {
    presentation.classList.add("hidden");
    landing.classList.remove("hidden");
    document.body.classList.remove("presentation-mode");

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  /* Keyboard Controls */
  document.addEventListener("keydown", (e) => {
    if (presentation.classList.contains("hidden")) return;

    if (["ArrowRight", "ArrowDown"].includes(e.key)) nextSlide();
    if (["ArrowLeft", "ArrowUp"].includes(e.key)) prevSlide();
    if (e.key === "Escape") exitPresentation();
  });

  /* Click Navigation */
  navRight.addEventListener("click", nextSlide);
  navLeft.addEventListener("click", prevSlide);

  /* Disable Right Click */
  presentation.addEventListener("contextmenu", e => e.preventDefault());

});
