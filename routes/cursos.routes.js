const { Router } = require("express");
const {
    getCursosController,
    postCursoController,
    deleteCursoController,
    putCursoController,
} = require("../controllers/cursos.controllers");

const router = Router();

router.get("/", getCursosController);

router.post("/", postCursoController);

router.delete("/:id", deleteCursoController);

router.put("/:id", putCursoController);

module.exports = router;
