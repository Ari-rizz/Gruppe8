let peopleApi = []; // Her er vår database med alle objekter
let sortedPeople = []; // Her er vår database sortert på menn og/eller kvinner
let likedProfiles = []; // Her legges våre favoritter
let likes = 10; // Antall likte profiler
let swipes = 10; // Antall swipes
let preferedGender = "";
let personToShow;
let personToShowIndex;

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
    updateSwipes(); // Antall likes vi har til overs
    // createProfile();
    showLikedProfiles();
}

// Justerer antall likes i forhold til likedProfiles

likes -= likedProfiles.length;
updateSwipes();
function updateSwipes() {
    let score = document.querySelector("#score");
    score.innerHTML = `
        <h3>Gjenstående likes: ${likes}</h3>
       <h3>Gjestående swipes ${swipes}</h3>
       `;
    if (likes <= 0) {
        alert(
            "Du har nå ikke plass til flere favoritter! For å legge til flere favoritter må du slette noen av de gamle."
        );
    }
    if (swipes <= 0) {
        let answer;
        while (answer !== "j") {
            answer = prompt(
                "Du har ikke flere swipes igjen! Vil du swipe mer? j/n"
            );
            if (answer === "j") {
                swipes = 10;
                updateSwipes();
            }
        }
    }
}

getRandomUsers();
async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=100&nat=no&inc=picture,gender,name,location"
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
// laget createProfiles på samme måte som vi lagde createDogProfileCard
function createProfile() {
    const randomNumber = Math.floor(Math.random() * sortedPeople.length);
    personToShow = sortedPeople[randomNumber];
    personToShowIndex = randomNumber;
    showProfile(personToShow, randomNumber);
}
// Viser frem tilfeldig person å swipe på
function showProfile(person, index) {
    // Viser frem en person i cardSection
    let genderColor;
    if (person.gender === "female") {
        genderColor = "lightpink";
    } else {
        genderColor = "lightblue";
    }
    cardSection.innerHTML = "";
    const profileCard = document.createElement("div");
    profileCard.classList.add("card");
    profileCard.style.backgroundColor = genderColor;
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<img style="width: 200px" src="${person.picture.large}" alt="${person.name.first}'s profile picture">`;
    profileCard.appendChild(imgDiv);
    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = `<h4>${person.name.first}</h4>`;
  //  nameDiv.innerHTML += `<h5>${person.dob.age}</h5>`;
    nameDiv.innerHTML += `<p>${person.location.city}</p>`;
    profileCard.appendChild(nameDiv);

    const btnDiv = document.createElement("div");
    // btnDiv.style.display = "flex";
    const swipeLeft = document.createElement("button");
    swipeLeft.innerHTML = "<= NOPE";
    swipeLeft.style.height = "30px";
    swipeLeft.addEventListener("click", () => {
        swipes--;
        updateSwipes();
        removeProfile(index);
        createProfile();
    });
    const swipeRight = document.createElement("button");
    swipeRight.innerHTML = "YES =>";
    swipeRight.style.height = "30px";
    swipeRight.addEventListener("click", () => {
        likedProfile(person);
        createProfile();
    });
    btnDiv.append(swipeLeft, swipeRight);
    profileCard.append(btnDiv);
    cardSection.appendChild(profileCard);
}
function likedProfile(person) {
    console.log(person);
    // henter innhold fra localeStorage
    swipes--;
    likes--;
    updateSwipes();
    likedProfiles.push(person);
    saveToLocalStorage(likedProfiles);
}

function swipeLeftAndRight(event) {
    if (event.key === `ArrowLeft`) {
        swipes--;
        likes--;
        updateSwipes();
        removeProfile(personToShowIndex); //fjerner perosnen som blir swipet til venstre
        createProfile();//henter ny profil
    } else if (event.key === `ArrowRight`) {
        console.log(personToShow);
        updateSwipes();
        likedProfile(personToShow);//legges til i localStorage
        createProfile();//henter ny profil 
    }
}

// eventlistner for taster og for at det informasjon skal bli hentet inn med engang du laster inn siden
// window.addEventListener("load", getRandomUsers);
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
        likedCardImg.innerHTML = `<img src="${likedProfiles[index].picture.medium}" />`;

        const likedCardText = document.createElement("div");
        likedCardText.innerHTML = `<h3>${likedProfiles[index].name.first}</h3>`;
     //   likedCardText.innerHTML += `<h4>${likedProfiles[index].dob.date.age}</h4>`;
        likedCardText.innerHTML += `<p>${likedProfiles[index].location.city}</p>`;
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
  const profileToEdit = likedProfiles[index];
//Spør brukeren om ny info
  const editName = prompt("Rediger navnet her", profileToEdit.name.first)
 // const editAge = prompt("Rediger alderen her", profileToEdit.dob.age)
  const editLocation = prompt("Rediger sted her", profileToEdit.location.city)
//Redigere den nye infoen
  profileToEdit.name.first = editName;
  //profileToEdit.dob.age = parseInt(editAge);
  profileToEdit.location.city = editLocation
// lagrer den nye informasjonen i arrayet til localStorage
saveToLocalStorage(likedProfiles);
//oppdaterer profilen
showLikedProfiles();
    console.log("Vi skal nå redigere index: ", index);
}
// Vi har to slettefunksjoner, for databasen, og for likte profiler!
// Fjerner fra databasen når vi swiper venstre
function removeProfile(index) {
    // const index = sortedPeople.findIndex(
    //     (profile) => profile === personToShow
    // );
    sortedPeople.splice(index, 1);
    // if (index !== -1) {
    //     likedProfiles.splice(index, 1);
    //     saveToLocalStorage();
    //     createProfile();
    // }
}
function deletePerson(person) {
    // Mottar index som skal slettes fra likedProfiles
    console.log(person);
    // const index = likedProfiles.indexOf(person);
    likedProfiles.splice(person, 1);
    likes++;
    saveToLocalStorage(likedProfiles);
    showLikedProfiles();
}
