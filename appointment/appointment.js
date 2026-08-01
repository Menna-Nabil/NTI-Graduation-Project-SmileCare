let patientName = document.getElementById("pname");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let service = document.getElementById("service");
let date = document.getElementById("date");
let time = document.getElementById("time");
let doctor = document.getElementById("Doctor");
let notes = document.getElementById("notes");

let bookBtn = document.getElementById("bookBtn");
let updateBtn = document.getElementById("updateBtn");

let currentIndex = 0;

let patientArr = [];


// Load appointments
if (localStorage.getItem("appointments") != null) {

    patientArr = JSON.parse(localStorage.getItem("appointments"));

    displayAppointment(patientArr);

}



// Book Appointment
function bookAppointment() {


    let currentUser = JSON.parse(localStorage.getItem("currentUser"));


    if (!currentUser) {

        alert("Please login first");

        return;
    }



    if (validateName() == true && validateAppointment() == true) {


        let patient = {

            id: Date.now(),

            patientId: currentUser.id,

            name: patientName.value,

            email: email.value,

            phone: phone.value,

            service: service.value,

            date: date.value,

            time: time.value,

            doctor: doctor.value,

            doctorName: doctor.value,

            notes: notes.value,

            status: "Upcoming"

        };



        patientArr.push(patient);



        localStorage.setItem(
            "appointments",
            JSON.stringify(patientArr)
        );



        displayAppointment(patientArr);

        clear();


    }


    else if (validateName() == false) {


        alert("The first and second name must start with a capital letter.");


    }


    else {


        alert("This appointment time is already booked.");


    }

}





// Display table
function displayAppointment(arr) {


    let cartoona = "";


    for (let i = 0; i < arr.length; i++) {


        cartoona += `

        <tr>

            <td>${arr[i].name}</td>

            <td>${arr[i].email}</td>

            <td>${arr[i].phone}</td>

            <td>${arr[i].service}</td>

            <td>${arr[i].date}</td>

            <td>${arr[i].time}</td>

            <td>${arr[i].doctor}</td>

            <td>${arr[i].notes}</td>


            <td>
                <button class="btn btn-outline-danger" onclick="deleteRow(${i})">
                    Delete
                </button>
            </td>


            <td>
                <button class="btn btn-outline-primary" onclick="updateForm(${i})">
                    Update
                </button>
            </td>


        </tr>

        `;

    }


    document.getElementById("tableBody").innerHTML = cartoona;

}





// Clear inputs
function clear() {


    patientName.value = "";

    email.value = "";

    phone.value = "";

    service.value = "";

    date.value = "";

    time.value = "";

    doctor.value = "";

    notes.value = "";

}





// Delete appointment
function deleteRow(index) {


    patientArr.splice(index, 1);


    localStorage.setItem(
        "appointments",
        JSON.stringify(patientArr)
    );


    displayAppointment(patientArr);

}





// Update form
function updateForm(index) {


    bookBtn.classList.replace("d-block", "d-none");

    updateBtn.classList.replace("d-none", "d-block");



    patientName.value = patientArr[index].name;

    email.value = patientArr[index].email;

    phone.value = patientArr[index].phone;

    service.value = patientArr[index].service;

    date.value = patientArr[index].date;

    time.value = patientArr[index].time;

    doctor.value = patientArr[index].doctor;

    notes.value = patientArr[index].notes;



    currentIndex = index;


}





// Update appointment
function patientUpdate() {


    let currentUser = JSON.parse(localStorage.getItem("currentUser"));



    let patient = {


        id: patientArr[currentIndex].id,


        patientId: currentUser.id,


        name: patientName.value,

        email: email.value,

        phone: phone.value,

        service: service.value,

        date: date.value,

        time: time.value,

        doctor: doctor.value,

        doctorName: doctor.value,

        notes: notes.value,

        status: "Upcoming"


    };



    patientArr[currentIndex] = patient;



    localStorage.setItem(
        "appointments",
        JSON.stringify(patientArr)
    );



    displayAppointment(patientArr);


    clear();


    bookBtn.classList.replace("d-none", "d-block");

    updateBtn.classList.replace("d-block", "d-none");


}





// Name validation
function validateName() {


    let regex = /^[A-Z][a-z]{2,}\s[A-Z][a-z]{2,}$/;


    return regex.test(patientName.value);


}





// Check appointment time
function validateAppointment() {


    for (let i = 0; i < patientArr.length; i++) {


        if (

            patientArr[i].doctor == doctor.value &&

            patientArr[i].date == date.value &&

            patientArr[i].time == time.value

        ) {


            return false;


        }

    }


    return true;


}