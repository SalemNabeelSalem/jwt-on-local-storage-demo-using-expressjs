const loginForm = document.getElementById("login-form");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await axios.post("/login", {
    username: usernameField.value,
    password: passwordField.value,
  }).then((response) => {
    localStorage.setItem("user-token", response.data.token);

    alert("Logged in Successfully");

    usernameField.value = "";

    passwordField.value = "";
  }).catch((error) => {
    localStorage.removeItem("user-token");

    alert("Invalid Username or Password");
  });
});

document
  .getElementById("getsecret")
  .addEventListener("click", async function () {
    await axios.post("/info", {
      token: localStorage.getItem("user-token"),
    }).then((response) => {
      document.getElementById("message-area").textContent =
        response.data.message;
    }).catch((error) => {
      document.getElementById("message-area").textContent =
        "Only Logged in Users Can See This Info.";
    });
  });
