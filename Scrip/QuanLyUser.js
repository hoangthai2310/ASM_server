
var image = document.getElementById('qluserimage');
var deleteBtns = document.querySelectorAll(".btn-delete");
var updateBtns = document.querySelectorAll(".btn-update");
var btnShowDemo = document.getElementById('btn');
var fullName = document.getElementById('fullname');
var email = document.getElementById('email');
var password = document.getElementById('password')
var btnSubmit = document.getElementById('submit');
var form = document.getElementById('form');
var formSearch = document.getElementById('formsearch');
var nameSearch = document.getElementById('namesearch');
var txtID = document.getElementById('txtid');

btnShowDemo.addEventListener('click', function () {
    var demo = document.getElementById('demo');
    if (demo.style.display == 'none') {
        demo.style.display = 'block';
    } else {
        demo.style.display = 'none';
    }
})

image.addEventListener('click', function () {
    document.getElementById('file-input').click();
})

document.getElementById('file-input').addEventListener('change', function () {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onloadend = function (event) {
        // Xử lý chuỗi base64 để tạo đường dẫn URL
        const imageData = event.target.result;
        // Thiết lập giá trị của trường imageUrl
        image.src = imageData;
        console.log(imageData);
    }
    reader.readAsDataURL(file);

});

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
            const formData = new FormData();
            formData.append('data', data);
            fetch("/qluser/deleteuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data
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

//them  
form.addEventListener('submit', (event) => {
    // ngăn chặn form gửi request trực tiếp
    event.preventDefault();
    var files = document.getElementById('file-input').files[0];
    console.log(files);
    const formData = new FormData();
    formData.append('id', txtID.value);
    formData.append('image', files);
    formData.append('src', image.src);
    formData.append('fullname', fullName.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    // gửi yêu cầu đến server
    fetch('/qluser/postputuser', {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json' // set header để server biết là dữ liệu gửi lên là chuỗi JSON
        },
        body: formData,
    })
        .then(response => {
            response.json();
            if (response.status === 200) {
                showThanhCong("Submit thành công", 'success');
            }else if(response.status === 300){
                showThanhCong("Email đã có người đăng ký", 'warning');
            }else {
                console.log(response.status);
                showAlert('Lỗi', 'error');
            }
        })
        .then(data => {
            // console.log(data);
            // xử lý dữ liệu nhận được
        })
        .catch(error => {
            console.error(error);
        });
});

//option delete

deleteBtns.forEach(function (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
        // Tìm phần tử cha (tr) của nút "delete" này
        var row = this.closest("tr");

        // Lấy giá trị các ô (td) trong dòng đó

        var memail = row.querySelector("td:nth-child(4)").textContent;
        // Thực hiện hành động xóa ở đây, ví dụ:

        var data = { email: memail };
        showConfirm("Bạn có chắc muốn xóa?", "question", JSON.stringify(data));
    });
});
//update
updateBtns.forEach(function (updateBtn) {
    updateBtn.addEventListener("click", function () {
        // Tìm phần tử cha (tr) của nút "delete" này
        var row = this.closest("tr");

        // Lấy giá trị các ô (td) trong dòng đó
        var mimage = row.querySelector("td:nth-child(2) img").getAttribute("src");
        var mfullName = row.querySelector("td:nth-child(3)").textContent;
        var memail = row.querySelector("td:nth-child(4)").textContent;
        var mid = row.querySelector("td:nth-child(5)").textContent;
        txtID.value = mid;
        image.src = mimage;
        fullName.value = mfullName;
        email.value = memail;
        var demo = document.getElementById('demo');
        if (demo.style.display == 'none') {
            demo.style.display = 'block';
        }
    })
});

search

formSearch.addEventListener('submit', (event) => {
    // ngăn chặn form gửi request trực tiếp
    event.preventDefault();

    if (nameSearch) {
        // lấy dữ liệu từ form
        var data = {
            fullname: nameSearch.value,
        }
        // gửi yêu cầu đến server
        fetch('/qluser/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // set header để server biết là dữ liệu gửi lên là chuỗi JSON
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(html => {
                document.querySelector('#result').innerHTML = html;
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        location.reload();
    }
});