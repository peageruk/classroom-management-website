let baseRoomUrl = "http://localhost:8888/api/v1/class-rooms";

let classRooms = [];
let classRoomName = "";
let pageSize = 6;
let pageNumber = 0;
let sortBy = "id";
let sortType = "asc";

function SearchRoomRequest(name, pageSize, pageNumber, sortBy, sortType) {
    this.name = name;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.sortBy = sortBy;
    this.sortType = sortType;
}

function CreateUpdateRoomRequest(name, address, note, size) {
    this.name = name;
    this.address = address;
    this.note = note;
    this.size = size;
}

$(function () {
    // console.log("ClassRooms")
    buildClassRoomPage();
})

function buildClassRoomPage() {
    GetListRooms();
}

//------------------------------------ gọi api GetAllZoom
async function GetListRooms() {
    let request = new SearchRoomRequest(classRoomName, pageSize, pageNumber, sortBy, sortType);
    $.ajax({
        url: baseRoomUrl + "/search",
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
            classRooms = data.content;
            // localStorage.setItem("userAgent", data.userAgent);
            fillRoomToTable(data.content);
            buildPaginationRoom(data.number, data.totalPages);
        },
    });
}

function fillRoomToTable(classRooms) {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    // console.log(rooms);
    if (Array.isArray(classRooms)) {
        classRooms.forEach(function (item) {
            $('tbody').append(
                '<tr>' +
                '<td>' + (index++) + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.address + '</td>' +
                '<td>' + item.size + '</td>' +
                '<td>' + item.note + '</td>' +
                '<td>' +
                '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="editRoom(' +
                item.id + ')"><i class="ti-pencil m-1 text-warning" style="font-size:24px; cursor: pointer;"></i></a>' +
                '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="confirmDeleteRoom(' +
                item.id + ')"><i class="ti-trash m-1 text-danger" style="font-size:24px; cursor: pointer;"></i></a>' +
                '</td>' +
                '</tr>'
            )
        });
    }
}


function buildPaginationRoom(number, totalPages) {
    if(number>0 && number >= totalPages){
        chosePageRoom(totalPages-1);
    }
    // kiểm tra nếu trang hiện tại là trang đầu -> disable đi

    if (number === 0) {
        $("#pagination-room").empty().append(
            `<li class="page-item">
            <a class="page-link disabled" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    } else {
        $("#pagination-room").empty().append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" onclick="prePageRoom()">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    }

    // Dùng hàm for để build ra số trang. Kiểm tra xem trang hiện tại là bao nhiêu thì background vàng
    for (let index = 0; index < totalPages; index++) {
        let x = index + 1;
        if (number === (index)) {
            $('#pagination-room').append(`<li class="page-item "><a class="page-link bg-primary" href="#" onclick="chosePageRoom(` + index + `)">` + x + `</a></li>`);
        } else {
            $('#pagination-room').append(`<li class="page-item"><a class="page-link" href="#" onclick="chosePageRoom(` + index + `)">` + x + `</a></li>`);
        }
    }

    // Kiểm tra nếu trang hiện tại là trang cuối -> disable đ
    if (number === totalPages - 1) {
        $("#pagination-room").append(
            `<li class="page-item">
            <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    } else {
        $("#pagination-room").append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onclick="nextPageRoom()">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    }
}

function chosePageRoom(page) {
    event.preventDefault()
    pageNumber = page;
    GetListRooms();
}
function prePageRoom() {
    event.preventDefault()
    pageNumber--;
    GetListRooms();
}

function nextPageRoom() {
    event.preventDefault()
    pageNumber++;
    GetListRooms();
}
function findClassRoom(){
    classRoomName = document.getElementById("input-findClassRoom-id").value;
    GetListRooms();
}
function addRoom() {
    resetFormEditRoom();
    $('#roomModal').modal('show');
}

function editRoom(roomId) {
    // let room = classRoooms.find(room => room.id === roomId)
    // console.log(room);
    // resetFormEditRoom();
    let room = classRooms.find(item => item.id === roomId);
    $('#roomIdToSave').val(room.id);
    $('#roomName').val(room.name);
    $("#roomAdress").val(room.address);
    $("#roomSize").val(room.size);
    $("#roomNote").val(room.note);
    $('#roomModal').modal('show');
}

function saveRoom() {
    // Lấy các thông số để lưu
    // let description = $("#roomDescription").val();
    let id = $("#roomIdToSave").val();
    let text = id ? "Update thành công" : "Thêm mới thành công"

    $('#roomModal').modal('hide')
    // showAlrtSuccess(text);
    if (id == "" || id == null) {
        let roomName = document.getElementById("roomName").value;
        let roomAdress = document.getElementById("roomAdress").value;
        let roomSize = document.getElementById("roomSize").value;
        let roomNote = document.getElementById("roomNote").value;
        let create = new CreateUpdateRoomRequest(roomName, roomAdress, roomNote, roomSize);
        $.ajax({
            url: baseRoomUrl + "/create",
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
                GetListRooms();
                alert(text);

            },
        });
    }
    else {
        let roomName = document.getElementById("roomName").value;
        let roomAdress = document.getElementById("roomAdress").value;
        let roomSize = document.getElementById("roomSize").value;
        let roomNote = document.getElementById("roomNote").value;
        let update = new CreateUpdateRoomRequest(roomName, roomAdress, roomNote, roomSize);
        $.ajax({
            url: baseRoomUrl + "/update/" + id,
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
                GetListRooms();
                console.log(text);
                alert(text);
            },
        });
    }


}

function resetFormEditRoom() {
    document.getElementById("roomIdToSave").value = "";
    document.getElementById("roomAdress").value = "";
    document.getElementById("roomSize").value = "";
    document.getElementById("roomNote").value = "";
}

function confirmDeleteRoom(roomId) {
    $('#confirmDeleteRoom').modal('show')
    $('#roomIdToDelete').val(roomId)
}

function deleteRoom() {
    let roomId = document.getElementById("roomIdToDelete").value;
    console.log(roomId);
    $.ajax({
        url: baseRoomUrl + "/" + roomId,
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
        },
        contentType: "application/json",
        data: JSON.stringify(roomId),
        error: function (err) {
            console.log(err.responseJSON);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            GetListRooms();
            console.log("deleted");
            alert("Xoá room thành công!");
        },
    });
    $('#confirmDeleteRoom').modal('hide')
    // showAlrtSuccess("Xoá phòng học thành công!");
}
