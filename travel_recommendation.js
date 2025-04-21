/*recommendation part
document.addEventListener("DOMContentLoaded", () => {
  fetch("./travel_recommendation_api.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load JSON");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched data:", data); // 👀 Check the output here
      showRecommendations(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

function showRecommendations(data) {
  const container = document.createElement("section");
  container.className = "travel-recommendations";
  container.innerHTML = `<h2>Travel Recommendations</h2>`;

  // Combine all destination types (cities, temples, beaches)
  const allDestinations = [
    ...data.countries.flatMap(country => country.cities),
    ...data.temples,
    ...data.beaches
  ];

  allDestinations.forEach((place) => {
    const card = document.createElement("div");
    card.className = "recommendation-card";

    // Update your image URLs here with your own images
    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}" />
      <h3>${place.name}</h3>
      <p>${place.description}</p>
      <button class="btn">View Details</button>
    `;

    container.appendChild(card);
  });

  document.body.appendChild(container);
}*/
 /*search part*/
let travelData = null; // Store fetched data globally

document.addEventListener("DOMContentLoaded", () => {
  fetch("./travel_recommendation_api.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load JSON");
      return response.json();
    })
    .then(data => {
      travelData = data;
      console.log("Fetched data:", travelData); // 👀 Check the output here
      const allPlaces = [
        ...data.countries.flatMap(country => country.cities),
        ...data.temples,
        ...data.beaches
      ];
      showRecommendations(allPlaces); // 👈 this is what was missing
      
      
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

  document.getElementById("btnSearch").addEventListener("click", () => {
    const keyword = document.getElementById("input").value.trim().toLowerCase();
    if (!keyword) return;

    const results = getMatchingRecommendations(keyword);
    showRecommendations(results);
  });

  document.getElementById("btnReset").addEventListener("click", () => {
    document.getElementById("input").value = "";
    removeOldRecommendations();
  });
});

function getMatchingRecommendations(keyword) {
  if (!travelData) return [];

  const allPlaces = [
    ...travelData.countries.flatMap(country => country.cities),
    ...travelData.temples,
    ...travelData.beaches
  ];

  // Check for keyword matches
  return allPlaces.filter(place => {
    const name = place.name.toLowerCase();
    const desc = place.description.toLowerCase();

    return (
      name.includes(keyword) ||
      desc.includes(keyword) ||
      (keyword === "temple" || keyword === "temples") && desc.includes("temple") ||
      (keyword === "beach" || keyword === "beaches") && desc.includes("beach") ||
      travelData.countries.some(c => c.name.toLowerCase() === keyword && c.cities.some(city => city.name === place.name))
    );
  });
}

function showRecommendations(places) {
  removeOldRecommendations();

  const container = document.createElement("section");
  container.className = "travel-recommendations";
  container.innerHTML = `<h2>Travel Recommendations</h2>`;

  if (places.length === 0) {
    container.innerHTML += `<p>No results found for your search.</p>`;
  } else {
    places.forEach((place) => {
      const card = document.createElement("div");
      card.className = "recommendation-card";
      card.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}" />
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <button class="btn">View Details</button>
      `;
      container.appendChild(card);
    });
  }

  document.body.appendChild(container);
}

/*function showRecommendations(places) {
  const container = document.getElementById("recommendation-container");
  container.innerHTML = ""; // Clear previous
  container.style.display = "block"; // Make sure it's visible

  const section = document.createElement("section");
  section.className = "travel-recommendations";
  section.innerHTML = `<h2>Travel Recommendations</h2>`;

  if (places.length === 0) {
    section.innerHTML += `<p>No results found for your search.</p>`;
  } else {
    places.slice(0, 6).forEach((place) => { // show at least 2 and max 6
      const card = document.createElement("div");
      card.className = "recommendation-card";
      card.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}" />
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <button class="btn">View Details</button>
      `;
      section.appendChild(card);
    });
  }

  container.appendChild(section);
}*/
// Function to remove old recommendations
function removeOldRecommendations() {
  const oldSection = document.querySelector(".travel-recommendations");
  if (oldSection) oldSection.remove();
}
 //reset function
 function resetForm(){
  document.getElementById("input").value = ""; // Clear the input field
  removeOldRecommendations(); // Remove old recommendations
  document.getElementById("recommendation-container").innerHTML = ""; // Clear the recommendation container
  document.getElementById("recommendation-container").style.display = "none"; // Hide the recommendation container
 }
