const { Router } = require("express");
const {
    getAlumnosController,
    postAlumnoController,
    deleteAlumnoController,
    putAlumnoController,
} = require("../controllers/alumnos.controllers");

const router = Router();

router.get("/", getAlumnosController);

router.post("/", postAlumnoController);

router.delete("/:id", deleteAlumnoController);

router.put("/:id", putAlumnoController);

module.exports = router;
