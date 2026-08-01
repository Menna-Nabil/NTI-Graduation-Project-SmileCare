let form = document.getElementById("loginForm");
let email = document.getElementById("email");
let password = document.getElementById("password");
let togglePassword = document.getElementById("togglePassword");


if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      togglePassword.textContent = "Hide";
    } else {
      password.type = "password";
      togglePassword.textContent = "Show";
    }
  });
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();


  if (emailValue === "" || passwordValue === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all fields!",
    });
    return;
  }


  let users = JSON.parse(localStorage.getItem("users")) || [];


  const matchedUser = users.find(
    (user) =>
      user.email.toLowerCase() === emailValue.toLowerCase() &&
      user.password === passwordValue
  );


  if (!matchedUser) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Email or password is incorrect.",
    });
    return;
  }


  localStorage.setItem("currentUser", JSON.stringify(matchedUser));


  Swal.fire({
    icon: "success",
    title: "Login Successful",
    text: `Welcome ${matchedUser.name}`,
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "../doctorPage/patient-dashboard.html";
  });

});