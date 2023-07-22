const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Image') // Đường dẫn thư mục để lưu tệp tin trên server
    },
    filename: function (req, file, cb) {
        // let fileName = file.originalname;
        // let arr = fileName.split('.');
        // let newFileName = arr[0] + '-' + Date.now() + '.' + arr[1];
        // cb(null, newFileName); // Đặt tên tệp tin được lưu trên server

        let fileExtension = file.originalname.split('.').pop(); // Lấy phần mở rộng của tệp tin
        let newFileName = Date.now() + '.' + fileExtension; // Tạo tên tệp tin mới bằng thời gian hiện tại và phần mở rộng
        cb(null, newFileName); // Đặt tên tệp tin được lưu trên server
    }
});

module.exports = storage;   