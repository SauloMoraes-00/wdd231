import { loadGames, renderAllGames, setupGameFilters } from './modules/games.js';

async function initFindHostPage() {
  try {
    const games = await loadGames();
    renderAllGames(games);
    setupGameFilters(games);
  } catch (error) {
    console.error('Error initializing find host page:', error);
  }
}

document.addEventListener('DOMContentLoaded', initFindHostPage);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        const formData = new FormData(form);
        formData.forEach((value, key) => {
          sessionStorage.setItem(key, value);
        });
      });
    }
  });
  

function handleThankYouPage() {
    if (!window.location.pathname.includes('thanyou.html')) return;
  
    const myInfo = {
      name: sessionStorage.getItem("name"),
      host: sessionStorage.getItem("host"),
      location: sessionStorage.getItem("location"),
      slots: sessionStorage.getItem("slots"),
      type: sessionStorage.getItem("type"),
      date: sessionStorage.getItem("date"),
      description: sessionStorage.getItem("description")
    };
  
    const registerDiv = document.querySelector('#register');
    if (registerDiv) {
      registerDiv.innerHTML = `
        <p><strong>Game Name:</strong> ${myInfo.name}</p>
        <p><strong>Host:</strong> ${myInfo.host}</p>
        <p><strong>Location:</strong> ${myInfo.location}</p>
        <p><strong>Slots:</strong> ${myInfo.slots}</p>
        <p><strong>Game Type:</strong> ${myInfo.type}</p>
        <p><strong>Date:</strong> ${myInfo.date}</p>
        <p><strong>Description:</strong> ${myInfo.description}</p>
      `;
    }
  }
  
  document.addEventListener('DOMContentLoaded', handleThankYouPage);
  
  function saveSubmittedGameToLocalStorage() {
    if (!window.location.pathname.includes('thanyou.html')) return;
  
    const game = {
      id: Date.now(), // simple unique ID
      name: sessionStorage.getItem("name"),
      host: sessionStorage.getItem("host"),
      location: sessionStorage.getItem("location"),
      slots: sessionStorage.getItem("slots"),
      type: sessionStorage.getItem("type"),
      date: sessionStorage.getItem("date"),
      description: sessionStorage.getItem("description"),
      category: sessionStorage.getItem("type") // for filtering
    };
  
    if (!game.name || !game.host) return; // Skip if data missing
  
    const existing = JSON.parse(localStorage.getItem("diceGatherGames")) || [];
    existing.push(game);
    localStorage.setItem("diceGatherGames", JSON.stringify(existing));
  }
  
  document.addEventListener('DOMContentLoaded', saveSubmittedGameToLocalStorage);
  