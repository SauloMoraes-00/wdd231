
const cards = document.querySelector('#cards');

// Async function to fetch data from the JSON source URL
async function getProphetData() {
    const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // Console table to check the fetched data (commented out after testing)
      console.table(data);
      
      // Pass the 'prophets' array to the displayProphets function
      displayProphets(data.prophets);
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  }
  
  // Function expression to display prophets in cards
  const displayProphets = (prophets) => {
    const cardsDiv = document.getElementById("cards"); // Assuming you have a div with ID 'cards'
  
    prophets.forEach((prophet) => {
      // Create the section element for the card
      const card = document.createElement("section");
      
      // Create the h2 element for the prophet's full name
      const fullName = document.createElement("h2");
      fullName.textContent = `${prophet.name} ${prophet.lastname}`;

      const birthDate = document.createElement("p");
      birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;

      const birthPlace = document.createElement("p");
      birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
      
      // Create the img element for the prophet's portrait
      const portrait = document.createElement("img");
      portrait.setAttribute("src", prophet.imageurl);
      portrait.setAttribute("alt", `${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute("loading", "lazy");
      portrait.setAttribute("width", "200");
      portrait.setAttribute("height", "250");
      
      // Append the heading and image to the card section
      card.appendChild(fullName);
      card.appendChild(birthDate);
      card.appendChild(birthPlace);
      card.appendChild(portrait);

      
      // Append the card to the 'cards' div
      cardsDiv.appendChild(card);
    });
  }
  
  // Call the async function to fetch and display the prophets
  getProphetData();
  