let dogsImages = []; // Henter inn bilder fra dog.ceo
let usersApi = []; // Henter inn navn og bosted fra randomuser.me
let dogs = []; // Oppretter array som skal inneholde objekter til kortene.
let cardSection = document.querySelector(".card-section");

getDogs();
async function getDogs() {
    try {
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();
        dogsImages = data.message;
        // createDogsProfileCard();
        setTimeout(getRandomUsers, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn hundedata: " + error);
    }
}

async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=name,location"
        );
        const data = await response.json();
        usersApi = data.results;
        // createDogsProfileCard();
        setTimeout(makeDogsArray, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}

function makeDogsArray() {
    // Lager et array som inneholder objekter med dogs. Henter bilde fra dogsImages og navn og bosted fra usersApi
    for (let i = 0; i < dogsImages.length; i++) {
        let dog = {
            image: dogsImages[i],
            name: usersApi[i].name.first, // + " " + usersApi[i].name.last, Vet ikke om vi trenger etternavnet?
            location: usersApi[i].location.city,
        };
        dogs.push(dog);
    }
    createDogsProfileCard();
}

function createDogsProfileCard() {
    cardSection.innerHTML = "";
    dogs.forEach((dog, index) => {
        const dogCard = document.createElement("article");
        dogCard.classList.add("card");
        dogCard.innerHTML = `<img src= "${dogs[index].image}" alt="${dogs[index].name}" style="width: 100%">`;

        const dogInfo = document.createElement("div");
        dogInfo.classList.add("container");
        dogInfo.innerHTML += `<h3>${dogs[index].name}</h3>`;
        dogInfo.innerHTML += `<p>${dogs[index].location}</p>`;
        dogCard.appendChild(dogInfo);
        cardSection.appendChild(dogCard);
    });
}
// async function createDogsProfileCard() {
//     try {
//         const dogImg = await getDogs();
//         const userProfile = await getRandomUsers();

//         for (let i = 0; i < dogsImages.length; i++) {
//             const profileCard = document.createElement("div");
//             profileCard.classList.add("card");

//             const profileName = document.createElement("p");
//             profileName.textContent = `${userProfile[i].name.first} ${userProfile[i].name.last}`;
//             profileCard.appendChild(profileName);

//             const profileLocation = document.createElement("p");
//             profileLocation.textContent = `${userProfile[i].location.city} ${userProfile[i].location.country}`;
//             profileCard.appendChild(profileLocation);

//             const profileImg = document.createElement("img");
//             profileImg.src = dogImg;
//             profileCard.appendChild(profileImg);

//             const deleteButton = document.createElement("button");
//             deleteButton.textContent = "delete";
//             deleteButton.addEventListener("click", () => {
//                 profileCard.remove();
//             });
//             document.body.appendChild(profileCard);
//         }
//     } catch (error) {
//         console.log("Kunne ikke laste inn brukerdata:" + error);
//     }
// }
// createDogsProfileCard();
// //tror denne nå skal funke -Arian
// const newDogBtn = document.querySelector("new-dog-btn");
// //starta på en button her men dere kan forsette

