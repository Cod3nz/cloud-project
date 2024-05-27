// Functie om willekeurige gebruikers op te halen
async function getRandomUsers(numUsers) {
  try {
    // API URL voor willekeurige gebruikers met het opgegeven aantal
    const apiUrl = `https://randomuser.me/api/?results=${numUsers}`;
    const response = await fetch(apiUrl);
    const userData = await response.json();

    // Controleer of de array 'results' bestaat en niet leeg is
    if (userData.results && userData.results.length > 0) {
      // Selecteer de HTML-container voor gebruikers
      let listUsersHTML = document.querySelector(".randomUsers");

      // Wis de bestaande inhoud
      listUsersHTML.innerHTML = "";

      // Itereer over elke willekeurige gebruiker
      userData.results.forEach((user, index) => {
        const { name, picture, location } = user;

        // Maak een nieuw gebruikerselement aan
        let newUser = document.createElement("section");
        newUser.classList.add("user");
        newUser.dataset.id = index; // Gebruik de index als ID
        newUser.innerHTML = `
          <img class="userImg" src="${picture.large}" alt="random user" />
          <article class="userDetails">
            <p class="userTitle">Aanspreektitel: ${name.title}</p>
            <p class="userSurname">Familienaam: ${name.last}</p>
            <p class="userName">Voornaam: ${name.first}</p>
            <p class="userCountry">Land: ${location.country}</p>
          </article>
        `;

        // Voeg het nieuwe gebruikerselement toe aan de lijst
        listUsersHTML.appendChild(newUser);
      });
    } else {
      console.error("Geen gebruikersgegevens gevonden.");
    }
  } catch (error) {
    console.error("Er is een fout opgetreden:", error.message);
  }
}

// Roep de functie aan met het gewenste aantal gebruikers (bijv. 20)
getRandomUsers(20);
