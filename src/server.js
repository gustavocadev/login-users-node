const express = require("express");
const path = require("path");
const dbConnection = require("./db/dbConnection");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const connectFlash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.configs();
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    configs() {
        this.app.engine(
            ".hbs",
            engine({
                layoutsDir: path.join(__dirname, "views/layouts"),
                partialsDir: path.join(__dirname, "views/partials"),
                extname: ".hbs",
            })
        );
        this.app.set("view engine", ".hbs");
        this.app.set("views", __dirname + "/views");
        this.app.use(express.static(path.join(__dirname, "../public")));
    }
    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(methodOverride("_method"));
        this.app.use(
            session({
                secret: "secret",
                resave: true,
                saveUninitialized: true,
            })
        );
        this.app.use(connectFlash());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        // global variables
        this.app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error = req.flash("error");
            // passport give us the req.user to know if the user is logged
            res.locals.user = req.user || null;
            next();
        });
    }

    async connectDB() {
        await dbConnection();
    }

    routes() {
        // I gonna use my route
        this.app.use(require("./routes/index.routes"));
        this.app.use(require("./routes/notes.routes"));
        this.app.use(require("./routes/users.routes"));
    }

    listen() {
        this.app.listen(this.port);
    }
}

module.exports = Server;
