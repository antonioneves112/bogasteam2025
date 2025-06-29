document.addEventListener("DOMContentLoaded", () => {
  // === Remover blur das imagens ===
  const images = document.querySelectorAll(".item img");

  images.forEach((img) => {
    if (img.complete && img.naturalHeight !== 0) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
      img.addEventListener("error", () => {
        img.classList.add("loaded");
      });
    }
  });

  // === Código do modal ===
  const modal = document.getElementById("size-modal");
  const modalTitle = document.getElementById("modal-product-name");
  const closeModal = document.getElementById("modal-close");
  const confirmBtn = document.getElementById("confirm-size");

  const dropdown = document.getElementById("modal-dropdown");
  const selected = dropdown.querySelector(".dropdown-selected");
  const options = dropdown.querySelectorAll(".dropdown-option");

  let selectedValue = "";
  let selectedText = "Selecione o tamanho";

  // Abrir dropdown
  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  // Selecionar opção
  options.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedValue = opt.dataset.value;
      selectedText = opt.textContent;
      selected.innerHTML = `${selectedText} <i class="bx bx-chevron-down arrow"></i>`;
      dropdown.classList.remove("open");
    });
  });

  // Fechar dropdown clicando fora
  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });

  // Abrir modal ao clicar em qualquer "Encomendar"
  document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", () => {
      const produto =
        item.getAttribute("data-product") ||
        item.querySelector(".product-name")?.textContent ||
        "Produto";

      modalTitle.textContent = produto;
      modal.dataset.product = produto;
      modal.classList.remove("hidden");
      resetDropdown();
    });
  });

  // Fechar modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Confirmar e abrir WhatsApp
  confirmBtn.addEventListener("click", () => {
    if (!selectedValue) {
      alert("Por favor, selecione um tamanho.");
      return;
    }

    const produto = modal.dataset.product;
    const mensagem = `Boas! Gostaria de encomendar: ${produto}, tamanho: ${selectedValue}`;
    const url = `https://wa.me/351964634715?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
    modal.classList.add("hidden");
  });

  function resetDropdown() {
    selectedValue = "";
    selectedText = "Selecione o tamanho";
    selected.innerHTML = `${selectedText} <i class="bx bx-chevron-down arrow"></i>`;
    dropdown.classList.remove("open");
  }
});
