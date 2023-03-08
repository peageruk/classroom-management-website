let urlCreateAccount = "http://localhost:8888/api/v1/accounts/create";
function Account(facebook,email,phoneNumber,username) {
    this.username = username;
    this.email = email;
    this.facebook = facebook;
    this.phoneNumber = phoneNumber;
}
// function Account(facebook,email,phoneNumber,fullName,address,dateOfBirth,username) {
//     this.username = username;
//     this.email = email;
//     this.fullName = fullName;
//     this.address = address;
//     this.dateOfBirth = dateOfBirth;
//     this.facebook = facebook;
//     this.phoneNumber = phoneNumber;
// }
function createAccount(){
    let username = document.getElementById('usernameCr').value;
    let email = document.getElementById('emailCr').value;
    // let fullName = document.getElementById('fullNameCr').value;
    // let address = document.getElementById('addressCr').value;
    // let dateOfBirth = document.getElementById('dateOfBirthCr').value;
    let facebook = document.getElementById('facebookCr').value;
    let phoneNumber = document.getElementById('phoneNumberCr').value;
    let account =new Account(facebook,email,phoneNumber,username);
    // let account =new Account(facebook,email,phoneNumber,fullName,address,dateOfBirth,username);
    console.log(account);
    $.ajax({
        url: urlCreateAccount,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(account),
        error: function (err) {
            console.log(err.responseJSON.message);
            confirm(err.responseJSON.message)
        },
        success: function (data) {
            console.log(data);
            window.location.href = '/login.html';
        }

    });
}