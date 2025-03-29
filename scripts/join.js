const button = document.getElementById("myButton");
const nav = document.getElementById("animeted-nav");

button.addEventListener("click", function() {
    nav.classList.toggle("open");
    this.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
    // Set current year dynamically
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    
    // Set last modified date dynamically
    const lastModified = new Date(document.lastModified);
    document.getElementById("lastModified").textContent = `Last Update: ${lastModified.toLocaleString()}`;
  });

  function openModal(level) {
    document.getElementById('modal-' + level).style.display = 'block';
}

function closeModal(level) {
    document.getElementById('modal-' + level).style.display = 'none';
}

const getSpring = window.location.search;
console.log(getSpring);

const myInfo = new URLSearchParams(getSpring);
console.log(myInfo);

console.log(myInfo.get("first_name"));
console.log(myInfo.get("last_name"));
console.log(myInfo.get("org_title"));
console.log(myInfo.get("email"));
console.log(myInfo.get("organization"));
console.log(myInfo.get("mobile"));
console.log(myInfo.get("membership"));
console.log(myInfo.get("org_description"));

document.querySelector('#register').innerHTML = `
<p>First Name: ${myInfo.get("first_name")}</p>
<p>Last Name: ${myInfo.get("last_name")}</p>
<p>Organization Title: ${myInfo.get("org_title")}</p>
<p>Email: ${myInfo.get("email")}</p>
<p>Organization: ${myInfo.get("organization")}</p>
<p>Mobile: ${myInfo.get("mobile")}</p>
<p>Membership: ${myInfo.get("membership")}</p>
<p>Organization Description: ${myInfo.get("org_description")}</p>
`;
