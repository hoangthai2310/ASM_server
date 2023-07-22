var form = document.getElementById('profile-form');
var image = document.getElementById('ifoimage');
var fullName = document.getElementById('fullname');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confimtpassword = document.getElementById('confimtpassword');

function showAlert(message, type) {
    Swal.fire({
        text: message,
        icon: type,
        confirmButtonText: 'OK'
    });
}
function showThanhCong(message, type) {
    Swal.fire({
        text: message,
        icon: type,
        confirmButtonText: 'OK',
        preConfirm: () => {
            window.location.href = '/info' // load lại trang nếu xóa thành công
        }
    });
}

form.addEventListener('submit', (event) => {
    // ngăn chặn form gửi request trực tiếp
    event.preventDefault();
    if (password.value != confimtpassword.value) {
        showAlert('Xác nhận mật khẩu không trùng nhau')
    } else {
        var files = document.getElementById('file-input').files[0];
        const formData = new FormData();
        formData.append('image', files);
        formData.append('src', image.src);
        formData.append('fullname', fullName.value);
        formData.append('email', email.value);
        formData.append('password', confimtpassword.value);
        // gửi yêu cầu đến server
        fetch('/info/update', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json' // set header để server biết là dữ liệu gửi lên là chuỗi JSON
            },
            body: formData,
        })
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    showThanhCong("Sửa thành công", 'success');
                } else {
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
    }



});
