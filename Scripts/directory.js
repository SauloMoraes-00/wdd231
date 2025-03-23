const button = document.getElementById("myButton");
const nav = document.getElementById("animeted-nav");

button.addEventListener("click", function() {
    nav.classList.toggle("open");
    this.classList.toggle("open");
});

async function displayCompanyData() {
    const url = '../Chamber/Data/members.json'; 
    try {
        
        const companyListContainer = document.getElementById("business-container");

        companyListContainer.innerHTML = '';

        // Fetch company data from the JSON file
        const response = await fetch(url);
        const companyData = await response.json();

        // Loop through the data and display each company
        companyData.forEach(company => {
            const companyElement = document.createElement("div");
            companyElement.classList.add("company-item");

            // Add company name and details
            companyElement.innerHTML = `
                <h2>${company.name}</h2>
                <img src="${company.image}" alt="${company.name}" width="100" height="100">
                <p><strong>Industry:</strong> ${company.industry}</p>
                <p><strong>Membership Level:</strong> ${company.membership_level === 3 ? "Gold" : company.membership_level === 2 ? "Silver" : "Member"}</p>
                <p><strong>Address:</strong> ${company.address}</p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                <p><strong>Description:</strong> ${company.description}</p>
                <hr>
            `;

            // Append the company details to the container
            companyListContainer.appendChild(companyElement);
        });
    } catch (error) {
        console.error('Error fetching company data:', error);
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    await displayCompanyData();
});

// Weather API
const myTemp = document.querySelector('#temperature');
const myDesc = document.querySelector('#description');
const myHigh = document.querySelector('#high');
const myLow = document.querySelector('#low');
const myHumidity = document.querySelector('#humidity');

const myKey = '4e3f763edd0a396977b65b283479ef2d';
const myLat = '-23.298893276919777';
const myLon = '-51.16919622755564';
const myURL = "//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial";

async function apiFetch() {
    try {
      const response = await fetch(myURL);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        // displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();


  document.addEventListener("DOMContentLoaded", () => {
    // Set current year dynamically
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    
    // Set last modified date dynamically
    const lastModified = new Date(document.lastModified);
    document.getElementById("lastModified").textContent = `Last Update: ${lastModified.toLocaleString()}`;
  });

  document.addEventListener("DOMContentLoaded", () => {
    fetch("Data/members.json")
        .then(response => response.json())
        .then(members => {
            
            const eligibleMembers = members.filter(member => member.membership_level >= 2);
            
            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
            
            const spotlightMembers = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
            
            const spotlightContainer = document.getElementById("spotlight");
            
            spotlightMembers.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("spotlight-card");
                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name} Logo">
                    <h3>${member.name}</h3>
                    <p><strong>Adress:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Level:</strong> ${member.membership_level === 3 ? "Gold" : "Silver"}</p>
                `;
                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Erro ao carregar os membros:", error));
});