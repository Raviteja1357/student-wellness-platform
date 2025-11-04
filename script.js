// -------------------- LOGIN PAGE --------------------
if (window.location.pathname.endsWith("index.html")) {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const errorMsg = document.getElementById("error-msg");

    // Demo: static credentials
    if ((username === "admin" && password === "admin123" && role === "admin") ||
        (username === "student" && password === "student123" && role === "student")) {

      // Save user role
      localStorage.setItem("loggedUser", role);
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "Invalid credentials! Try again.";
    }
  });
}

// -------------------- DASHBOARD PAGE --------------------
if (window.location.pathname.endsWith("dashboard.html")) {
  const userRole = localStorage.getItem("loggedUser");

  if (!userRole) {
    window.location.href = "index.html";
  }

  const welcomeMsg = document.getElementById("welcomeMsg");
  welcomeMsg.textContent = `Welcome, ${userRole.toUpperCase()}!`;

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
  });

  // Expandable sections
  document.querySelectorAll(".expandable h2").forEach((header) => {
    header.addEventListener("click", () => {
      const section = header.parentElement;
      const options = section.querySelector(".options");
      options.classList.toggle("hidden");
    });
  });

  // Dynamic content
  window.showContent = function (type) {
    const contentMap = {
      mental: "<h4>Mental Health</h4><p>Access articles on stress management, counseling, and mindfulness techniques.</p>",
      fitness: "<h4>Fitness</h4><p>Find workout routines, beginner guides, and video tutorials to stay active.</p>",
      nutrition: "<h4>Nutrition</h4><p>Learn about balanced diets, meal plans, and healthy recipes.</p>",
      yoga: "<h4>Yoga Sessions</h4><p>Join our weekly yoga classes for relaxation and flexibility.</p>",
      meditation: "<h4>Meditation</h4><p>Participate in guided meditation sessions for mental clarity.</p>",
      "fitness-program": "<h4>Fitness Program</h4><p>Track your fitness progress and join group challenges.</p>",
      counselor: "<h4>Talk to a Counselor</h4><p>Book a session with a certified counselor for mental support.</p>",
      "peer-support": "<h4>Peer Support</h4><p>Connect with fellow students who share your experiences.</p>"
    };

    let targetDiv;
    if (["mental", "fitness", "nutrition"].includes(type)) {
      targetDiv = document.getElementById("resources-content");
    } else if (["yoga", "meditation", "fitness-program"].includes(type)) {
      targetDiv = document.getElementById("programs-content");
    } else {
      targetDiv = document.getElementById("support-content");
    }

    targetDiv.innerHTML = contentMap[type];
  };
}
