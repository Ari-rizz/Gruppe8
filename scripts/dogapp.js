// lager async funksjon som leser api og returnerer data fra https://dog.ceo
let dogsApi = [];
async function getDogs() {
    try {
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();
        dogsApi = data.message;
        setTimeout(showDogs, 100);
    } catch (error) {
        console.log("Kunne ikke laste inn hundedata: " + error);
    }
}
function showDogs() {
    console.log(dogsApi);
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
