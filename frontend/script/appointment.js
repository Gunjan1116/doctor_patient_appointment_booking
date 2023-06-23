let baseUrl=`https://hospialbooking.onrender.com`;

let token=sessionStorage.getItem("token");

if(token){
    
let cont=document.getElementById("displayAppointment");

async function getAllAppointments(){
    let role=sessionStorage.getItem("role");
    let name=sessionStorage.getItem("name");
    try {
        let res=await fetch(`${baseUrl}/booking/paticularUser`,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                Authorization:`${token}`
            },
           })
           let out=await res.json();
           //console.log(out);
           displayAllAppointments(out.Data,name,role)
    } catch (error) {
        console.log(error.message);
        console.log("error from fetching all appointments")
    }
}
getAllAppointments();

function displayAllAppointments(arr,name,role){
    cont.innerHTML=""
    cont.innerHTML=`
   <h1 style="text-align: center; margin-bottom:20px">All Bookings of ${role} ${name}</h1>
   <table>
       <thead>
           <tr>
               <th>SI NO.</th>
               <th>Patient Email</th>
               <th>Date</th>
               <th>Time Slot</th>
               <th>Cancel Appointments</th>
               <th>Video Call</th>
           </tr>
       </thead>
       <tbody>
       ${arr.map((elem,index)=>{
        return `
            <tr>
                <td>${index+1}</td>
                <td>${elem.userEmail}</td>
                <td>${elem.bookingDate}</td>
                <td>${elem.bookingSlot=="8-9"?"8 AM to 9 AM":elem.bookingSlot=="9-10"?"9 AM to 10 AM":elem.bookingSlot=="4-5"?"4 PM to 5 PM":"7 PM to 8 PM"}</td>
                <td><button class="cancelAppointment" data-id=${elem._id} >Cancel Appointments</button></td>
                <td><button class="videoCall" data-id=${elem._id} >Video Call</button></td>
            </tr>
        `
       }).join("")}
           
       </tbody>
   </table>
   `

   let cancelAppointmentBtns=document.querySelectorAll(".cancelAppointment")
     
      for(let cancelAppointmentBtn of cancelAppointmentBtns){
        cancelAppointmentBtn.addEventListener("click",(e)=>{
                let id=e.target.dataset.id
                //console.log(id);
                removeAppointment(id,token);
           })
      }
}

async function removeAppointment(id,token){
    try {
        let res=await fetch(`${baseUrl}/booking/remove/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
                Authorization:`${token}`
            },
           })
           let out=await res.json();
           console.log(out);
           if(out.msg==`booking id of ${id} is deleted succesfully`){
            getAllAppointments(); 
            alert(`Your Booking Successfully Cancelled`)
           }else{
            alert(out.msg)
           }
           
    } catch (error) {
        console.log(error);
        alert("Something Went Wrong!!")
    }
}
}else{
    alert("Login First to Come to this Page");
    window.location.href="./login.html"
}