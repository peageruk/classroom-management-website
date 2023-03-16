let baseUrlAuth = "http://localhost:8888/api/v1/auth";
function Account(username, password) {
    this.username = username;
    this.password = password;
}
function rs(username) {
    this.username = username;
}
function Login() {
    event.preventDefault();
    // call API from server
    //lay data tu model ra
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    //khai báo employee dưới dạng json
    let account = new Account(username, password);
    console.log(account);
    $.ajax({
        url: baseUrlAuth + "/login-v2",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(account),
        error: function (err) {
            console.log(err.responseJSON.message);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            // localStorage.setItem("userAgent", data.userAgent);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("id", data.id);
            localStorage.setItem("role", data.role);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            window.location.href = '/index.html';
        }

    });

}
function resetPass(){
    let username = document.getElementById("Username").value;
    $.ajax({
        url: "http://localhost:8888/api/v1/accounts/reset-password",
        type: "POST",
        contentType: "application/json",
        data: username,
        error: function (err) {
            console.log(err.responseJSON.message);
        },
        success: function (data) {
            console.log("mat khau la 123456");
            // localStorage.setItem("userAgent", data.userAgent);           
            confirm("mat khau la 123456")
        }

    });
}