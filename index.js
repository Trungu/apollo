const stack = document.querySelector(".card-stack");
const swipeBtn = document.querySelector(".swipe-btn");
const loginbtn = document.querySelector(".login-btn");
const mainContainer = document.querySelector(".main-container");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// username: aggieCadet67
// password: GigEm2025!

// Example posts array
const posts = [
  {
    username: "Branden Kelvin",
    mutuals: "5 mutuals with you",
    bio: "Loves hiking and photography",
    profilePic: "/assets/images/placeholderpfp.png",
    postImage: "/assets/images/postplaceholder.png",
    caption: "Just hit 10k steps today! #10KSTEPS #4MILES",
    postedDate: "Today at 10:02 PM",
    likes: 103,
    comments: 15,
    shares: 56,
  },
  {
    username: "Michael Li",
    mutuals: "",
    bio: "Fitness enthusiast and gamer",
    profilePic: "/assets/images/placeholderpfp3.png",
    postImage: "/assets/images/postplaceholder2.png",
    caption: "Tried out the South Side Rec Center today. Would go again!",
    postedDate: "Yesterday at 5:32 PM",
    likes: 87,
    comments: 12,
    shares: 33,
  },
  {
    username: "Alexander Chen",
    mutuals: "Student Athlete CO'27",
    bio: "",
    profilePic: "/assets/images/placeholderpfp4.png",
    postImage: "/assets/images/aggiepark.png",
    caption: "Had a great time at Aggie Park this weekend. #GigEm",
    postedDate: "3 days ago",
    likes: 245,
    comments: 37,
    shares: 72,
  },
  {
    username: "Anna Smith",
    mutuals: "Student Athlete CO'27",
    bio: "",
    profilePic: "/assets/images/placeholderpfp5.png",
    postImage: "/assets/images/postplaceholdertest.png",
    caption: "Loving Polo Road Rec Center! Great location & Equipment",
    postedDate: "3 days ago",
    likes: 132,
    comments: 19,
    shares: 41,
  },
];

// Function to create a card from a post object
function createCard(post, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.setProperty("--i", index);

  if (index === 0) card.classList.add("front");

  if (index !== 0) {
    const angle = (Math.random() - 0.5) * 6; // random tilt for back cards
    card.style.setProperty("--tilt", `${angle}deg`);
  } else {
    card.style.setProperty("--tilt", "0deg");
  }

  const secondaryText = post.mutuals ? post.mutuals : post.bio;

  card.innerHTML = `
    <div class="card-top-bar">
        <img src="${post.profilePic}" alt="Profile Picture" class="profile-picture" />
        <div class="nav-container">
        <span class="username">${post.username}</span>
        <span>${secondaryText}</span>
        </div>
    </div>
    <div class="card-image">
        <img src="${post.postImage}" alt="Post Image" class="post-image" />
        <div class="card-caption">
        <p class="caption-text">${post.caption}</p>
        <p class="caption-text posted-date">${post.postedDate}</p>
        </div>
    </div>
    <div class="card-bottom-bar">
        <button class="like-btn">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span>${post.likes}</span>
        </button>
        <button class="comment-btn">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            <span>${post.comments}</span>
        </button>
        <button class="share-btn">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
                <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
            </svg>
            <span>${post.shares}</span>
        </button>
    </div>
`;

  return card;
}

let cardCounter = 0; // tracks index in posts array
let dummyCounter = 1; // for dummy cards

// Initialize first 3 cards
const initialCards = Math.min(posts.length, 3);
for (let i = 0; i < initialCards; i++) {
  stack.appendChild(createCard(posts[i], i));
  cardCounter++;
}

// Swipe functionality
swipeBtn.addEventListener("click", () => {
  const cards = stack.querySelectorAll(".card");
  if (cards.length === 0) return;

  const topCard = cards[0];
  topCard.classList.add("going");
  topCard.classList.remove("front");

  setTimeout(() => {
    topCard.remove();

    const remaining = stack.querySelectorAll(".card");
    remaining.forEach((card, i) => {
      card.style.setProperty("--i", i);
      card.classList.remove("front");

      if (i === 0) {
        card.classList.add("front");
        card.style.setProperty("--tilt", "0deg");
      } else {
        const angle = (Math.random() - 0.5) * 6;
        card.style.setProperty("--tilt", `${angle}deg`);
      }
    });

    // If less than 3 cards, add next post if available, else dummy
    if (remaining.length < 3) {
      let newCardData;
      if (cardCounter < posts.length) {
        newCardData = posts[cardCounter];
        cardCounter++;
      } else {
        newCardData = {
          username: `New User ${dummyCounter}`,
          mutuals: "",
          bio: "This is a new user bio",
          profilePic: "/assets/images/placeholderpfp.png",
          postImage: "/assets/images/postplaceholder.png",
          caption: "New post content",
          postedDate: "Just now",
          likes: 0,
          comments: 0,
          shares: 0,
        };
        dummyCounter++;
      }

      const newCard = createCard(newCardData, 2);
      newCard.classList.add("new");
      newCard.addEventListener("animationend", () =>
        newCard.classList.remove("new")
      );
      stack.appendChild(newCard);
    }
  }, 500);
});

loginbtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Example check: hardcoded credentials
  const validEmail = "aggieCadet67"; // replace with your email logic
  const validPassword = "GigEm2025!";

  if (!email || !password) {
    alert("Please enter a valid email and password.");
    return;
  }

  if (email !== validEmail || password !== validPassword) {
    alert("Invalid email or password.");
    return;
  }

  // If correct, fade out login
  const loginWrapper = document.querySelector(".login-container-wrapper");
  loginWrapper.classList.add("hidden");

  // Show main content after fade
  setTimeout(() => {
    mainContainer.style.visibility = "visible";
  }, 800);
});

function triggerAnimation() {
  const img = document.querySelector('.apollo-img');

  // Add the animation class
  img.classList.add('animate');

  // Remove the class after animation ends so it can be triggered again
  img.addEventListener('animationend', () => {
    img.classList.remove('animate');
  }, { once: true });
}

function triggerSadAnimation() {
  const img = document.querySelector('.apollo-img');

  // Add the animation class
  img.classList.add('animatesad');

  // Remove the class after animation ends so it can be triggered again
  img.addEventListener('animationend', () => {
    img.classList.remove('animatesad');
  }, { once: true });
}

document.addEventListener('keydown', function(event) {
  if (event.key === "a" || event.key === "A") { // lowercase or uppercase 'A'
    triggerSadAnimation();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === "k" || event.key === "K") { // lowercase or uppercase 'A'
    triggerAnimation();
  }
});