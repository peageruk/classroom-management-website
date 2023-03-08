$(function () {
    $(".main").load("./assets/html/Home.html");
    console.log(checkLogin());
    console.log(removeToggle());
})
// load trang home vvafo main
function onclickHomePage() {
    $(".main").load("./assets/html/Home.html");
}
// load trang create class vào main
function onclickCreateClass() {
    $(".main").load("./assets/html/Create-New-Class.html");
}
// load trang all class vào main
function onclickViewClass() {
    $(".main").load("./assets/html/class-page.html");
    changActivePage('class-page');
}

function navToZoomPage() {
    $(".main").load("./assets/html/zoom-page.html");
    changActivePage('zoom-page');
}

function navToClassRoomPage() {
    $(".main").load("./assets/html/class-room-page.html");
    changActivePage('class-room-page');
}

function navToAccountPage() {
    $(".main").load("./assets/html/account-page.html");
    changActivePage('account-page');
}

function changActivePage(pageActive) {
    const navLinks = Array.from(document.getElementsByClassName("nav-link"));
    navLinks.forEach(element => element.classList.remove('acctive-link'))

    var navActive = document.getElementById(pageActive);
    navActive.classList.add('acctive-link');
    // navActive.classList.remove('text-dark')
}

function hideLogout() {

    $('#myModal').modal('show')
}

// logout
function Logout() {
    window.location.href = '/login.html';
    localStorage.clear();

}
function checkLogin() {
    if (localStorage.getItem("token") == null) {
        let status = document.getElementById("login-status");
        document.getElementById("login-status").innerHTML = "Đăng nhập";
        return "chưa đăng nhập";
    }
    else if (localStorage.getItem("username") != null) {
        document.getElementById("login-status").innerHTML = localStorage.getItem("username");
        return "đã đăng nhập";

    }
}
function removeToggle() {
    var myElement = document.getElementById("login-status")
    if (localStorage.getItem("token") == null) {
        myElement.removeAttribute("data-toggle");
    }return "enable dropdown menu";
}
function tokenNullLogin() {
    if (localStorage.getItem("token") == null) {
        Logout();
    }
}

