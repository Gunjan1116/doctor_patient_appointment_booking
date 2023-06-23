let baseUrl=`https://hospialbooking.onrender.com`;

let doctorBtn=document.getElementById("doctor");
let patientBtn=document.getElementById("patient");

doctorBtn.addEventListener("click",()=>{
    let doctorForm=document.querySelector(".doctorDetail form");
    let patientForm=document.querySelector(".patientDetail form");
    doctorForm.style.display="flex";
    patientForm.style.display="none";
})

patientBtn.addEventListener("click",()=>{
    let doctorForm=document.querySelector(".doctorDetail form");
    let patientForm=document.querySelector(".patientDetail form");
    doctorForm.style.display="none";
    patientForm.style.display="flex";
})


let patientRegisterForm=document.querySelector(".patientDetail form");

patientRegisterForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let currentLocation=document.getElementById("location").value;
    let password=document.getElementById("password").value;
    let obj={
       name,
       email,
       password,
       role:"patient",
       location:currentLocation
    }
    registerNewUser(obj);
})

let doctorRegisterForm=document.querySelector(".doctorDetail form");

doctorRegisterForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name=document.getElementById("nameD").value;
    let email=document.getElementById("emailD").value;
    let currentLocation=document.getElementById("locationD").value;
    let password=document.getElementById("passwordD").value;
    let specialty=document.getElementById("specialty").value;
    let obj={
       name,
       email,
       password,
       role:"doctor",
       location:currentLocation,
       specialty
    }
    registerNewUser(obj);
})

async function registerNewUser(obj){
    try {
        let res=await fetch(`${baseUrl}/user/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        let out=await res.json();
        alert(out.msg);
        if(out.msg==="Successfully register"){
            window.location.href="./login.html"
        }
    } catch (error) {
        console.log("error while registering from frontend");
        alert("error while register")
    }
}