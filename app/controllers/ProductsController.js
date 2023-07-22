const mongoose = require('mongoose');

const Model = require('../Model/productsModel');

const uri = 'mongodb+srv://hlndzzkun:12072003@cluster0.oelsp4u.mongodb.net/AsmSeverAndroid?retryWrites=true&w=majority'


class ProductsController {
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

            res.render('Products', {
                user: req.data,
                posts: reversedPosts,// sử dụng lại cấu trúc của đối tượng posts, chỉ thay đổi thuộc tính docs
                show: false,
                message: ''
            });

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProductsController;