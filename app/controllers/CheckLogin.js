const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const Model = require('../Model/usersModel');
const uri = 'mongodb+srv://hlndzzkun:12072003@cluster0.oelsp4u.mongodb.net/AsmSeverAndroid?retryWrites=true&w=majority'

module.exports = async (req, res, next) => {
    console.log('chạy 1');
    try {
        if (req.cookies.token) {
            await mongoose.connect(uri);
            var token = req.cookies.token;
            var ketQua = jwt.verify(token, 'mk');
            await Model.findOne({ _id: ketQua })
                .then(data => {
                    req.data = data;
                        next()
                })
        } else {
            return res.redirect('/');
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}