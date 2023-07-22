const mongoose = require('mongoose');

const Model = require('../Model/usersModel');

const uri = 'mongodb+srv://hlndzzkun:12072003@cluster0.oelsp4u.mongodb.net/AsmSeverAndroid?retryWrites=true&w=majority'


class InfoController {
    //GET /home
    index(req, res) {

        res.render('Info', { user: req.data });
    }
    async update(req, res) {
        await mongoose.connect(uri);
        try {
            var nameFile = '';
            if (req.file) {
                nameFile = req.file.filename;
            } else {
                console.log(req.body.src);
                let arr = req.body.src.split('/');
                nameFile = arr[arr.length - 1];
            }
            await Model.updateOne({ email: req.body.email }, // Tìm document cần update theo _id
                {
                    $set: {
                        image: nameFile, // Các field cần update và giá trị mới
                        fullname: req.body.fullname,
                        password: req.body.password
                    }
                })
                .then((data) => {
                    console.log(data);
                    res.status(200).json({ message: 'User update successfully' });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new InfoController;