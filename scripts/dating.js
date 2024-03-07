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

function showProfile(person) {
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

    const swipeLeft = document.createElement("button");
    swipeLeft.innerHTML = "<= NOPE";
    swipeLeft.addEventListener("click", () => {
        console.log("Jeg er ikke interessert!");
    });

    function likedProfile(person) {
        console.log("Kommer det en person hit?");
        console.log(person);
        // henter innhold fra localeStorage
        likes -= 1;
        likedProfiles.push(person);
        saveToLocalStorage(likedProfiles);
    }

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
function createProfile(gender) {
    console.log("Kommer det en person hit?");
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

showLikedProfiles();
function showLikedProfiles() {
    const likedProfilesContainer = document.querySelector(
        ".liked-profiles-container"
    );
    likedProfilesContainer.innerHTML = "";
    likedProfiles.forEach((person, index) => {
        const profileCard = document.createElement("div");
        const profileCardImg = document.createElement("div");
        profileCardImg.innerHTML = `<img src="${likedProfiles[index].picture.medium}" style="width: 150px" />`;
        profileCardImg.style.width = "150px";
        const profileCardText = document.createElement("div");
        profileCardText.innerHTML = `<h3>${likedProfiles[index].name.first}</h3><p>${likedProfiles[index].location.city}</p>`;

        profileCard.appendChild(profileCardImg);
        profileCard.appendChild(profileCardText);

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Rediger";
        editBtn.addEventListener("click", () => {
            editPerson(person);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Slett";
        deleteBtn.addEventListener("click", () => {
            deletePerson(index);
        });
        profileCard.appendChild(editBtn);
        profileCard.appendChild(deleteBtn);
        likedProfilesContainer.appendChild(profileCard);
        // styler likedProfilesContainer
        likedProfilesContainer.style.display = "flex";
        likedProfilesContainer.style.flexwrap = "wrap";
        likedProfilesContainer.style.justifycontent = "space-between";
    });
}
function editPerson(person) {
    console.log("Vi skal nå redigere personen: ", person);
}

function deletePerson(person) {
    // const index = likedProfiles.indexOf(person);
    likedProfiles.splice(person, 1);
    saveToLocalStorage(likedProfiles);
    showLikedProfiles();
}
