import express, { response } from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import UserService from './services/UserService.js';
import MedService from './services/MedService.js';
import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./localStorage');

mongoose.connect('mongodb+srv://gusto1820:gusto1820@cluster0.fgsxn.mongodb.net/medicalize?retryWrites=true&w=majority').then(console.log("Banco Conectado")).catch(err => console.log(err));

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false })) // Decodifica os dados recebidos por formularios
app.use(bodyParser.json()) // Permite a utilização de dados via JSON
app.set('view engine', 'ejs')



app.get("/home", (req, res) => {
    if (localStorage.getItem("dadosUser")) {

        MedService.GetAll().then(meds => {
            res.render("home", { meds: meds });
        })
    } else {
        res.redirect("/login")
    }
})

app.get("/med/:id", (req, res) => {
    if (localStorage.getItem("dadosUser")) {
        MedService.FindById(req.params.id).then(med => {
            res.render("med", { med: med })
        }).catch(err => {
            console.log(err);
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.get('/login?:msg', (req, res) => {
    res.render('index', { msg: req.params.msg })
})

app.post("/verifyUser", (req, res) => {
    const { email, password } = req.body
    UserService.Login(email, password)
        .then(x => {
            localStorage.setItem("dadosUser", JSON.stringify(x));
            res.redirect("/home")
        }).catch(err => {
            res.redirect("/login1")
        }
        )

})

app.get("/signup?:msg", (req, res) => {
    res.render('register', { msg: req.params.msg })
})

app.post('/cadUser', (req, res) => {

    const { name, email, password, confPassword, confTerm } = req.body

    if (name !== undefined && email !== undefined && password !== undefined && confPassword !== undefined && confTerm !== undefined) {
        if (password === confPassword) {
            if (confTerm === 'on') {
                UserService.Verify(email)
                    .then(response => {
                        if (response === null) {
                            UserService.Cad(name, email, password)
                                .then(response => {
                                    res.redirect('/login')
                                }
                                ).catch(err => {
                                    console.log(err)
                                })
                        } else {
                            res.redirect('/signup4')
                        }
                    })
            } else {
                res.redirect('/signup1')
            }
        } else {
            res.redirect('/signup2')
        }
    } else {
        res.redirect('/signup3')
    }

})

app.get("/favoritos", (req, res) => {
    if (localStorage.getItem("dadosUser")) {
        const dados = localStorage.getItem("dadosUser")
        var user = JSON.parse(dados)
        UserService.FindById(user._id)
            .then((data) => {
                if (data.favMed.length > 0) {
                    var fav = data.favMed
                    res.render("fav", { favs: fav })
                } else {
                    res.render("fav", { favs: 'n' })
                }

            }).catch((err) => {
                console.log(err)
            })
    } else {
        res.redirect('/login')
    }
})

app.get("/fav/:id", (req, res) => {
    if (localStorage.getItem("dadosUser")) {
        const dados = localStorage.getItem("dadosUser")
        var user = JSON.parse(dados)

        MedService.FindById(req.params.id)
            .then((data) => {
                UserService.Fav(user._id, data)
                    .then((response) => {
                        res.redirect('/home')
                    }).catch((err) => {
                        console.log(err)
                    })
            }).catch((err) => {
                console.log(err);
            })
    } else {
        res.redirect('/login')
    }

})

app.get("/desFav/:id", (req, res) => {
    if (localStorage.getItem("dadosUser")) {
        const dados = localStorage.getItem("dadosUser")
        var user = JSON.parse(dados)

        UserService.DesFav(user._id, req.params.id)
            .then(response => {
                res.redirect('/favoritos')
            }).catch(err => {
                console.log(err)
            })
    } else {
        res.redirect('/login')
    }
})

app.get("/perfil", (req, res) => {

    if (localStorage.getItem("dadosUser")) {
        const dados = localStorage.getItem("dadosUser")
        var user = JSON.parse(dados)
        res.render("profile", { dados: user })
    } else {
        res.redirect('/login')
    }

})

app.post("/searchMed", (req, res) => {
    if (localStorage.getItem("dadosUser")) {
        if (req.body) {
            MedService.Search(req.body.search).then(med => {
                res.render("search_result", { meds: med })
            })
        } else {
            res.render("search_result", { meds: 'n' })
        }
    } else {
        res.redirect('/login')
    }
})

app.get('/searchMed', (req, res) => {
    if (localStorage.getItem("dadosUser")) {

        res.render("search_result", { meds: 'n' })
    } else {
        res.redirect('/login')
    }

})

app.get("/reserved", (req, res) => {
    if (localStorage.getItem("dadosUser")) {

        res.render("reserved")
    } else {
        res.redirect('/login')
    }

})

app.get("/logout", (req, res) => {
    localStorage.clear();
    res.redirect('/login')
})

app.listen(8080, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")

    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})