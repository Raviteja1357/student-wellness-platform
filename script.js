// -------------------- LOGIN PAGE --------------------
if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname.endsWith("/") ||
  window.location.pathname === "/student-wellness-portal/"
) {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;
      const errorMsg = document.getElementById("error-msg");

      // Demo: static credentials
      if (
        (username === "admin" && password === "admin123" && role === "admin") ||
        (username === "student" && password === "student123" && role === "student")
      ) {
        localStorage.setItem("loggedUser", role);
        window.location.href = `${window.location.origin}${window.location.pathname.replace(/index\.html?$/, "")}dashboard.html`;
      } else {
        errorMsg.textContent = "Invalid credentials! Try again.";
      }
    });
  }
}
