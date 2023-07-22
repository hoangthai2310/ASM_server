const mongoose = require('mongoose');

const Model = require('../Model/productsModel');

const uri = 'mongodb+srv://hlndzzkun:12072003@cluster0.oelsp4u.mongodb.net/AsmSeverAndroid?retryWrites=true&w=majority'

class QlspController {
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
            var products = await Model.find({});
            var reversedPosts = products.reverse();

            res.render('QuanLySP', {
                user: req.data,
                posts: reversedPosts,// sử dụng lại cấu trúc của đối tượng posts, chỉ thay đổi thuộc tính docs
                show: false,
                message: ''
            });

        } catch (error) {
            console.log(error);
        }
    }
    async postorput(req, res) {

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
            if (req.body.id) {
                await Model.updateOne({ _id: req.body.id }, // Tìm document cần update theo _id
                    {
                        $set: {
                            image: nameFile,
                            name: req.body.name,
                            price: req.body.price,
                            color: req.body.color,
                            type: req.body.type,
                        }
                    })
                    .then(() => {
                        res.status(200).json({ message: 'User update successfully' });
                        
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'Internal Server Error' });
                        
                    });
            } else {
                let newProduct = new Model({
                    image: nameFile,
                    name: req.body.name,
                    price: req.body.price,
                    color: req.body.color,
                    type: req.body.type,
                })
                newProduct.save()
                    .then(data => {
                        res.status(200).json({ message: 'User insert successfully' });
                        
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'Internal Server Error' });
                        
                    });
            }

        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        try {
            await mongoose.connect(uri);
            var id = req.body.id;

            Model.deleteOne({ _id: id })
                .then((result) => {
                    console.log(`Deleted ${result.deletedCount} user(s)`);
                    res.status(200).json({ message: 'User removed successfully' });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: 'Internal Server Error' });
                });

        } catch (error) {
            console.log(error);
        }
    }

    async search(req, res) {

        try {
            await mongoose.connect(uri);
            var searchProducts = await Model.find({ name: { $regex: req.body.namesearch, $options: "i" } });
            if (req.body.namesearch) {
                res.render('QuanLySP', {
                    user: req.data,
                    posts: searchProducts, // sử dụng lại cấu trúc của đối tượng posts, chỉ thay đổi thuộc tính docs
                });

            } else {
                res.redirect('/qlsp');

            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new QlspController;