let people = [];
let score = 10; // for å holde styr på hvor mange swipe man har igjen 
async function getRandomUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?results=50&nat=no&inc=name,location"
    );
    const data = await response.json();
    people = data.results;
    setTimeout(showUsers, 500);
  } catch (error) {
    console.log("Kunne ikke laste inn brukerdata: " + error);
  }
}

function showUsers() {
  createProfiles();
  console.log(people);
}
// laget createProfiles på samme måte som vi lagde createDogProfileCard
function createProfiles() {
  const cardSection = document.querySelector(".card-section");
  cardSection.innerHTML = "";
  people.forEach(profile => {
    const profileCard = document.createElement("div");
    profileCard.classList.add("card");
    profileCard.innerHTML = `
      <img src="${profile.picture}" alt="${profile.name.first}'s profile picture">
      <h4>${profile.name.first}</h4>
      <p>${profile.location.city}, ${profile.location.country}</p>
    `;
    cardSection.appendChild(profileCard);
  });
}

function swipeLeftAndRigth(event) {
  if (event.key === `ArrowLeft`) {
    showUsers();
  } else if (event.key === `ArrowRigth`) {
    showUsers();
  }
}
// eventlistner for taster og for at det informasjon skal bli hentet inn med engang du laster inn siden
window.addEventListener("load", getRandomUsers);
window.addEventListener("keydown", swipeLeftAndRigth);