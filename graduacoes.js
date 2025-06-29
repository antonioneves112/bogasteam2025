const graduacoes = {
  2024: {
    midia: [
      {
        type: "img",
        src: "../img/graduacoes2024/grupo2024.jpg",
        caption: "Participantes",
      },
      {
        type: "img",
        src: "../img/graduacoes2024/aquecimento.jpg",
        caption: "Aquecimento",
      },
      {
        type: "img",
        src: "../img/graduacoes2024/tecnica.jpg",
        caption: "Técnicas",
      },
      {
        type: "img",
        src: "../img/graduacoes2024/tecnica1.jpg",
        caption: "Técnicas",
      },
      {
        type: "img",
        src: "../img/graduacoes2024/tecnica2.jpg",
        caption: "Técnicas",
      },
      {
        type: "img",
        src: "../img/graduacoes2024/entrega.jpg",
        caption: "Entrega",
      },
      {
        type: "img",
        src: "../img/graduacoes2024/faixasamarelas.jpg",
        caption: "Alunos Graduados",
      },
      {
        type: "img",
        src: "../img/graduacoes2024/antonioturma.jpg",
        caption: "Alunos Graduados",
      },
    ],
  },
  2025: {
    midia: [
      {
        type: "img",
        src: "../img/graduacoes2025/graduacao2025.JPG",
        caption: "Participantes",
      },
      {
        type: "img",
        src: "../img/graduacoes2025/treinadores.jpg",
        caption: "Treinadores",
      },
      {
        type: "img",
        src: "../img/graduacoes2025/graduadosT.jpg",
        caption: "Alunos Graduados",
      },
      {
        type: "img",
        src: "../img/graduacoes2025/graduadosP.jpg",
        caption: "Alunos Graduados",
      },

      {
        type: "video",
        src: "../img/graduacoes2025/aquecimento.MP4",
        caption: "Aquecimento",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/alongamento.MP4",
        caption: "Alongamento",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/tecnicas2.MP4",
        caption: "Técnicas",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/tecnicas3.MP4",
        caption: "Técnicas",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/tecnicas1.MP4",
        caption: "Técnicas",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/avaliacao1.MP4",
        caption: "Avaliaçao",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/avaliacao3.MP4",
        caption: "Avaliaçao",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/avaliacao5.MP4",
        caption: "Avaliaçao",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/avaliacao6.MP4",
        caption: "Avaliaçao",
      },
      {
        type: "video",
        src: "../img/graduacoes2025/avaliacao4.MP4",
        caption: "Avaliaçao",
      },
    ],
  },
};

const items = document.querySelectorAll(".item");
const wrapper = document.getElementById("sliderWrapper");
const captionEl = document.getElementById("sliderCaption");
const indicators = document.getElementById("sliderIndicators");
const sliderSection = document.querySelector(".slider-section");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const closeBtn = document.querySelector(".close-slider");

let currentIndex = 0;
let currentMidia = [];

function carregarGraduacao(ano) {
  currentMidia = graduacoes[ano].midia;
  currentIndex = 0;
  renderMidia();
  renderIndicators();
  updateSlider();
  sliderSection.classList.remove("hidden");
}

function renderMidia() {
  wrapper.innerHTML = "";
  currentMidia.forEach((item) => {
    let el;
    if (item.type === "img") {
      el = document.createElement("img");
    } else if (item.type === "video") {
      el = document.createElement("video");
      el.controls = true;
      el.loop = true;
      el.preload = "metadata";
    }
    el.src = item.src;
    wrapper.appendChild(el);
  });
}

function renderIndicators() {
  indicators.innerHTML = "";
  currentMidia.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });
    indicators.appendChild(btn);
  });
}

async function updateSlider() {
  wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  captionEl.textContent = currentMidia[currentIndex].caption || "";

  // Pausa todos os vídeos e zera o tempo
  const allVideos = wrapper.querySelectorAll("video");
  allVideos.forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });

  // Toca o vídeo atual se for um vídeo
  const currentElement = wrapper.children[currentIndex];
  if (currentElement.tagName.toLowerCase() === "video") {
    try {
      await currentElement.play();
    } catch (err) {
      console.warn("Erro ao tocar o vídeo:", err);
    }
  }

  // Atualiza estado dos indicadores
  const btns = indicators.querySelectorAll("button");
  btns.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentIndex);
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentMidia.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentMidia.length) % currentMidia.length;
  updateSlider();
});

items.forEach((item) => {
  item.addEventListener("click", () => {
    const ano = item.dataset.graduacao;
    carregarGraduacao(ano);
  });
});

closeBtn.addEventListener("click", () => {
  sliderSection.classList.add("hidden");
  // Pausa e reseta todos os vídeos ao fechar o slider
  const videos = wrapper.querySelectorAll("video");
  videos.forEach((v) => {
    v.pause();
    v.currentTime = 0;
  });
});
