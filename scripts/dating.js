let people = [];
let profiles = 0;

getRandomUsers();
async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=picture,gender,name,location"
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
<img src="${people.picture.large}" alt="${people.name.first} sitt profil bilde.">
<h4>${people.name.first}</h4>
<p>${people.location.city}, ${people.location.country}</p>`;
}

function swipeLeftAndRigth(event) {
    if (event.key === `ArrowLeft`) {
        showUsers();
    } else if (event.key === `ArrowRigth`) {
        showUsers();
    }
}
