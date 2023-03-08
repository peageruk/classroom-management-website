let baseClassUrl = "http://localhost:8888/api/v1/classes";

let listClass = [];
let className = "";
let pageSize = 6;
let pageNumber = 0;
let sortBy = "id";
let sortType = "asc";

function SearchClassRequest(name, pageSize, pageNumber, sortBy, sortType) {
    this.name = name;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.sortBy = sortBy;
    this.sortType = sortType;
}

function CreateUpdateClassRequest(name, startDate, endDate, status, form, mentorId, zoomId, classRoomId, description, schedule) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.form = form;
    this.mentorId = mentorId;
    this.zoomId = zoomId;
    this.classRoomId = classRoomId;
    this.description = description
    this.schedule = schedule;

}
$(function () {
    // console.log("Classes")
    buildClassPage();
})


function buildClassPage() {
    GetAllClass();
}
//  =----------------------------------------------------------------------=

//  ----------------------------------------------------------------------------=
// gọi api GetAllClass
async function GetAllClass() {
    let request = new SearchClassRequest(className, pageSize, pageNumber, sortBy, sortType);
    $.ajax({
        url: baseClassUrl + "/search",
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
            listClass = data.content;
            // localStorage.setItem("userAgent", data.userAgent);
            fillClasstoTable(data.content);
            buildPaginationClass(data.number, data.totalPages);
        },
    });
}

function fillClasstoTable(listClass) {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    console.log(listClass);
    listClass.forEach(function (item) {
        $('tbody').append(
            '<tr>' +
            '<td>' + (index++) + '</td>' +
            '<td> ' + item.name + '</td>' +
            '<td>' + item.startDate + '</td>' +
            '<td>' + item.endDate + '</td>' +
            '<td>' + item.status + '</td>' +
            '<td>' + item.schedule + '</td>' +
            '<td>' + item.form + '</td>' +
            '<td>' + item.mentorId.fullName + '</td>' +
            '<td>' + item.zoomId.name + '</td>' +
            '<td>' + item.classRoomId.name + '</td>' +
            '<td>' + item.description + '</td>' +

            '<td>' +
            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="editClass(' +
            item.id + ')"><i class="ti-pencil m-1 text-warning" style="font-size:24px"></i></a>' +

            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="confirmDeleteClass(' +
            item.id + ')"><i class="ti-trash m-1 text-danger" style="font-size:24px"></i></a>' +

            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="viewDetailClass(' +
            item.id + ')"><i class="fa fa-chevron-circle-right m-1" style="font-size:24px"></i></a>' +
            '</td>' +
            '</tr>'
        )
    });
}

function buildPaginationClass(number, totalPages) {
    if(number>0 && number >= totalPages){
        chosePageClass(totalPages-1);
    }
    // kiểm tra nếu trang hiện tại là trang đầu -> disable đi

    if (number === 0) {
        $("#pagination-class").empty().append(
            `<li class="page-item">
            <a class="page-link disabled" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    } else {
        $("#pagination-class").empty().append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" onclick="prePageClass()">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    }
    // Dùng hàm for để build ra số trang. Kiểm tra xem trang hiện tại là bao nhiêu thì background vàng
    for (let index = 0; index < totalPages; index++) {
        let x = index + 1;
        if (number === (index)) {
            $('#pagination-class').append(`<li class="page-item "><a class="page-link bg-primary" href="#" onclick="chosePageClass(` + index + `)">` + x + `</a></li>`);
        } else {
            $('#pagination-class').append(`<li class="page-item"><a class="page-link" href="#" onclick="chosePageClass(` + index + `)">` + x + `</a></li>`);
        }
    }

    // Kiểm tra nếu trang hiện tại là trang cuối -> disable đ
    if (number === totalPages - 1) {
        $("#pagination-class").append(
            `<li class="page-item">
            <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    } else {
        $("#pagination-class").append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onclick="nextPageClass()">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    }
}
function chosePageClass(page) {
    event.preventDefault()
    pageNumber = page;
    GetAllClass();
}
function prePageAccount() {
    event.preventDefault()
    pageNumber--;
    GetAllClass();
}

function nextPageAccount() {
    event.preventDefault()
    pageNumber++;
    GetAllClass();
}
function findClass() {
    className = document.getElementById("input-findClass-id").value;
    GetAllClass();
}
function addClass() {
    resetFormEditClass();
    $('#classModal').modal('show')
}

// // ------------------------CREATE----UPDATE----------------------------------------------------------------------------------------------------------

function editClass(classId) {
    // let class = new CreateZoomRequest(zoomName, link, meetingId, passCode,description);
    let classs = listClass.find(item => item.id === classId);
    $('#classIdToSave').val(classs.id);
    $('#inputname').val(classs.name);
    $('#inputstartdate').val(classs.startDate);
    $('#inputenddate').val(classs.endDate);
    $('#inputStatus').val(classs.status);
    $('#inputteachingForm').val(classs.form);
    $('#inputmentorId').val(classs.mentorId.id);
    $('#inputzoomId').val(classs.zoomId.id);
    $('#inputclassRoomId').val(classs.classRoomId.id);
    $('#inputdescription').val(classs.description);
    $('#inputschedule').val(classs.schedule);
    $('#classModal').modal('show');

}

function saveClass() {
    // Lấy các thông số để lưu
    let id = $('#classIdToSave').val();
    let text = id ? "Update thành công" : "Thêm mới thành công"

    $('#classModal').modal('hide')
    // showAlrtSuccess(text);s
    if (id == "" || id == null) {
        var className = document.getElementById("inputname").value;
        var startDate = document.getElementById("inputstartdate").value;
        var endDate = document.getElementById("inputenddate").value;
        var status = document.getElementById("inputstatus").value;
        var form = document.getElementById("inputteachingForm").value;
        var description = document.getElementById("inputdescription").value;
        var mentorId = document.getElementById("inputmentorId").value
        var zoomId = document.getElementById("inputzoomId").value
        var classRoomId = document.getElementById("inputclassRoomId").value
        var schedule = document.getElementById("inputschedule").value
        let create = new CreateUpdateClassRequest(className, startDate, endDate, status, form, mentorId, zoomId, classRoomId, description, schedule);
        $.ajax({
            url: baseClassUrl + "/create",
            type: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
            },
            contentType: "application/json",
            data: JSON.stringify(create),
            error: function (err) {
                console.log(err.responseJSON);
                confirm(err.responseJSON.message);
                // confirm("bạn chưa đăng nhập");
            },
            success: function (data) {
                console.log(data);
                console.log(text);
                GetAllClass();
                // alert(text);

            },
        });
    }
    else {
        var className = document.getElementById("inputname").value;
        var startDate = document.getElementById("inputstartdate").value;
        var endDate = document.getElementById("inputenddate").value;
        var status = document.getElementById("inputstatus").value;
        var form = document.getElementById("inputteachingForm").value;
        var description = document.getElementById("inputdescription").value;
        var mentorId = document.getElementById("inputmentorId").value;
        var zoomId = document.getElementById("inputzoomId").value;
        var classRoomId = document.getElementById("inputclassRoomId").value;
        var schedule = document.getElementById("inputschedule").value;
        let update = new CreateUpdateClassRequest(className, startDate, endDate, status, form, mentorId, zoomId, classRoomId, description, schedule);
        $.ajax({
            url: baseClassUrl + "/update/" + id,
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
                GetAllClass();
                console.log(text);
                // alert(text);
            },
        });
    }

}

