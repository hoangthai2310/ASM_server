const express = require('express');
const mongoose = require('mongoose');
const Model = require('../Model/usersModel');
const uri = 'mongodb+srv://hlndzzkun:12072003@cluster0.oelsp4u.mongodb.net/AsmSeverAndroid?retryWrites=true&w=majority'

class ClientConTroller {
    //GET /home
    async index(req, res) {
        await mongoose.connect(uri);
        Model.find()
            .then(data => res.status(200).json({ data: data }))
            .catch(err => res.status(500).json({ message: err }));

    }

    async postData(req, res) {
        await mongoose.connect(uri);
        let newUser = new Model({
            image: req.file.filename,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        })
        if (newUser.image == null && newUser.fullname == null && newUser.email == null && newUser.password == null) {
            return res.status(400).json({ message: 'Không có dữ liệu gửi đi' });
        }

        // kiểm tra xem email đã tồn tại hay chưa
        Model.findOne({ email: req.body.email }).exec()
            .then(data => {
                if (data) {
                    res.status(300).json({ message: 'Đã có người đăng ký email này' });
                } else {
                    newUser.save()
                        .then(data => {
                            return res.status(200).json({ message: 'Thành công' });
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({ message: err });
                        })
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({ message: err });
            })
    }
}

module.exports = new ClientConTroller;