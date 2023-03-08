let baseZoomUrl = "http://localhost:8888/api/v1/zooms";

let zooms = [];
let zoomName = "";
let link = "";
let meetingId = "";
let passCode = "";
let description = "";
let newZoom = "";
let pageSize = 6;
let pageNumber = 0;
let sortBy = "id";
let sortType = "asc";

function SearchZoomRequest(name, pageSize, pageNumber, sortBy, sortType) {
    this.name = name;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.sortBy = sortBy;
    this.sortType = sortType;
}
function CreateUpdateZoomRequest(name, link, meetingId, passCode, description) {
    this.name = name;
    this.link = link;
    this.meetingId = meetingId;
    this.passCode = passCode;
    this.description = description;
}

$(function () {
    // console.log("Zooms")
    buildZoomPage();
})

function buildZoomPage() {
    zooms = [];
    getListZoom();
}

// gọi api GetAllZoom
async function getListZoom() {
    let request = new SearchZoomRequest(zoomName, pageSize, pageNumber, sortBy, sortType);
    $.ajax({
        url: baseZoomUrl + "/search",
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
            localStorage.setItem("pageSize",data.pageable.pageSize);
            localStorage.setItem("pageNumber",data.pageable.pageNumber);
            localStorage.setItem("totalPages",data.totalPages);
            zooms = data.content;
            // localStorage.setItem("userAgent", data.userAgent);
            fillZoomToTable(data.content);
            buildPaginationZoom(data.number, data.totalPages);
        },
    });
}

function fillZoomToTable(zooms) {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    // console.log(zooms);
    if (Array.isArray(zooms)) {
        zooms.forEach(function (item) {
            $('tbody').append(
                '<tr>' +
                '<td>' + (index++) + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td><a target="_blank" href=' + '"' + item.link + '"> ' + item.link + '<a/></td>' +
                '<td>' + item.meetingId + '</td>' +
                '<td>' + item.passCode + '</td>' +
                '<td>' + item.description + '</td>' +
                '<td>' +
                '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="editZoom(' +
                item.id + ')"><i class="ti-pencil m-1 text-warning" style="font-size:24px; cursor: pointer;"></i></a>' +
                '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="confirmDeleteZoom(' +
                item.id + ')"><i class="ti-trash m-1 text-danger" style="font-size:24px; cursor: pointer;"></i></a>' +
                '</td>' +
                '</tr>'
            )
        });
    }
    // console.log("page number:" + localStorage.getItem("pageNumber"));
    // console.log("total:" + localStorage.getItem("totalPages"));
}


function buildPaginationZoom(number, totalPages) {
    if(number>0 && number >= totalPages){
        chosePageZoom(totalPages-1);
    }
    // kiểm tra nếu trang hiện tại là trang đầu -> disable đi
    if (number === 0) {
        $("#pagination-zoom").empty().append(
            `<li class="page-item">
            <a class="page-link disabled" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    } else {
        $("#pagination-zoom").empty().append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" onclick="prePageZoom()">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    }
    


    // Dùng hàm for để build ra số trang. Kiểm tra xem trang hiện tại là bao nhiêu thì background vàng
    for (let index = 0; index < totalPages; index++) {
        let indexS = index + 1;
        if (number === (index)) {
            $('#pagination-zoom').append(`<li class="page-item "><a class="page-link bg-primary" href="#" onclick="chosePageZoom(` + index + `)">` + indexS + `</a></li>`);
        } else {
            $('#pagination-zoom').append(`<li class="page-item"><a class="page-link" href="#" onclick="chosePageZoom(` + index + `)">` + indexS + `</a></li>`);
        }
        
    }
    

    // Kiểm tra nếu trang hiện tại là trang cuối -> disable đ
    if (number === totalPages - 1) {
        $("#pagination-zoom").append(
            `<li class="page-item">
            <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    } else {
        $("#pagination-zoom").append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onclick="nextPageZoom()">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    }
}

function chosePageZoom(page) {
    event.preventDefault()
    pageNumber = page;
    getListZoom();
}
function prePageZoom() {
    event.preventDefault()
    pageNumber--;
    getListZoom();
}

function nextPageZoom() {
    event.preventDefault()
    pageNumber++;
    getListZoom();
}

function searchZoom() {
    zoomName = document.getElementById("input-searchZoom-id").value;
    getListZoom();
}

function addZoom() {
    resetFormEditZoom();
    $('#zoomModal').modal('show')
}

function editZoom(zoomId) {
    let zoom = zooms.find(item => item.id === zoomId);
    $('#zoomIdToSave').val(zoom.id);
    $('#zoomName').val(zoom.name);
    $("#linkZoom").val(zoom.link);
    $("#meetingId").val(zoom.meetingId);
    $("#passCode").val(zoom.passCode);
    $("#classUseZoom").append(zoom.class);
    $("#zoomDescription").val(zoom.description);
    $('#zoomModal').modal('show');

}

function saveZoom() {
    // Lấy các thông số để lưu
    let id = $("#zoomIdToSave").val();
    let text = id ? "Update thành công" : "Thêm mới thành công"

    $('#zoomModal').modal('hide')
    // showAlrtSuccess(text);s
    if (id == "" || id == null) {
        let zoomName = document.getElementById("zoomName").value;
        let link = document.getElementById("linkZoom").value;
        let meetingId = document.getElementById("meetingId").value;
        let passCode = document.getElementById("passCode").value;
        let description = document.getElementById("zoomDescription").value;
        let create = new CreateUpdateZoomRequest(zoomName, link, meetingId, passCode, description);
        $.ajax({
            url: baseZoomUrl + "/create",
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
                getListZoom();
                alert(text);

            },
        });
    }
    else {
        let zoomName = document.getElementById("zoomName").value;
        let link = document.getElementById("linkZoom").value;
        let meetingId = document.getElementById("meetingId").value;
        let passCode = document.getElementById("passCode").value;
        let description = document.getElementById("zoomDescription").value;
        let update = new CreateUpdateZoomRequest(zoomName, link, meetingId, passCode, description);
        $.ajax({
            url: baseZoomUrl + "/update/" + id,
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
                getListZoom();
                console.log(text);
                alert(text);
            },
        });
    }

}

function resetFormEditZoom() {
    document.getElementById("zoomIdToSave").value = "";
    document.getElementById("zoomName").value = "";
    document.getElementById("linkZoom").value = "";
    document.getElementById("meetingId").value = "";
    document.getElementById("passCode").value = "";
    // document.getElementById("classUseZoom").innerHTML = "";
    document.getElementById("zoomDescription").value = "";
}


function confirmDeleteZoom(zoomId) {
    $('#confirmDeleteZoom').modal('show')
    $('#zoomIdToDelete').val(zoomId)
}

function deleteZoom() {
    let zoomId = document.getElementById("zoomIdToDelete").value;
    console.log(zoomId);
    $.ajax({
        url: baseZoomUrl + "/" + zoomId,
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
        },
        contentType: "application/json",
        data: JSON.stringify(zoomId),
        error: function (err) {
            console.log(err.responseJSON);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log("deleted");
            alert("Xoá zoom thành công!");
            getListZoom();

        },
    });
    $('#confirmDeleteZoom').modal('hide')
    // showAlrtSuccess("Xoá zoom thành công!");
}


