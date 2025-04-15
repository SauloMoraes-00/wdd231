// scripts/modules/auth.js

// DOM Elements
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal" aria-label="Close modal">&times;</span>
    <h2 id="auth-modal-title">Login</h2>
    <form id="auth-form">
      <div class="form-group">
        <label for="auth-email">Email:</label>
        <input type="email" id="auth-email" required aria-required="true">
      </div>
      <div class="form-group">
        <label for="auth-password">Password:</label>
        <input type="password" id="auth-password" required aria-required="true">
      </div>
      <div class="form-actions">
        <button type="submit" class="cta-button">Login</button>
        <button type="button" id="toggle-auth" class="text-button">Need to sign up?</button>
      </div>
    </form>
  </div>
`;

// State
let isLoginMode = true;
const AUTH_KEY = 'diceGatherAuth';

// Initialize Auth Modal
export function setupAuthModal() {
  document.body.appendChild(modal);
  const loginButton = document.querySelector('.cta-button');
  
  // Event Listeners
  loginButton.addEventListener('click', showAuthModal);
  modal.querySelector('.close-modal').addEventListener('click', hideAuthModal);
  document.getElementById('toggle-auth').addEventListener('click', toggleAuthMode);
  document.getElementById('auth-form').addEventListener('submit', handleAuthSubmit);
  
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      hideAuthModal();
    }
  });
  
  // Check for existing session
  checkExistingSession();
}

// Modal Controls
function showAuthModal() {
  modal.style.display = 'flex';
  document.getElementById('auth-email').focus();
}

function hideAuthModal() {
  modal.style.display = 'none';
}

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  const title = document.getElementById('auth-modal-title');
  const submitButton = document.querySelector('#auth-form button[type="submit"]');
  const toggleButton = document.getElementById('toggle-auth');
  
  if (isLoginMode) {
    title.textContent = 'Login';
    submitButton.textContent = 'Login';
    toggleButton.textContent = 'Need to sign up?';
  } else {
    title.textContent = 'Sign Up';
    submitButton.textContent = 'Sign Up';
    toggleButton.textContent = 'Already have an account?';
  }
}

// Auth Handlers
async function handleAuthSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  
  if (!email || !password) {
    showAuthError('Please fill in all fields');
    return;
  }
  
  try {
    // In a real app, this would be an API call
    const userData = await mockAuthRequest(email, password);
    
    if (userData) {
      saveUserSession(userData);
      updateUIForAuth(true);
      hideAuthModal();
      showAuthSuccess(`Welcome ${userData.email}`);
    } else {
      showAuthError(isLoginMode 
        ? 'Invalid login credentials' 
        : 'Email already registered');
    }
  } catch (error) {
    showAuthError('An error occurred. Please try again.');
    console.error('Auth error:', error);
  }
}

// Mock Auth Functions (replace with real API calls)
async function mockAuthRequest(email, password) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = JSON.parse(localStorage.getItem(AUTH_KEY)?.users || '[]');
  
  if (isLoginMode) {
    return users.find(u => u.email === email && u.password === password);
  } else {
    if (users.some(u => u.email === email)) {
      return null;
    }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ users }));
    return newUser;
  }
}

// Session Management
function saveUserSession(userData) {
  localStorage.setItem(`${AUTH_KEY}_session`, JSON.stringify({
    email: userData.email,
    loggedInAt: new Date().toISOString()
  }));
}

function checkExistingSession() {
  const session = JSON.parse(localStorage.getItem(`${AUTH_KEY}_session`));
  if (session) {
    updateUIForAuth(true);
  }
}

export function logout() {
  localStorage.removeItem(`${AUTH_KEY}_session`);
  updateUIForAuth(false);
}

// UI Updates
function updateUIForAuth(isLoggedIn) {
  const loginButton = document.querySelector('.cta-button');
  if (isLoggedIn) {
    loginButton.textContent = 'Logout';
    loginButton.removeEventListener('click', showAuthModal);
    loginButton.addEventListener('click', logout);
  } else {
    loginButton.textContent = 'Login/Sign-up';
    loginButton.removeEventListener('click', logout);
    loginButton.addEventListener('click', showAuthModal);
  }
}

// Feedback Helpers
function showAuthError(message) {
  let errorElement = document.querySelector('.auth-error');
  if (!errorElement) {
    errorElement = document.createElement('p');
    errorElement.classList.add('auth-error');
    document.getElementById('auth-form').prepend(errorElement);
  }
  errorElement.textContent = message;
  errorElement.style.color = '#ff3333';
}

function showAuthSuccess(message) {
  const successElement = document.createElement('div');
  successElement.classList.add('auth-toast');
  successElement.textContent = message;
  document.body.appendChild(successElement);
  
  setTimeout(() => {
    successElement.remove();
  }, 3000);
}