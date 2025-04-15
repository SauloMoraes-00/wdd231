import { loadGames, renderRandomGames } from './modules/games.js';
import { setupAuthModal } from './modules/auth.js';
import { setupMobileNav } from './modules/ui.js';

async function init() {
  // Initialize UI components
  setupMobileNav();
  setupAuthModal();
  
  try {
    // Load and display random games
    const games = await loadGames();
    renderRandomGames(games);
    
    // Set up event listeners
    setupEventListeners();
    
    // Store last loaded time
    localStorage.setItem('lastLoaded', new Date().toISOString());
  } catch (error) {
    console.error('Initialization error:', error);
    showErrorToUser('Failed to load games. Please try again later.');
  }
}

function setupEventListeners() {
  // Search functionality
  const searchInput = document.querySelector('.hero input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Mobile nav toggle
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleMobileNav);
  }
}

function handleSearch() {
  const searchTerm = this.value.toLowerCase();
  const gameCards = document.querySelectorAll('.listing-card');

  gameCards.forEach(card => {
    const gameName = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = gameName.includes(searchTerm) ? 'block' : 'none';
  });
}

function toggleMobileNav() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.classList.toggle("show");
    // Update hamburger icon
    const hamburger = document.querySelector(".hamburger");
    hamburger.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
  }
}

function showErrorToUser(message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  document.body.prepend(errorElement);
  setTimeout(() => errorElement.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', init);    