const userInfo = document.getElementById("userInfo");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {

    userInfo.innerHTML = `
        <div class="user-box">

            <a href="../doctorPage/patient-dashboard.html" class="profile-link">
                <i class="fa-solid fa-circle-user"></i>
                <span>${currentUser.name}</span>
            </a>

            <button id="logoutBtn" class="btn-logout">
                Logout
            </button>

        </div>
    `;


    document.getElementById("logoutBtn").addEventListener("click", () => {

        localStorage.removeItem("currentUser");

        window.location.href = "../HomePage/home.html";

    });


} else {

    userInfo.innerHTML = `
        <a href="../aboutPage/login.html" class="btn-login">
            Login
        </a>

        <a href="../aboutPage/register.html" class="btn-register">
            Register
        </a>
    `;

}