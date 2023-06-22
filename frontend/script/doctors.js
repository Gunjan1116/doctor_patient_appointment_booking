let baseUrl=`http://localhost:5000`

let doctorContainer=document.querySelector("#doctorContainer");

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
                <a href="./appointment.html" class="btn" data-id=${elem._id}>Book Appointment</a>
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