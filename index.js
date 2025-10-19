const stack = document.querySelector(".card-stack");
const swipeBtn = document.querySelector(".swipe-btn");

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
  },
  {
    username: "Michael Li",
    mutuals: "",
    bio: "Fitness enthusiast and gamer",
    profilePic: "/assets/images/placeholderpfp3.png",
    postImage: "/assets/images/postplaceholder2.png",
    caption: "Tried out the South Side Rec Center today. Would go again!",
    postedDate: "Yesterday at 5:32 PM",
  },
  {
    username: "Alexander Chen",
    mutuals: "Student Athlete CO'27",
    bio: "",
    profilePic: "/assets/images/placeholderpfp4.png",
    postImage: "/assets/images/aggiepark.png",
    caption: "Had a great time at Aggie Park this weekend. #GigEm",
    postedDate: "3 days ago",
  },
  {
    username: "Anna Smith",
    mutuals: "3 mutuals with you",
    bio: "Coffee lover and bookworm",
    profilePic: "/assets/images/placeholderpfp5.png",
    postImage: "/assets/images/postplaceholder3.png",
    caption: "Just finished reading a fantastic novel!",
    postedDate: "1 week ago",
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
