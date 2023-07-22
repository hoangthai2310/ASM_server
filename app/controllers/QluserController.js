const mongoose = require('mongoose');

const Model = require('../Model/usersModel');

const uri = 'mongodb+srv://hlndzzkun:12072003@cluster0.oelsp4u.mongodb.net/AsmSeverAndroid?retryWrites=true&w=majority'

class QluserController {

    //GET /home
    async index(req, res) {

        await mongoose.connect(uri)
        try {
            // const options = {
            //     page: req.query.page || 1,
            //     limit: 5
            // };
            // const posts = await Model.paginate({}, options);
            // const reversedPosts = posts.docs.reverse(); // đảo ngược danh sách bài đăng
            // var users = await Model.find({});
            const users = await Model.find({ email: { $ne: "a@a" } });
            if (!users) {
                res.render('QuanLyUser', {
                });
            } else {
                var reversedPosts = users.reverse();
                res.render('QuanLyUser', {
                    user: req.data,
                    posts: reversedPosts, // sử dụng lại cấu trúc của đối tượng posts, chỉ thay đổi thuộc tính docs
                });

            }

        } catch (error) {
            console.log(error);
        }

    }

    async postorput(req, res) {
        await mongoose.connect(uri);
        try {
            let nameFile = '';
            if (req.file) {
                nameFile = req.file.filename;
            } else {
                console.log(req.body.src);
                let arr = req.body.src.split('/');
                nameFile = arr[arr.length - 1];
            }
            await Model.findOne({ _id: req.body.id }).exec()
                .then(data => {
                    Model.updateOne({ email: req.body.email }, // Tìm document cần update theo _id
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

                }).catch(err => {
                    Model.findOne({ email: req.body.email }).exec()
                        .then(data => {
                            if (data) {
                                res.status(300).json({ message: 'Đã có người đăng ký email này' });
                            } else {
                                let newUser = new Model({
                                    image: nameFile,
                                    fullname: req.body.fullname,
                                    email: req.body.email,
                                    password: req.body.password
                                })
                                newUser.save()
                                    .then(data => {
                                        res.status(200).json({ message: 'Thành công' });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json({ message: 'Internal Server Error' });
                                    })
                            }
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({ message: 'Lỗi' });
                        })
                })
            // .finally(() => {
            //     
            // });
            // } else {
            // }

        } catch (error) {
            console.log(error);
        }

    }

    async delete(req, res) {
        try {
            await mongoose.connect(uri);

            var email = req.body.email;

            Model.deleteOne({ email: email })
                .then((result) => {
                    console.log(`Deleted ${result.deletedCount} user(s)`);
                    res.status(200).json({ message: 'User removed successfully' });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: 'Internal Server Error' });
                });

        } catch (error) {
            // Nếu có lỗi xảy ra thì trả về lỗi 500 Internal Server Error
            console.error(error);
            mongoose.connection.close();
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async search(req, res) {

        try {
            await mongoose.connect(uri);
            var searchUsers = await Model.find({ fullname: { $regex: req.body.namesearch, $options: "i" } });
            if (req.body.namesearch) {
                res.render('QuanLyUser', {
                    user: req.data,
                    posts: searchUsers, // sử dụng lại cấu trúc của đối tượng posts, chỉ thay đổi thuộc tính docs
                });


            } else {
                res.redirect('/qluser');


            }

        } catch (error) {
            console.log(error);
        }



    }
}

module.exports = new QluserController;