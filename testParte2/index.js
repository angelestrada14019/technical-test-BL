const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send(
        `<html>
            <head>
                <title>Login</title>
            </head>
                <body>
                <h1>Login</h1>
                    <form action="/login" method="post">
                        <label for="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre">
                        <label for="password">Password</label>
                        <input type="password" name="pass" id="pass">
                        <button type="submit">Ingresar</button>
                    </form>
                </body>
        </html>`
    );
});

app.get("/entrar",verificarToken, (req, res) => {
    res.send(`<html>
                <head>
                    <title>Entrar</title>
                </head>
                    <body>
                    <h1>Entrar</h1>
                        <h2>Bienvenido</h2>
                        <form action="/interno" method="post">
                            <button>Ingresar a interno</button>
                        </form>
                    </body>
            </html>`);
});

app.get("/interno", verificarToken, (req, res) => {   
    console.log(req.user.nombre);
   res.send(`<html>
                <head>
                    <title>Entrar</title>
                </head>
                    <body>
                    <h1>Entrar</h1>
                        <h2>Bienvenido ${req.user.nombre}</h2>
                        
                    </body>
            </html>`);    
});
fncEntrar(app);
fncInterno(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function fncEntrar(app){
    app.post("/login", (req, res) => {
        const { nombre, pass } = req.body;
        const hash = crypto.createHash("sha256").update(pass).digest("hex");
        const user = {
            nombre: nombre,
        };
       
        if (
            hash !==
            crypto
                .createHash("sha256")
                .update("12354hdfnb63ybcxbrthy")
                .digest("hex")
        ) {
            res.send(`<html>
                <head>
                    <title>Entrar</title>
                </head>
                    <body>
                    <h1>Entrar</h1>
                        <h2>Contraseña incorrecta</h2>
                        <a href="/">Volver al login</a>
                    </body>
            </html>`);
            // return res.status(403).json({
            //     error: "Contraseña incorrecta",
            // });
        }          
        const token = tokenAcceso(user);        
        res.cookie("token", token);
        return res.redirect("/entrar");
    });
}
function tokenAcceso(user) {
    return jwt.sign(user, "secret", { expiresIn: "1h" });
}
function verificarToken(req, res, next) {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, "secret");
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
    }
}
function fncInterno(app) {  
     app.post("/interno", verificarToken, (req, res) => {         
         res.redirect("/interno");
     });
}