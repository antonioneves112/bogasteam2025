document.addEventListener("DOMContentLoaded", () => {
  const ctaBtn = document.getElementById("cta-button");
  const scheduleSection = document.getElementById("schedule-section");

  ctaBtn.addEventListener("click", () => {
    const isVisible = getComputedStyle(scheduleSection).display !== "none";
    scheduleSection.style.display = isVisible ? "none" : "block";
    ctaBtn.textContent = isVisible
      ? "Agende uma Aula Experimental"
      : "Fechar Agendamento";

    if (!isVisible) {
      scheduleSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  const dropdown = document.getElementById("custom-dropdown");
  const selected = dropdown.querySelector(".dropdown-selected");
  const options = Array.from(dropdown.querySelectorAll(".dropdown-option"));

  let selectedValue = "";
  let selectedText = "Selecione um horário";

  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  options.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedValue = opt.dataset.value;
      selectedText = opt.textContent.trim();
      selected.innerHTML = `${selectedText} <i class="bx bx-chevron-down arrow"></i>`;
      dropdown.classList.remove("open");
      console.log(`Selecionado: ${selectedValue} - ${selectedText}`);
    });
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });

  document.getElementById("confirm-button").addEventListener("click", () => {
    console.log("Confirmar clicado", selectedValue, selectedText);

    if (!selectedValue) {
      alert("Por favor, selecione um horário.");
      return;
    }

    const phoneNumbers = {
      bogas: "351964634715",
      antonio: "351964634715",
    };

    const phoneNumber = phoneNumbers[selectedValue];
    if (!phoneNumber) {
      alert("Número de telefone não encontrado para o horário selecionado.");
      return;
    }

    const message = `Olá, gostaria de agendar uma aula experimental no horário: ${selectedText}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    alert("A abrir o WhatsApp... aguarde.");
    window.open(whatsappUrl, "_blank");
  });
});

const modalTitle = document.getElementById("modal-product-name");

document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", () => {
    selectedProduct =
      item.getAttribute("data-product") ||
      item.querySelector(".product-name")?.textContent ||
      "Produto";
    modalTitle.textContent = selectedProduct;
    modal.classList.remove("hidden");
  });
});
