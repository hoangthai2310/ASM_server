


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
            window.location.href = '/home' // load lại trang nếu xóa thành công
        }
    });
}
function showDangKi(message, type) {
    Swal.fire({
        text: message,
        icon: type,
        confirmButtonText: 'OK',
        preConfirm: () => {
            window.location.href = '/' // load lại trang nếu xóa thành công
        }
    });
}
//login=================================================================================


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var formLogin = document.getElementById('formlogin');



formLogin.onsubmit = function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    var logEmail = document.getElementById('logemail').value;
    var logPass = document.getElementById('logpass').value;
    var data = {
        logemail: logEmail,
        logpass: logPass
    }
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.status == 200) {
            return res.json();
        } else if (res.status = 500) {
            return showAlert('Tài khoản hoặc mật khẩu không đúng', 'error')
        }
    }).then(data => {
        setCookie('token', data.token)
        showThanhCong('Đăng nhập thành công', 'success')
    }).catch(err => {
        console.log(err);
    })
}


// sigin

var formSig = document.getElementById('form-sigup');
formSig.addEventListener('submit', (event) => {
    // ngăn chặn form gửi request trực tiếp
    event.preventDefault();
    var files = document.getElementById('file-input').files[0];
    var imageSig = document.getElementById('sigImage');
    var fullNameSig = document.getElementById('signame');
    var emailSig = document.getElementById('sigemail');
    var passwordSig = document.getElementById('sigpass');

    const formData = new FormData();
    formData.append('image', files);
    formData.append('src', imageSig.src);
    formData.append('fullname', fullNameSig.value);
    formData.append('email', emailSig.value);
    formData.append('password', passwordSig.value);
    // gửi yêu cầu đến server
    fetch('/signup', {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json' // set header để server biết là dữ liệu gửi lên là chuỗi JSON
        },
        body: formData,
    })
        .then(response => {
            console.log(response.status);
            if (response.status === 200) {
                showDangKi("Đăng kí thành công", 'success');
            } else if (response.status === 300) {
                showAlert('Email đã có người đăng ký')
            } else {
                console.log(response.status);
                showAlert(response.status, 'error');
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