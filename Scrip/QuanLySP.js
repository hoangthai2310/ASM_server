var btnShowDialog = document.getElementById('btnshow');
var form = document.getElementById('formsubmit');
var img = document.getElementById('imgproduct');
var nameProduct = document.getElementById('nameproduct');
var price = document.getElementById('price');
var color = document.getElementById('color');
var type = document.getElementsByName('type');
var idProduct = document.getElementById('idproduct');

img.addEventListener('click', function () {
    document.getElementById('file-input').click();
})

document.getElementById('file-input').addEventListener('change', function () {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onloadend = function (event) {
        // Xử lý chuỗi base64 để tạo đường dẫn URL
        const imageData = event.target.result;
        // Thiết lập giá trị của trường imageUrl
        img.src = imageData;
    }
    reader.readAsDataURL(file);

});

btnShowDialog.addEventListener('click', function () {
    var dialog = document.getElementById('demo');
    if (dialog.style.display == 'none') {
        dialog.style.display = 'block';
    } else if (dialog.style.display == 'block') {
        dialog.style.display = 'none';
    }
})

if (window.show) {
    showAlert(window.message, 'error');
}

function showAlert(message, type) {
    Swal.fire({
        text: message,
        icon: type,
        confirmButtonText: 'OK',
    });
}


function showThanhCong(message, type) {
    Swal.fire({
        text: message,
        icon: type,
        confirmButtonText: 'OK',
        preConfirm: () => {
            location.reload(); // load lại trang nếu xóa thành công
        }
    });
}


function showConfirm(message, type, data) {
    Swal.fire({
        text: message,
        icon: type,
        confirmButtonText: 'OK',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        preConfirm: () => {
            fetch("/qlsp/deleteproduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status === 200) {
                        showThanhCong("Xóa thành công", 'success');
                    } else {
                        console.log(response.status);
                        showAlert('${response.status}', 'error');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    });
}

//submit

form.addEventListener('submit', (event) => {
    // ngăn chặn form gửi request trực tiếp
    event.preventDefault();
    var option = ''
    type.forEach(function (item) {
        if (item.checked) {
            option = item.value;
        }
    })
    // var data = {
    //     id: idProduct.value,
    //     image: img.src,
    //     name: nameProduct.value,
    //     price: price.value,
    //     color: color.value,
    //     type: option
    // }
    var files = document.getElementById('file-input').files[0];
    const formData = new FormData();
    formData.append('id', idProduct.value);
    formData.append('src', img.src);
    formData.append('image', files);
    formData.append('name', nameProduct.value);
    formData.append('price', price.value);
    formData.append('color', color.value);
    formData.append('type', option);
    // gửi yêu cầu đến server
    fetch('/qlsp/postproduct', {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json' // set header để server biết là dữ liệu gửi lên là chuỗi JSON
        },
        body: formData,
    })
        .then(response => {
            response.json();
            if (response.status === 200) {
                showThanhCong("Submit thành công", 'success');
            } else {
                console.log(response.status);
                showAlert('${response.status}', 'error');
            }
        })
        .then(data => {
            // xử lý dữ liệu nhận được
        })
        .catch(error => {
            console.error(error);
        });


})



function btnDeleteClick(id) {
    var data = { id: id };
    showConfirm("Bạn có chắc muốn xóa?", "question", data);
}

function btnUpdateClick(event, id) {
    // Tìm phần tử cha (tr) của nút "delete" này

    var row = event.target.closest("tr");

    // Lấy giá trị các ô (td) trong dòng đó
    var mimage = row.querySelector("td:nth-child(2) img").getAttribute("src");
    var mName = row.querySelector("td:nth-child(3)").textContent;
    var mPrice = row.querySelector("td:nth-child(4)").textContent;
    var mColor = row.querySelector("td:nth-child(5)").textContent;
    var mType = row.querySelector("td:nth-child(6)").textContent;
    console.log(mimage);                            

    idProduct.value = id
    img.src = mimage;
    nameProduct.value = mName
    price.value = mPrice;
    color.value = mColor;
    type.forEach(function (item) {
        if (item.value == mType) {
            item.checked = true;
        }
    })

    var dialog = document.getElementById('demo');
    if (dialog.style.display == 'none') {
        dialog.style.display = 'block';
    }
}