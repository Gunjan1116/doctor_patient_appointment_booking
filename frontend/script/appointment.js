let baseUrl=`http://localhost:5000`;

let token=sessionStorage.getItem("token");
let role=sessionStorage.getItem("role");

if(token){
    
}else{
    alert("Login First to Come to this Page");
    window.location.href="./login.html"
}