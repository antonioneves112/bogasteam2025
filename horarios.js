const schedule = {
  Segunda: [
    { time: "18:00 - 19:00", trainer: "Francisco António", modalidade: "Boxe" },
    { time: "19:00 - 20:30", trainer: "Bogas", modalidade: "Kickboxing" },
    { time: "20:40 - 21:50", trainer: "António", modalidade: "Kickboxing" },
  ],
  Quarta: [
    { time: "18:00 - 19:00", trainer: "Francisco António", modalidade: "Boxe" },
    { time: "19:00 - 20:30", trainer: "Bogas", modalidade: "Kickboxing" },
    { time: "20:40 - 21:50", trainer: "António", modalidade: "Kickboxing" },
  ],
  Sexta: [
    { time: "18:00 - 19:00", trainer: "Francisco António", modalidade: "Boxe" },
    { time: "19:00 - 20:30", trainer: "Bogas", modalidade: "Kickboxing" },
    { time: "20:40 - 21:50", trainer: "António", modalidade: "Kickboxing" },
  ],
};

function loadSchedule() {
  const container = document.getElementById("days-container");

  for (const day in schedule) {
    const dayDiv = document.createElement("section");
    dayDiv.className = "day";

    const title = document.createElement("h3");
    title.textContent = day;
    dayDiv.appendChild(title);

    schedule[day].forEach((cls) => {
      const classDiv = document.createElement("div");
      classDiv.className = "class-item";
      classDiv.innerHTML = `
        <div class="modalidade">${cls.modalidade}</div>
        <div class="horario">${cls.time}</div>
      `;
      classDiv.onclick = () => showDetails(day, cls);
      dayDiv.appendChild(classDiv);
    });

    container.appendChild(dayDiv);
  }
}

function showDetails(day, cls) {
  const content = `
    <h3>${cls.modalidade}</h3>
    <p><strong>Dia:</strong> ${day}</p>
    <p><strong>Horário:</strong> ${cls.time}</p>
    <p><strong>Treinador:</strong> ${cls.trainer}</p>
  `;

  document.getElementById("details-content").innerHTML = content;
  document.getElementById("class-details").style.display = "block";
}

function closeDetails() {
  document.getElementById("class-details").style.display = "none";
}

window.onload = loadSchedule;
