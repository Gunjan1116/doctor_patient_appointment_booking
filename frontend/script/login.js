let baseUrl=`https://hospialbooking.onrender.com`;

let formLogin=document.querySelector(".allDetailLogin form");

formLogin.addEventListener("submit",(e)=>{
    e.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let obj={
        email,
        password
    }
    loginUser(obj);
})

async function loginUser(obj){
    try {
        let res=await fetch(`${baseUrl}/user/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        let out=await res.json();
        sessionStorage.setItem("token",out.token);
        sessionStorage.setItem("role",out.role);
        sessionStorage.setItem("name",out.name);
        alert(out.msg);
        if(out.msg==="Login Success"){
            window.location.href="./appointment.html";
        }
        
    } catch (error) {
        console.log("error while login from frontend");
        alert("error while login")
    }
}