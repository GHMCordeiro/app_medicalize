import express, { response } from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import UserService from './services/UserService.js';
import MedService from './services/MedService.js';
import FarmService from './services/FarmService.js';
import ReserveService from './services/ReserveService.js';
import { LocalStorage } from 'node-localstorage';
import { upload } from './multer.js';

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

app.post("/cadMed", upload.single('imagem'), (req, res) => {
    const data = req.body
    MedService.Cad(data, req.file.filename)
        .then(response => {
            res.send(response)
        }).catch(err => {
            res.send(err)
        })
})

app.get("/med/:id", (req, res) => {
    if (localStorage.getItem("dadosUser")) {
        let menorPreco = Infinity;

        MedService.FindById(req.params.id).then(med => {
            med.farms.forEach(f => {
                if (f.preco < menorPreco) {
                    menorPreco = f.preco;
                }
            })

            var farm = med.farms.length
            res.render("med", { med: med, farm: farm, preco: menorPreco })

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
                    console.log(fav)
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
        var menorPreco = Infinity

        MedService.FindById(req.params.id)
            .then((data) => {
                if (data.farms.length > 0) {
                    var aux = data.farms
                    aux.forEach(element => {
                        if (element.preco < menorPreco) {
                            menorPreco = element.preco;
                        }
                    });
                    UserService.Fav(user._id, data, menorPreco)
                        .then((response) => {
                            UserService.FindById(user._id)
                                .then(x => {
                                    localStorage.setItem("dadosUser", JSON.stringify(x));
                                    res.redirect('/home')
                                }).catch((error) => {
                                    console.error(error)
                                })
                        }).catch((err) => {
                            console.log(err)
                        })
                } else {
                    UserService.Fav(user._id, data, 0)
                        .then((response) => {
                            UserService.FindById(user._id)
                                .then(x => {
                                    localStorage.setItem("dadosUser", JSON.stringify(x));
                                    res.redirect('/home')
                                }).catch((error) => {
                                    console.error(error)
                                })
                        }).catch((err) => {
                            console.log(err)
                        })
                }

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
            .then(x => {
                UserService.FindById(user._id)
                    .then(t => {
                        localStorage.setItem("dadosUser", JSON.stringify(t))
                        res.redirect('/favoritos')
                    })
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

app.post("/cadFarm", (req, res) => {
    const { email, password, name, address, latitude, longitude, phone } = req.body

    UserService.Verify(email)
        .then(x => {
            if (x === null) {
                UserService.Cad(name, email, password)
                    .then(t => {
                        FarmService.Cad(email, password, name, address, latitude, longitude, phone)
                            .then(c => {
                                res.redirect('/login')
                            }).catch(err => {
                                console.log(err)
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        }).catch(err => {
            console.log(err)
        });
})

app.post("/addFarm", (req, res) => {
    FarmService.FindById(req.body.idFarm).then((farm) => {
        var id = req.body.idMed
        var estoque = Number(req.body.estoque)
        var preco = Number(req.body.preco)

        MedService.FindByIdAndAdd(id, farm, estoque, preco)
            .then((response) => {
                console.log(response)
            }).catch(err => {
                console.log(err)
            });
    }).catch(err => {
        console.log(err)
    })
})

app.post("/removeFarm", (req, res) => {
    FarmService.FindById(req.body.idFarm).then((farm) => {
        var id = req.body.idMed
        MedService.FindByIdAndRemove(id, farm._id)
            .then((response) => {
                console.log("removido")
            }).catch(err => {
                console.log(err)
            });
    }).catch(err => {
        console.log(err)
    })
})

app.get('/farms/?:id', (req, res) => {
    MedService.FindById(req.params.id)
        .then((response) => {
            res.render('farms', { farms: response.farms, idMed: req.params.id })
        }).catch(err => {
            console.log(err)
        });
})

app.get('/image', (req, res) => {
    if (localStorage.getItem("dadosUser")) {
        const dados = JSON.parse(localStorage.getItem("dadosUser"));
        res.render('image', { user: dados });
    } else {
        res.redirect('/login')
    }

});

app.post('/upload', upload.single('imagem'), (req, res) => {
    const nomeImagem = req.file.filename;
    UserService.UpdateImage(req.body.id, nomeImagem)
        .then(response => {
            UserService.FindById(req.body.id)
                .then(x => {
                    localStorage.setItem("dadosUser", JSON.stringify(x));
                    res.redirect('/perfil')
                })
        }).catch(err => {
            console.error(err);
        })
});

app.get("/reservar/:idFarm/:idMed", (req, res) => {
    res.render("reserve", { idFarm: req.params.idFarm, idMed: req.params.idMed });
})

app.post('/reservar', upload.single('imagem'), (req, res) => {
    const user = JSON.parse(localStorage.getItem("dadosUser"))
    MedService.FindById(req.body.idMed)
        .then(m => {
            var price = 0

            const data = {
                idUser: user._id,
                med: {
                    id: req.body.idMed,
                    name: m.nome,
                    tipo: m.tipo,
                    concentracao: m.concentracao
                },
                name: req.body.name,
                phone: req.body.phone,
                prescricao: req.file.filename,
                price: price
            }

            FarmService.FindById(req.body.idFarm)
                .then(response => {
                    ReserveService.Cad(data, response)
                        .then(x => {
                            res.redirect('/home')
                        }).catch(err => {
                            console.log(err)
                        });
                })
        })
})


app.listen(8080, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")

    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})