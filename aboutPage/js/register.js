const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all fields!"
    });
    return;
  }

  if (password.length < 8) {
    Swal.fire({
      icon: "warning",
      title: "Weak Password",
      text: "Password must be at least 8 characters."
    });
    return;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match"
    });
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const emailTaken = users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (emailTaken) {
    Swal.fire({
      icon: "error",
      title: "Email already registered",
      text: "Please login instead."
    });
    return;
  }

  const newUser = {
    id: Date.now(),
    firstName: firstName,
    lastName: lastName,
    name: `${firstName} ${lastName}`,
    email: email,
    phone: phone,
    password: password,
    role: "patient"
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    icon: "success",
    title: "Registration Successful",
    text: "Please login now.",
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    window.location.href = "login.html";
  });
});