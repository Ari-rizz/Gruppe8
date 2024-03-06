let people = [];
let likedProfiles = [];
let likes = 10;

getRandomUsers();
async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=picture,gender,name,location"
        );
        const data = await response.json();
        people = data.results;
        setTimeout(showProfile, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}
function showProfile() {
    const profile = document.createElement("div");
    profile.classList.add("profiles"); // Hvis vi skal style med css-fil

    console.log(people);
}
const profileCard = document.querySelector(`profile`);

function swipeLeftAndRigth(event) {
    if (evnet.key === `ArrowLeft`) {
        newProfile();
    } else if (event.key === `ArrowRigth`) {
        newProfile();
    }
}
