const express = require("express");
const mongoose = require('mongoose');

const Model = require('../Model/usersModel');
const jwt = require('jsonwebtoken');
const uri = 'mongodb+srv://hlndzzkun:12072003@cluster0.oelsp4u.mongodb.net/AsmSeverAndroid?retryWrites=true&w=majority'


class LoginController {
    //GET /home
    index(req, res) {
        res.render('Login', {
            layout: 'mLogin',
            show: false,
            message: '',
        })

    }
// đăng nhập người dùng 
    async login(req, res) {
        await mongoose.connect(uri);

        try {
            const user = await Model.findOne({ email: req.body.logemail, password: req.body.logpass }).exec();

            if (user) {
                mongoose.connection.close()
                var token = jwt.sign({ _id: user._id }, 'mk');
                // // Thay đổi URI và chuyển hướng đến trang Home
                // req.session.uri = '/home';
                // req.session.user = user;
                res.status(200).json({ message: 'Thành công', token: token });

            } else {
                res.status(500).json({ message: 'Tài Khoản hoặc mật khẩu không đúng' });
            }

        } catch (err) {
            console.log(err);
        }


    }
 // đăng ký người dùng mới 
    async signup(req, res) {
        await mongoose.connect(uri);

        try {
            const user = await Model.findOne({ email: req.body.email }).exec();
            console.log(user);
            if (user) {
                res.status(300).json('Đã có người đăng kí');
            } else {
                var nameFile = '';
                if (req.file) {
                    nameFile = req.file.filename;
                } else {
                    console.log(req.body.src);
                    let arr = req.body.src.split('/');
                    nameFile = arr[arr.length - 1];
                }
                let newUser = new Model({
                    image: nameFile,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: req.body.password
                })
                newUser.save()
                    .then(data => {
                        res.status(200).json('Đăng kí thành công');;
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json('Lỗi');;
                    });
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new LoginController;