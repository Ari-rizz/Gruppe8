let peopleApi = []; // Her er vår database med alle objekter
let sortedPeople = []; // Her er vår database med menn eller kvinner
let likedprofiles = []; // Her legges våre favoritter
let likes = 10; // Antall swipes
let preferedGender = "";

womenBtn = document.querySelector("#womenBtn");
menBtn = document.querySelector("#menBtn");
bothBtn = document.querySelector("#bothBtn");

getRandomUsers();
async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=picture,gender,name,location"
        );
        const data = await response.json();
        people = data.results;
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}

womenBtn.addEventListener("click", () => {
    preferedGender = "female";

    selectGender(preferedGender);
});
menBtn.addEventListener("click", () => {
    preferedGender = "male";
    selectGender(preferedGender);
});
bothBtn.addEventListener("click", () => {
    preferedGender = "both";
    selectGender(preferedGender);
});

function selectGender(gender) {
    chosenGender = gender;
    if (chosenGender !== "both") {
        sortedPeople = people.filter((person) => person.gender === gender);
        console.log(sortedPeople);
    } else {
        sortedPeople = people;
        console.log(sortedPeople);
    }
    console.log(chosenGender);
    createProfiles(chosenGender);
}

function showUsers() {
    createProfiles();
    console.log(people);
}
// laget createProfiles på samme måte som vi lagde createDogProfileCard
function createProfiles(gender) {
    console.log(gender);
    const cardSection = document.querySelector(".card-section");
    cardSection.innerHTML = `Jeg vil se ${gender}`;
    // people.forEach((profile) => {
    //     const profileCard = document.createElement("div");
    //     profileCard.classList.add("card");
    //     profileCard.innerHTML = `
    //   <img src="${profile.picture}" alt="${profile.name.first}'s profile picture">
    //   <h4>${profile.name.first}</h4>
    //   <p>${profile.location.city}, ${profile.location.country}</p>
    // `;
    //     cardSection.appendChild(profileCard);
    // });
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
