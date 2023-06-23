let baseUrl=`https://dull-teal-walrus-shoe.cyclic.app/`

let doctorContainer=document.querySelector("#doctorContainer");
let searchBtn=document.getElementById("searchBtn");
let specialty=document.getElementById("specialty");

async function getAllDoctor(){
    try {
    let res= await fetch(`${baseUrl}/user/doctors`)
    let out =await res.json()
    displayDoctorData(out.data)
    } catch (error) {
        console.log(error)
    }
}
getAllDoctor()

function  displayDoctorData(data){
    doctorContainer.innerHTML=""
    doctorContainer.innerHTML=`
    
    ${ data.map((elem)=>{
        return `
        <div class="box">
                <h3>Name:-${elem.name}</h3>
                <h3>Email:-${elem.email}</h3>
                <h3>Location:-${elem.location}</h3>
                <h3>Specialty:-${elem.specialty}</h3>
                <a href="./bookAppointment.html" class="btn" data-id=${elem._id}>Book Appointment</a>
        </div>
        `
    }).join("")}`

    let appointmentBtns=document.querySelectorAll(".btn")
    
    for(let appointmentBtn of appointmentBtns){
        appointmentBtn.addEventListener("click",(e)=>{
                let id=e.target.dataset.id
                sessionStorage.setItem("doctorId",id)
        })
    }

}

searchBtn.addEventListener("click",()=>{
    let searchValue=document.getElementById("doctorLocation").value;
    fetchDoctorBasedOnLocation(searchValue);
})

specialty.addEventListener("change",()=>{
    let searchValue=specialty.value;
    //console.log(searchValue)
    if(searchValue===""){
        getAllDoctor()
    }else{
        fetchDoctorBasedOnSpecialty(searchValue)
    }
})

async function fetchDoctorBasedOnLocation(location){
    try {
        let res= await fetch(`${baseUrl}/user/doctors/${location}`)
        let out =await res.json()
        displayDoctorData(out.data)
        } catch (error) {
            console.log(error)
        }
}

async function fetchDoctorBasedOnSpecialty(specialty){
    //console.log(specialty);
    try {
        let res= await fetch(`${baseUrl}/user/doctors/specialty/${specialty}`)
        let out =await res.json()
        //console.log(out,"**");
        displayDoctorData(out.data)
        } catch (error) {
            console.log(error)
        }
}