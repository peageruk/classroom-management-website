let baseAccountUrl = "http://localhost:8888/api/v1/accounts";

let listAccount = [];
let username = "";
let pageSize = 6;
let pageNumber = 0;
let sortBy = "id";
let sortType = "asc";

function SearchAccountRequest(name, pageSize, pageNumber, sortBy, sortType) {
    this.name = name;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.sortBy = sortBy;
    this.sortType = sortType;
}
function UpdateAccountRequest(username, dateOfBirth, address, fullName, role, phoneNumber, email, facebook, information, classId, oldPassword, newPassword) {
    this.username = username;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.fullName = fullName;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.facebook = facebook;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.classId = classId;
    this.information = information;
}

$(function () {
    // console.log("Accounts")
    buildAccountPage();
})



function buildAccountPage() {
    getListAccount();
}

// gọi api GetAllZoom
async function getListAccount() {
    let request = new SearchAccountRequest(username, pageSize, pageNumber, sortBy, sortType);
    $.ajax({
        url: baseAccountUrl + "/search",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
        },
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
            console.log(err.responseJSON);
            // confirm(err.responseJSON.message);
            confirm("bạn chưa đăng nhập");
        },
        success: function (data) {
            console.log(data);
            listAccount = data.content;
            // localStorage.setItem("userAgent", data.userAgent);
            fillAccountToTable(data.content);
            buildPaginationAccount(data.number, data.totalPages);
        },
    });
}

function fillAccountToTable(listAccount) {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    console.log(listAccount);
    listAccount.forEach(function (item) {
        $('tbody').append(
            '<tr>' +
            '<td>' + (index++) + '</td>' +
            '<td>' + item.username + '</td>' +
            '<td>' + item.dateOfBirth + '</td>' +
            '<td>' + item.address + '</td>' +
            '<td>' + item.fullName + '</td>' +
            '<td>' + item.role + '</td>' +
            '<td>' + item.phoneNumber + '</td>' +
            '<td>' + item.email + '</td>' +
            '<td><a target="_blank" href=' + '"' + item.facebook + '"> ' + item.facebook + '<a/></td>' +

            '<td>' +
            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="editAccount(' +
            item.id + ')"><i class="ti-pencil m-1 text-warning" style="font-size:24px"></i></a>' +

            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="confirmDeleteAccount(' +
            item.id + ')"><i class="ti-trash m-1 text-danger" style="font-size:24px"></i></a>' +

            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="viewDetailAccount(' +
            item.id + ')"><i class="fa fa-chevron-circle-right m-1" style="font-size:24px"></i></a>' +
            '</td>' +
            '</tr>'
        )
    });
}