function resetFormEditClass() {
    document.getElementById("inputname").value = "";
    document.getElementById("inputstartdate").value = "";
    document.getElementById("inputenddate").value = "";
    document.getElementById("inputstatus").value = "";
    document.getElementById("inputteachingForm").value = "";
    document.getElementById("inputdescription").value = "";
    document.getElementById("inputmentorId").value = "";
    document.getElementById("inputzoomId").value = "";
    document.getElementById("inputclassRoomId").value = "";
    document.getElementById("inputschedule").value = "";
}


// function confirmDeleteClass(classId) {
//     $('#confirmDeleteClass').modal('show')
//     $('#classIdToDelete').val(classId)
// }

// function deleteClass() {
//     let classId = document.getElementById("classIdToDelete").value;
//     console.log(classId);
//     $.ajax({
//         url: baseClassUrl + "/" + classId,
//         type: "DELETE",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
//         },
//         contentType: "application/json",
//         data: JSON.stringify(classId),
//         error: function (err) {
//             console.log(err.responseJSON);
//             confirm(err.responseJSON.message);
//         },
//         success: function (data) {
//             getListZoom();
//             console.log("deleted");
//             alert("Xoá class thành công!");
//         },
//     });
//     $('#confirmDeleteClass').modal('hide');
//     // showAlrtSuccess("Xoá zoom thành công!");
// }
function confirmDeleteClass(classId) {
    $('#confirmDeleteClass').modal('show')
    $('#classIdToDelete').val(classId)
}

function deleteClass() {
    let classId = document.getElementById("classIdToDelete").value;
    console.log(classId);
    $.ajax({
        url: baseClassUrl + "/" + classId,
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
        },
        contentType: "application/json",
        data: JSON.stringify(classId),
        error: function (err) {
            console.log(err.responseJSON);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            GetAllClass();
            console.log("deleted");
            alert("Xoá class thành công!");
        },
    });
    $('#confirmDeleteClass').modal('hide')
    // showAlrtSuccess("Xoá phòng học thành công!");

}


// ------------------------------------------------------------------------------------------------------------------
function viewDetailClass(id) {
    $(".main").load("./assets/html/View-Detail_Class.html");
    GetClassById(id);
}
// call api getbyid
function GetClassById(id) {
    $.ajax({
        url: baseClassUrl + '/' + id,
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
            fillToDetailClassForm(data);
            // buildPaginationClass(data.number, data.totalPages);
        },
    });
}
function fillToDetailClassForm(data) {
    document.getElementById("className").innerHTML = data.name;
    document.getElementById("startDate").innerHTML = data.startDate;
    document.getElementById("endDate").innerHTML = data.endDate;
    document.getElementById("classStatus").innerHTML = data.status;
    document.getElementById("teachingForm").innerHTML = data.form;
    document.getElementById("mentorName").innerHTML = data.mentorId.fullName;
    document.getElementById("roomId").innerHTML = data.zoomId.name;
    document.getElementById("classRoomId").innerHTML = data.classRoomId.name;
    document.getElementById("description").innerHTML = data.description;
    document.getElementById("schedule").innerHTML = data.schedule;
}