const button = document.getElementById("myButton");
const nav = document.getElementById("animeted-nav");

button.addEventListener("click", function() {
    nav.classList.toggle("open");
    this.classList.toggle("open");
});

async function displayCompanyData() {
    const url = 'data/members.json'; 
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