function buildPaginationAccount(number, totalPages) {
    if(number>0 && number >= totalPages){
        chosePageAccount(totalPages-1);
    }
    // kiểm tra nếu trang hiện tại là trang đầu -> disable đi

    if (number === 0) {
        $("#pagination-account").empty().append(
            `<li class="page-item">
            <a class="page-link disabled" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    } else {
        $("#pagination-account").empty().append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" onclick="prePageAccount()">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    }
    // Dùng hàm for để build ra số trang. Kiểm tra xem trang hiện tại là bao nhiêu thì background vàng
    for (let index = 0; index < totalPages; index++) {
        let x = index + 1;
        if (number === (index)) {
            $('#pagination-account').append(`<li class="page-item "><a class="page-link bg-primary" href="#" onclick="chosePageAccount(` + index + `)">` + x + `</a></li>`);
        } else {
            $('#pagination-account').append(`<li class="page-item"><a class="page-link" href="#" onclick="chosePageAccount(` + index + `)">` + x + `</a></li>`);
        }
    }

    // Kiểm tra nếu trang hiện tại là trang cuối -> disable đ
    if (number === totalPages - 1) {
        $("#pagination-account").append(
            `<li class="page-item">
            <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    } else {
        $("#pagination-account").append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onclick="nextPageAccount()">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    }
}
function chosePageAccount(page) {
    event.preventDefault()
    pageNumber = page;
    getListAccount();
}
function prePageAccount() {
    event.preventDefault()
    pageNumber--;
    getListAccount();
}

function nextPageAccount() {
    event.preventDefault()
    pageNumber++;
    getListAccount();
}
function findAccount() {
    username = document.getElementById("input-findAccount-id").value;
    getListAccount();
}
function addAccount() {
    resetFormEditRoom();
    $('#roomModal').modal('show')
}
// function editAccount(accountId){
//     alert("Mở cử số chỉnh sửa account id: " + accountId)
// }
function editAccount(accountId) {
    let account = listAccount.find(item => item.id === accountId);   
    $('#accountIdToSave').val(account.id);
    $('#username').val(account.username);
    $('#dateOfBirth').val(account.dateOfBirth);
    $('#address').val(account.address);
    $('#fullName').val(account.fullName);
    $('#role').val(account.role);
    $('#phoneNumber').val(account.phoneNumber);
    $('#email').val(account.email);
    $('#facebook').val(account.facebook);
    $('#information').val(account.information);
    $('#classId').val(account.classId);
    document.getElementById("oldPassword").innerHTML="";
    document.getElementById("newPassword").innerHTML="";
    $('#accountModal').modal('show');

}
function saveAccount() {

    let id = $("#accountIdToSave").val();
    let text = id ? "Update thành công" : "Thêm mới thành công"
    $('#accountModal').modal('hide')
    let username = $('#username').val();
    let dateOfBirth = $('#dateOfBirth').val();
    let address = $('#address').val();
    let fullName = $('#fullName').val();
    var role = $('#role').val();
    let phoneNumber = $('#phoneNumber').val();
    let email = $('#email').val();
    let facebook = $('#facebook').val();
    let information = $('#information').val();
    let classId = $('#classId').val();
    let oldPassword = $('#oldPassword').val();
    let newPassword = $('#newPassword').val();
    let update = new UpdateAccountRequest(username, dateOfBirth, address, fullName, role, phoneNumber, email, facebook, information, classId, oldPassword, newPassword);
    $.ajax({
        url: baseAccountUrl + "/update/" + id,
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
        },
        contentType: "application/json",
        data: JSON.stringify(update),
        error: function (err) {
            console.log(err.responseJSON);
            confirm(err.responseJSON.message);
            // confirm("bạn chưa đăng nhập");
        },
        success: function (data) {
            console.log(data);
            getListAccount();
            console.log(text);
            alert(text);
        },
    });
    // }


}
function confirmDeleteAccount(roomId) {
    $('#confirmDeleteAccount').modal('show')
    $('#accountIdToDelete').val(roomId)
}
function deleteAccount() {
    // alert("Mở cử số xoá account id: " + accountId)$('#confirmDeleteRoom').modal('show')
    let accountId = document.getElementById("accountIdToDelete").value;
    console.log(accountId);
    $.ajax({
        url: baseAccountUrl + "/" + accountId,
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
        },
        contentType: "application/json",
        data: JSON.stringify(accountId),
        error: function (err) {
            console.log(err.responseJSON);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            getListAccount();
            console.log("deleted");
            alert("Xoá account thành công!");
        },
    });
    $('#confirmDeleteAccount').modal('hide')
    // showAlrtSuccess("Xoá phòng học thành công!");

}

function viewDetailAccount(accountId) {
    $(".main").load("/assets/html/View-Detail-Account.html");
    GetAccountRequestById(accountId);
}

function GetAccountRequestById(id) {
    // Gọi api -> lấy đối tượng
    $.ajax({
        url: baseAccountUrl + '/' + id,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
        },
        contentType: "application/json",
        data: JSON.stringify(id),
        error: function (err) {
            console.log(err.responseJSON);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            // classRooms = data;
            // localStorage.setItem("userAgent", data.userAgent);
            fillToDetailForm(data);
            // buildPaginationClass(data.number, data.totalPages);
        },
    });
}

function fillToDetailForm(data) {
    console.log(data)
    console.log(document.getElementById("username"))
    $("#username").append(data.username)
    document.getElementById("username").innerHTML = data.username;
    document.getElementById("dateOfBirth").innerHTML = data.dateOfBirth;
    document.getElementById("address").innerHTML = data.address;
    document.getElementById("fullName").innerHTML = data.fullName;
    document.getElementById("role").innerHTML = data.role;
    document.getElementById("phoneNumber").innerHTML = data.phoneNumber;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("facebook").innerHTML = data.facebook;
    document.getElementById("information").innerHTML = data.information;
    document.getElementById("classId").innerHTML = data.classId.name;
}