// -------------------- LOGIN PAGE --------------------
if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname.endsWith("/") ||
  window.location.pathname === "/student-wellness-platform/"
) {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;
      const errorMsg = document.getElementById("error-msg");

      if (
        (username === "admin" && password === "admin123" && role === "admin") ||
        (username === "student" && password === "student123" && role === "student")
      ) {
        localStorage.setItem("loggedUser", role);
        window.location.href = "dashboard.html";
      } else {
        errorMsg.textContent = "Invalid credentials! Try again.";
      }
    });
  }
}

// -------------------- DASHBOARD ROLE HANDLING --------------------
if (window.location.pathname.includes("dashboard.html")) {
  const role = localStorage.getItem("loggedUser");
  const welcomeMsg = document.getElementById("welcomeMsg");
  const adminPanel = document.getElementById("admin-panel");

  welcomeMsg.textContent = `Welcome, ${role.toUpperCase()} 👋`;

  if (role === "admin") {
    adminPanel.classList.remove("hidden");
  }
}

// -------------------- EXPANDABLE SECTIONS --------------------
document.querySelectorAll(".expandable").forEach(section => {
  section.addEventListener("click", () => {
    const options = section.querySelector(".options");
    options.classList.toggle("hidden");
  });
});

// -------------------- LOAD SECTION CONTENT --------------------
function showContent(type) {
  let content = "";

  if (type === "mental") {
    content = `
      <h3>Mental Health Resources</h3>
      <p>Mental health includes emotional, psychological, and social well-being. It affects how we think, feel, and act.</p>
      <ul>
        <li>Practice mindfulness and meditation daily</li>
        <li>Get 7–8 hours of sleep every night</li>
        <li>Stay connected with friends and family</li>
        <li>Exercise regularly to reduce stress hormones</li>
        <li>Talk to a counselor if you feel overwhelmed</li>
      </ul>
      <h4>Helpful Activities</h4>
      <p>Try deep breathing: inhale for 4 sec, hold for 4 sec, exhale for 4 sec — repeat 10 times.</p>
    `;
    document.getElementById("resources-content").innerHTML = content;
  }

  else if (type === "fitness") {
    content = `
      <h3>Physical Fitness</h3>
      <p>Physical activity keeps your body strong and improves mood, brain function, and energy levels.</p>
      <ul>
        <li>Exercise for at least 30 minutes daily (walking, running, yoga)</li>
        <li>Do strength training twice a week</li>
        <li>Stretch to improve flexibility and posture</li>
        <li>Take short breaks between long study hours</li>
      </ul>
      <h4>Weekly Workout Plan</h4>
      <p>Mon: Cardio | Tue: Strength | Wed: Yoga | Thu: Full body | Fri: Stretch</p>
    `;
    document.getElementById("resources-content").innerHTML = content;
  }

  else if (type === "nutrition") {
    content = `
      <h3>Nutrition & Healthy Eating</h3>
      <p>Your body needs the right nutrients to maintain energy, brain power, and strong immunity.</p>
      <ul>
        <li>Eat more fruits, vegetables, and whole grains</li>
        <li>Avoid excess sugar & junk food</li>
        <li>Drink 8+ glasses of water daily</li>
        <li>Include protein in every meal (eggs, beans, nuts, milk)</li>
        <li>Do not skip breakfast</li>
      </ul>
      <h4>Sample Daily Menu</h4>
      <p>Breakfast: Oatmeal + fruit | Lunch: Rice + veggies & protein | Dinner: Soup or chapati + salad</p>
    `;
    document.getElementById("resources-content").innerHTML = content;
  }
}


// -------------------- LOGOUT --------------------
const logout = document.getElementById("logout-btn");
if (logout) {
  logout.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
  });
}
function sendSuggestion() {
  const text = document.getElementById("suggestionInput").value;

  fetch("http://localhost:5000/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(data => {
    alert("Suggestion submitted!");
    loadSuggestions(); // refresh list
  })
  .catch(err => console.log(err));
}
function loadSuggestions() {
  fetch("http://localhost:5000/suggestions")
    .then(res => res.json())
    .then(data => {
      let box = document.getElementById("suggestionsList");
      box.innerHTML = "";

      data.forEach(item => {
        box.innerHTML += `<p>${item.text} <small>${new Date(item.date).toLocaleString()}</small></p>`;
      });
    })
    .catch(err => console.log(err));
}
window.onload = loadSuggestions;
