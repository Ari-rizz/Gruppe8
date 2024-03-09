let dogsImages = []; // Henter inn bilder fra dog.ceo
let usersApi = []; // Henter inn navn og bosted fra randomuser.me
let dogs = []; // Oppretter array som skal inneholde objekter til kortene.
let cardSection = document.querySelector(".card-section");

const breeds = [
    { Labrador: "labrador" },
    { Bulldog: "bulldog" },
    { Pitbull: "pitbull" },
    { GoldenRetriver: "retriever-golden" },
    { Husky: "husky" },
]; // for filtrering av hunder, valgte bare 5 tilfeldigee

getDogs();
async function getDogs() {
    try {
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();
        dogsImages = data.message;
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
            // breed:fuksjon for breedfilter
        };
        dogs.push(dog);
    }
    console.log(dogs);
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

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Slett";
        deleteButton.addEventListener("click", () => {
            dogCard.remove();
        });

        dogCard.appendChild(deleteButton);

        const chatButton = document.createElement("button");
        chatButton.textContent = "Chat";
        chatButton.addEventListener("click", () => {
            // 
            toggleChatBox
        });
        dogCard.appendChild(chatButton);

        cardSection.appendChild(dogCard);
    });
    
}

document.addEventListener('DOMContentLoaded', function() {
    // Henter nødvendige elementer med querySelector
    const dogCard = document.querySelector('#dogCard');
    const openChatButton = document.querySelector('#openChat');
    const closeChatButton = document.querySelector('#closeChat');
    const sendMessageButton = document.querySelector('#sendMessage');
    const messageInput = document.querySelector('#messageInput');
    const messagesContainer = document.querySelector('#messages');
  
    // Oppretter chat-knappen og legger den til i dogCard-elementet
    const chatButton = document.createElement('button');
    chatButton.textContent = 'Chat';
    chatButton.addEventListener('click', toggleChatBox);
    dogCard.appendChild(chatButton);
  
    // Oppretter chatboksens innhold
    const chatBox = document.createElement('div');
    chatBox.id = 'chatBox';
    chatBox.classList.add('chat-box');
    chatBox.style.display = 'none';
  
    // Funksjon for å åpne eller lukke chatboksen
    function toggleChatBox() {
      if (chatBox.style.display === 'none') {
        chatBox.style.display = 'block';
        addRandomGreeting();
      } else {
        chatBox.style.display = 'none';
      }
    }
  
    // Legg til klikkhendelse for å lukke chatboksen
    closeChatButton.addEventListener('click', function() {
      chatBox.style.display = 'none';
    });
  
    // Array for å lagre meldinger
    let messages = [];
  
    // Legg til klikkhendelse for å sende melding
    sendMessageButton.addEventListener('click', function() {
      const messageText = messageInput.value.trim();
      if (messageText !== '') {
        messages.push(messageText);
        displayMessages();
        messageInput.value = '';
      }
    });
  
    // Funksjon for å vise meldinger i chatboksen
    function displayMessages() {
      messagesContainer.innerHTML = '';
      messages.forEach((message, index) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Slett';
        deleteButton.addEventListener('click', function() {
          messages.splice(index, 1);
          displayMessages();
        });
  
        messageElement.appendChild(deleteButton);
        messagesContainer.appendChild(messageElement);
      });
    }
  
    // Funksjon for å legge til en tilfeldig hilsen
    function addRandomGreeting() {
      const greetings = ['Hei!', 'Hallo!', 'God dag!', 'Hei!'];
      const randomIndex = Math.floor(Math.random() * greetings.length);
      const randomGreeting = greetings[randomIndex];
      const greetingElement = document.createElement('div');
      greetingElement.textContent = randomGreeting;
      messagesContainer.appendChild(greetingElement);
    }
  });
  

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
