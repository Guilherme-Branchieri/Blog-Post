const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Category')
const Category = mongoose.model("categories")

// Index
router.get('/', (req, res) => {
    res.render('admin/index');
});

// Posts
router.get('/posts', (req, res) => {
    res.render('admin/posts');
});

// Categories
router.get('/categories', (req, res) => {
    Category.find().lean().then((categories) => {
        res.render('admin/categories', {categ: categories})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro, não pude listar as categorias")
        res.redirect('/admin')
    })
});

router.get('/categories/add', (req, res) => [
    res.render('admin/addcategories')
]);
 // POST
 router.post('/categories/new', (req, res) => {

    var errors = []

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        errors.push({text:'Nome invalido'})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        errors.push({text:"Slug inválido"})
    }

    

    if (errors.length > 0) {
        res.render("admin/addcategories", {erros:errors})
    } else {
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug,
            date: req.body.date,
        }
    
        new Category(newCategory).save().then(() => {
            req.flash('success_msg', "Categoria criada com sucesso")
            res.redirect('/admin/categories')
        }).catch((err) => {
            req.flash('error_msg', "Houve um erro, tente novamente")
            console.log('I found a error' + err)
        })
    }
 })

router.get('/categories/edit/:id', (req, res) => {
    Category.findOne({_id: req.params.id}).lean().then((category) => {
        res.render('admin/editcategory', {category: category})

    }).catch((err) => {
        req.flash('error_msg', 'Esta categoria não existe')
        res.redirect('/admin/categories')
    })
})

router.post('/categories/edit', (req, res) => {
    Category.findOne({_id: req.body.id}).then((categoria) => {
        category.name = req.body.name
        category.slug = req.body.slug
        category.save().then(() => {
            req.flash('success_msg', "Categoria editada com sucesso")
            res.redirect('admin/categories')
        }).catch((err) => {
            req.flash('error_msg', 'Houve umm hero')
            res.redirect('admin/categories')
        })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro')
        res.redirect('admin/categories')
    })
})

// Testing
router.get('/test', (req, res) => {
    res.render('admin/teste');
});



//Exporting
module.exports = router