const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  document
    .querySelectorAll(".dropdown")
    .forEach((d) => d.classList.remove("open"));
});

function handleDropdowns() {
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".dropdown > a").forEach((link) => {
      link.onclick = (e) => {
        e.preventDefault();
        const parent = link.parentElement;
        parent.classList.toggle("open");
      };
    });
  }
}

// Executa ao carregar
handleDropdowns();

// Executa ao redimensionar
window.addEventListener("resize", handleDropdowns);

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (dropdown && dropdownContent) {
    dropdown.addEventListener("mouseenter", () => {
      dropdownContent.style.display = "flex";
    });

    dropdown.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!dropdown.matches(":hover") && !dropdownContent.matches(":hover")) {
          dropdownContent.style.display = "none";
        }
      }, 100); // Pequeno delay para permitir mover o cursor para a dropdown
    });

    dropdownContent.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!dropdown.matches(":hover") && !dropdownContent.matches(":hover")) {
          dropdownContent.style.display = "none";
        }
      }, 100);
    });
  }
});
