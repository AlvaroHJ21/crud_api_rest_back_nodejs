const { Router } = require("express");
const {
    getMatriculasController,
    postMatriculaController,
    deleteMatriculaController,
    putMatriculaController,
} = require("../controllers/matriculas.controllers");

const router = Router();

router.get("/", getMatriculasController);

router.post("/", postMatriculaController);

router.delete("/:id", deleteMatriculaController);

router.put("/:id", putMatriculaController);

module.exports = router;
