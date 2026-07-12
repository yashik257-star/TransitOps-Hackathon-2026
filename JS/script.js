function login(event){

    event.preventDefault();

    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    if(username=="admin" && password=="admin123")
    {
        alert("Login Successful!");

        window.location.href="dashboard.html";
    }
    else
    {
        alert("Invalid Username or Password");
    }

}