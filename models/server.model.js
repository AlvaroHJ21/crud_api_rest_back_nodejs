const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            alumnos: "/api/alumnos",
            cursos: "/api/cursos",
            matriculas: "/api/matriculas",
            auth: "/api/auth",
        };
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        /**
         * LECTURA Y PARSEO DE BODY
         */
        this.app.use(express.json());
    }

    routes() {

        //rutas para la autenticación
        this.app.use(this.paths.auth, require("../routes/auth.routes"));

        //rutas para usuarios
        this.app.use(this.paths.alumnos, require("../routes/alumnos.routes"));

        //rutas para cursos
        this.app.use(this.paths.cursos, require("../routes/cursos.routes"));

        //rutas para matriculas
        this.app.use(this.paths.matriculas, require("../routes/matriculas.routes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;
