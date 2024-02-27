// lager async funksjon som leser api og returnerer data fra https://dog.ceo
let dogsImages = [];
getDogs();
async function getDogs() {
    try {
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();
        dogsImages = data.message;
        setTimeout(showDogs, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn hundedata: " + error);
    }
}
// Lager async funksjon som henter 50 brukere fra https://randomuser.me

let usersApi = [];
getRandomUsers();
async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=name,location"
        );
        const data = await response.json();
        usersApi = data.results;
        setTimeout(showUsers, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}

function showDogs() {
    console.log(dogsImages);
}
function showUsers() {
    console.log(usersApi);
}

function createDogsProfileCard()

const dogImg = await getDogs()
const userProfile = await getRandomUsers()

const profileCard = document.createElement('div')
const profileCard.classlist.add('.profile-card')

const profileName = document.createElement('p')
profileName.textContent = `${userProfile.name.first} ${userProfile.name.last}`;
profileName.appendChild(profileName)

const profileLocation = document.createElement('p')
profileLocation.textContent = `${userProfile.location.city} ${userProfile.location.country}`;
profileLocation.appendChild(profileLocation)

const profileImg = document.createElement('img')
profileImg.scr = dogImg
profileImg.appendChild(profileImg)
