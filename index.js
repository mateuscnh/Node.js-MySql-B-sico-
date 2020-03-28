const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const modelPost = require('./models/Post');

// Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    // Body Parser
    app.use(bodyParser.urlencoded({extend: false}));
    app.use(bodyParser.json());
// Rotas

    app.get('/', function(req, res){
        modelPost.findAll({order: [['id', 'DESC']]}).then(function(posts){
            console.log(posts)
            res.render('home', {posts: posts})
        })
    })

    app.get('/deletar/:id', function(req, res){
        modelPost.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("Postagem deletada com sucesso!");
        }).catch(function(erro){
            res.send("Postagem deletada com sucesso!" + erro);
        });
    })

    app.get('/cad', function(req, res){
        res.render('form');
    })

    app.post('/add', function(req, res){
        modelPost.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/');
        }).catch(function(erro){
            res.send("Erro ao cadastrar! " + erro);
        })
    })

app.listen(3000);
