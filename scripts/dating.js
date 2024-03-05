let people = [];
let profiles = 0;

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
  createProfile();
  console.log(profiles);
}
function createProfile() {
  const profile = people;
  const cardSection = document.querySelector(`.card-section`);
  const profileCard = document.querySelector(`.card`);
  cardSection.innerHTML = "";
  profileCard.innerHTML = `
<img src="${profile.picture.large}" alt="${profile.name.first} sitt profil bilde.">
<h4>${profile.name.first}</h4>
<p>${profile.location.city}, ${profile.location.country}</p>`;
}

function swipeLeftAndRigth(event) {
  if (event.key === `ArrowLeft`) {
    showUsers();
  } else if (event.key === `ArrowRigth`) {
    showUsers();
  }
}


