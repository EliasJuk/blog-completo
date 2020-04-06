const express = require('express')
const router = express.Router()
const Users = require('./User')
const bcrypt= require('bcryptjs')

//LIST
    //FORMULARIO DE LISTAGEM
        router.get("/admin/users", (req, res) => {
            Users.findAll().then(users => {
                res.render("admin/users/index", { users: users })
            })
        })

//CREATE
    //FORMULARIO DE CRIAÇÃO
        router.get("/admin/users/create", (req, res) => {
            res.render('admin/users/create')
        })

    //CADASTRA NO BANCO
    router.post("/users/create", (req, res) => {
        var email = req.body.email
        var password = req.body.password

        Users.findOne({ where: { email: email } }).then( user => {
            if(user == undefined){
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(password, salt)
            
                Users.create({
                    email: email,
                    password: hash
                }).then(() => {
                    res.redirect('/')
                }).catch((err) => {
                    res.redirect('/')
                })
            }else{
                res.redirect("/admin/users/create")
            }
        })
    })

//DELETE
    router.post("/admin/users/delete", (req, res) => {
        var id = req.body.id;

        Users.destroy({
            where: {
                id: id //Destroy uma categoria onde o id é igual o id da categoria
            }
        }).then( () => {
            res.redirect("/admin/users")
        })

})


module.exports = router;