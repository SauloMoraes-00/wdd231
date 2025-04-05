import { places } from "../chamber/data/places.mjs";    
console.log(places); // For debugging purposes

const button = document.getElementById("myButton");
const nav = document.getElementById("animeted-nav");

button.addEventListener("click", function() {
nav.classList.toggle("open");
this.classList.toggle("open");
});

function renderPlacesGrid(containerId = 'places-grid') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  places.forEach(place => {
    const card = document.createElement('div');
    card.className = 'place-card';

    card.innerHTML = `
      <img src="${place.photo}" alt="${place.name}">
      <div class="place-card-content">
        <h2>${place.name}</h2>
        <p><strong>Address:</strong> ${place.address}</p>
        <p>${place.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPlacesGrid(); 

  document.getElementById("currentyear").textContent = new Date().getFullYear();
  const lastModified = new Date(document.lastModified);
  document.getElementById("lastModified").textContent = `Last Update: ${lastModified.toLocaleString()}`;
});

const visitMessage = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (lastVisit) {
  const lastTime = parseInt(lastVisit);
  const diffTime = now - lastTime;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (days === 0) {
    visitMessage.textContent = "Welcome back! You last visited today.";
  } else if (days === 1) {
    visitMessage.textContent = "Welcome back! It's been 1 day since your last visit.";
  } else {
    visitMessage.textContent = `Welcome back! It's been ${days} days since your last visit.`;
  }
} else {
  visitMessage.textContent = "Welcome! This is your first visit.";
}

localStorage.setItem("lastVisit", now);

