let baseUrl=`https://dull-teal-walrus-shoe.cyclic.app/`


document.addEventListener('DOMContentLoaded', function() {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
  
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();
  
    let minDate = year + '-' + month + '-' + (day+1);
    document.getElementById('inputdate').setAttribute('min', minDate);
  });
  
let btnBook=document.getElementById("bookAppointment");
btnBook.addEventListener("click",()=>{
    let date=document.getElementById("inputdate").value;
    let slot=document.getElementById("slotSelect").value;
    let token=sessionStorage.getItem("token");
    let doctorId=sessionStorage.getItem("doctorId");
    if(!token){
        alert("Please Login First to Book an Appointment!!")
        window.location.href="./Login.html"
    }else if(date==""||slot==""){
        alert("Please fill all the fields")
    }else{
       let obj={
        doctorId:doctorId,
        bookingDate:date,
        bookingSlot:slot
       }
       //console.log(obj);
       bookAnAppointment(obj,token);
    }
    
})

async function bookAnAppointment(obj,token){

    try {
        let res=await fetch(`${baseUrl}/booking/create`,{
         method:'POST',
         headers:{
             'Content-type':'application/json',
             Authorization:`${token}`
         },
         body:JSON.stringify(obj)
        })
        let out=await res.json();
        console.log(out);
        if(out.msg=="This Slot is Not Available."){
         alert("This Slot is Not Available.")
        }else if(out.msg=="new booking created successfully Confiramtion sent to email"){
         alert(`Hii Your booking is confirmed on ${obj.bookingDate} and mail is send to your register email`)
        }else{
         alert(out.msg);
        }
     } catch (error) {
         console.log("err",error.message)
         alert("Something went wrong booking an appointment!!!!")
     }
}