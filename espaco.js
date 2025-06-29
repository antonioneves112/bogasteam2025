const sliderWrapper = document.querySelector(".slider-wrapper");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const indicatorsContainer = document.querySelector(".slider-indicators");
const caption = document.querySelector(".slider-caption");
const sliderSection = document.querySelector(".slider-section");
const closeBtn = document.querySelector(".close-slider");
const itemImg = document.querySelector(".item img");

const imageSources = [
  { src: "../img/espaço.webp", alt: "Sala De Treino" },
  { src: "../img/escritorio2.JPG", alt: "Escritório" },
  { src: "../img/balneario.JPG", alt: "Vestiario" },
];

const captions = ["Sala De Treino", "Escritorio", "Vestiario"];

let currentIndex = 0;
let autoplayInterval = null;
let images = [];

function createIndicators() {
  indicatorsContainer.innerHTML = "";
  images.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", `Ir para imagem ${i + 1}`);
    btn.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
      restartAutoplay();
    });
    indicatorsContainer.appendChild(btn);
  });
}

function updateIndicators() {
  indicatorsContainer.querySelectorAll("button").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentIndex);
  });
}

function updateSlider() {
  // Largura total do slider (ex: 3 imagens = 300%)
  sliderWrapper.style.width = `${images.length * 100}%`;

  // Translação do wrapper de acordo com o índice atual
  sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Atualiza legenda e indicadores
  caption.textContent = captions[currentIndex] || "";
  updateIndicators();
}
function nextSlide() {
  currentIndex = images.length ? (currentIndex + 1) % images.length : 0;
  updateSlider();
}

function prevSlide() {
  currentIndex = images.length
    ? (currentIndex - 1 + images.length) % images.length
    : 0;
  updateSlider();
}

function startAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(nextSlide, 5000);
}

prevBtn.addEventListener("click", () => {
  nextSlide();
  startAutoplay();
});
nextBtn.addEventListener("click", () => {
  nextSlide();
  startAutoplay();
});

sliderWrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});
sliderWrapper.addEventListener("touchend", (e) => {
  if (!isDragging) return;
  const diff = e.changedTouches[0].clientX - startX;
  diff > 50 ? prevSlide() : diff < -50 && nextSlide();
  startAutoplay();
  isDragging = false;
});

// Abrir modal
itemImg.addEventListener("click", () => {
  if (!images.length) return;
  currentIndex = 0;
  updateSlider();
  sliderSection.classList.remove("hidden");
  document.body.classList.add("no-scroll"); // ← aqui
  startAutoplay();
});

// Fechar modal
closeBtn.addEventListener("click", () => {
  sliderSection.classList.add("hidden");
  document.body.classList.remove("no-scroll"); // ← aqui
  clearInterval(autoplayInterval);
});

// Carrega imagens dinamicamente
window.addEventListener("DOMContentLoaded", () => {
  imageSources.forEach((data) => {
    const img = document.createElement("img");
    img.src = data.src;
    img.alt = data.alt;
    Object.assign(img.style, {
      flex: "0 0 100%",
      width: "100%",
      height: "100%",
      objectFit: "contain",
    });
    sliderWrapper.appendChild(img);
  });

  images = Array.from(sliderWrapper.querySelectorAll("img"));
  console.log(`Imagens criadas: ${images.length}`);

  createIndicators();
  updateSlider();
});

// Fechar modal
closeBtn.addEventListener("click", () => {
  sliderSection.classList.add("hidden");
  clearInterval(autoplayInterval);
});

// Teclado ESC e setas
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") sliderSection.classList.add("hidden");
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});
