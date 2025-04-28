
let contacts = JSON.parse(localStorage.getItem("contacts")) || []; 


document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const firstName = document.getElementById("firstName").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;

    
    contacts.push({ firstName, surname, email, telephone });
    localStorage.setItem("contacts", JSON.stringify(contacts)); 
    generateTable(); 

    event.target.reset(); 
});


function generateTable() {
    const tableBody = document.getElementById("contactTableBody");
    tableBody.innerHTML = ""; 

    contacts.forEach((contact, index) => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${contact.firstName}</td>
            <td>${contact.surname}</td>
            <td>${contact.email}</td>
            <td>${contact.telephone}</td>
            <td><button class="delete-button">Delete</button></td>
        `;

       
        const deleteButton = newRow.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            contacts.splice(index, 1); 
            localStorage.setItem("contacts", JSON.stringify(contacts)); 
            generateTable(); 
        });

        tableBody.appendChild(newRow);
    });
}

document.querySelectorAll("th").forEach((header, index) => {
    header.addEventListener("click", function () {
        const columnKeys = ["firstName", "surname", "email", "telephone"];
        if (index < columnKeys.length) {
            contacts.sort((a, b) => a[columnKeys[index]].localeCompare(b[columnKeys[index]]));
            localStorage.setItem("contacts", JSON.stringify(contacts)); 
            generateTable(); 
        }
    });
});

generateTable();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./serviceWorker.js').then(function(registration) {
            console.log('ServiceWorker registered with scope:', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed:', err);
        });
    });
}
