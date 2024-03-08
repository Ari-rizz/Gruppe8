let peopleApi = []; // Her er vår database med alle objekter
let sortedPeople = []; // Her er vår database med menn og/eller kvinner
let likedProfiles = []; // Her legges våre favoritter
let likes = 10; // Antall likte profiler
let swipes = 10; // Antall swipes
let preferedGender = "";

womenBtn = document.querySelector("#womenBtn");
menBtn = document.querySelector("#menBtn");
bothBtn = document.querySelector("#bothBtn");

cardSection = document.querySelector(".card-section");

// Sjekker og evt henter inn data fra localeStorage
checkLocalStorage();
function checkLocalStorage() {
    if (localStorage.getItem("savedLikedProfiles")) {
        likedProfiles = JSON.parse(localStorage.getItem("savedLikedProfiles"));
    } else {
        console.log("Ingenting i localeStorage!");
    }
}
function saveToLocalStorage(array) {
    localStorage.setItem("savedLikedProfiles", JSON.stringify(array));
    console.log("Lagret til localStorage!");
    showLikedProfiles();
}

// Justerer antall likes i forhold til likedProfiles
likes -= likedProfiles.length;

if (likes <= 0) {
    alert(
        "Du har nå ikke plass til flere favoritter! For å legge til flere favoritter må du slette noen av de gamle."
    );
}

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
    } else {
        sortedPeople = people;
    }
    createProfile(chosenGender);
}

function showProfile(person, index) {
    likedProfile(person);
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

    const btnDiv = document.createElement("div");
    btnDiv.style.display = "flex";
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
    btnDiv.append(swipeLeft, swipeRight);
    profileCard.appendChild(swipeLeft);
    profileCard.appendChild(swipeRight);
    cardSection.appendChild(profileCard);
}
function likedProfile(person) {
    console.log(person);
    // henter innhold fra localeStorage
    likes -= 1;
    likedProfiles.push(person);
    saveToLocalStorage(likedProfiles);
}
// laget createProfiles på samme måte som vi lagde createDogProfileCard
function createProfile() {
    const randomNumber = Math.floor(Math.random() * sortedPeople.length);
    personToShow = sortedPeople[randomNumber];
    showProfile(personToShow);
}

function swipeLeftAndRight(event) {
    if (event.key === `ArrowLeft`) {
        showNextProfile();
    } else if (event.key === `ArrowRight`) {
        //saveToLocalStorage();
        showNextProfile();
        localStorage.clear;
    }
}
function showNextProfile() {
    cardSection.innerHTML = "";
    const randomNumber = Math.floor(Math.random() * sortedPeople.length);
    const nextProfile = sortedPeople[randomNumber];
    if (nextProfile) {
        showProfile(nextProfile);
    } else {
        console.log("ingen å vise");
    }
}
// eventlistner for taster og for at det informasjon skal bli hentet inn med engang du laster inn siden
window.addEventListener("load", getRandomUsers);
window.addEventListener("keydown", swipeLeftAndRight);

showLikedProfiles();
function showLikedProfiles() {
    const likedProfilesContainer = document.querySelector(
        ".liked-profiles-container"
    );
    likedProfilesContainer.innerHTML = "";

    likedProfiles.forEach((person, index) => {
        const likedCard = document.createElement("div");
        likedCard.classList.add("liked-card");

        const infoDiv = document.createElement("div");
        infoDiv.style.display = "flex";

        const likedCardImg = document.createElement("div");
        likedCardImg.innerHTML = `<img src="${likedProfiles[index].picture.medium}" style="width: 150px" />`;

        const likedCardText = document.createElement("div");
        likedCardText.innerHTML = `<h3>${likedProfiles[index].name.first}</h3><p>${likedProfiles[index].location.city}</p>`;
        // profileCardText.style.backgroundColor = "black";
        infoDiv.append(likedCardImg, likedCardText);
        infoDiv.style.justifyContent = "space-around";

        const buttons = document.createElement("div");
        buttons.style.display = "flex";
        buttons.style.width = "100%";
        buttons.style.justifyContent = "space-around";

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Rediger";
        editBtn.style.width = "40%";
        editBtn.addEventListener("click", () => {
            editPerson(index);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Slett";
        deleteBtn.style.width = "40%";
        deleteBtn.addEventListener("click", () => {
            deletePerson(index);
        });
        buttons.append(editBtn, deleteBtn);

        likedCard.append(infoDiv, buttons);
        likedProfilesContainer.appendChild(likedCard);
    });
}
function editPerson(index) {
    console.log("Vi skal nå redigere index: ", index);
}

function deletePerson(person) {
    // const index = likedProfiles.indexOf(person);
    likedProfiles.splice(person, 1);
    saveToLocalStorage(likedProfiles);
    showLikedProfiles();
}
