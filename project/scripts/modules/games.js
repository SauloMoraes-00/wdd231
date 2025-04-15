// scripts/modules/games.js
const GAMES_KEY = 'diceGatherGames';

// Shared functions
export async function loadGames() {
  try {
    const cachedGames = JSON.parse(localStorage.getItem(GAMES_KEY));
    if (cachedGames?.length) return cachedGames;

    const response = await fetch('games.json');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const games = await response.json();
    localStorage.setItem(GAMES_KEY, JSON.stringify(games));
    return games;
  } catch (error) {
    console.error('Error loading games:', error);
    return [];
  }
}

function formatDate(dateString) {
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// For findhost.html - Show ALL games
export function renderAllGames(games) {
  const container = document.querySelector('.listings-grid');
  if (!container) {
    console.error('Listings grid container not found!');
    return;
  }

  container.innerHTML = games.map(game => `
    <div class="listing-card" data-category="${game.category}">
      <h3>${game.name}</h3>
      <p><strong>Host:</strong> ${game.host}</p>
      <p><strong>Location:</strong> ${game.location}</p>
      <p><strong>When:</strong> ${formatDate(game.date)}</p>
      <p><strong>Slots:</strong> ${game.slots}</p>
      <button class="cta-button join-game" data-id="${game.id}">Join Game</button>
    </div>
  `).join('');
}

// For project.html - Show RANDOM 4 games
export function renderRandomGames(games) {
  const container = document.querySelector('.listings-grid');
  if (!container) return;

  // Get 4 random unique games
  const shuffled = [...games].sort(() => 0.5 - Math.random());
  const randomGames = shuffled.slice(0, 4);

  container.innerHTML = randomGames.map(game => `
    <div class="listing-card" data-category="${game.category}">
      <h3>${game.name}</h3>
      <p><strong>Host:</strong> ${game.host}</p>
      <p><strong>Location:</strong> ${game.location}</p>
      <p><strong>When:</strong> ${formatDate(game.date)}</p>
      <button class="cta-button">Join Table</button>
    </div>
  `).join('');
}

// Filter functions (for findhost.html)
export function setupGameFilters(games) {
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
  
      const category = button.dataset.category;
      const filtered = category === 'all' 
        ? games 
        : games.filter(game => game.category === category);
      renderAllGames(filtered);
    });
  });
  
}