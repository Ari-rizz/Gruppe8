let peopleApi = []; // Her er vår database med alle objekter
let sortedPeople = []; // Her er vår database med menn eller kvinner
let likedprofiles = []; // Her legges våre favoritter
let likes = 10; // Antall swipes
let preferedGender = "";

womenBtn = document.querySelector("#womenBtn");
menBtn = document.querySelector("#menBtn");
bothBtn = document.querySelector("#bothBtn");

cardSection = document.querySelector(".card-section");

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

function showProfile(person) {
    // Viser frem en person i cardSection
    cardSection.innerHTML = "";
    console.log("Viser person i cardSection");
    const profileCard = document.createElement("div");
    profileCard.innerHTML = "";
    profileCard.classList.add("card");
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<img src="${person.picture.large}" alt="${person.name.first}'s profile picture">`;
    profileCard.appendChild(imgDiv);
    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = `<h4>${person.name.first}</h4>`;
    nameDiv.innerHTML += `<p>${person.location.city}</p>`;
    profileCard.appendChild(nameDiv);

    const swipeLeft = document.createElement("button");
    swipeLeft.innerHTML = "<= NOPE";
    swipeLeft.addEventListener("click", () => {
        console.log("Jeg er ikke interessert!");
    });

    const swipeRight = document.createElement("button");
    swipeRight.innerHTML = "YES =>";
    swipeRight.addEventListener("click", () => {
        console.log("Jeg er interessert!");
    });
    profileCard.appendChild(swipeLeft);
    profileCard.appendChild(swipeRight);
    cardSection.appendChild(profileCard);
}
// laget createProfiles på samme måte som vi lagde createDogProfileCard
function createProfiles(gender) {
    const randomNumber = Math.floor(Math.random() * sortedPeople.length);
    personToShow = sortedPeople[randomNumber];
    showProfile(personToShow);
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
