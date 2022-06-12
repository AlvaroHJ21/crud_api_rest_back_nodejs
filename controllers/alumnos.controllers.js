const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");

const getConnection = require("../db/db.config");

const getAlumnosController = async (req = request, res = response) => {
    //conectarse a la bd
    //obtener pool de conexion
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM alumnos");

    // console.log(result);

    res.json(result.recordset);
};

const postAlumnoController = async (req = request, res = response) => {
    const body = req.body;
    const { codalu, nomalu, apealu, edad } = body;
    const id = uuidv4();

    const pool = await getConnection();
    const result = await pool
        .request()
        .query(
            `INSERT INTO alumnos VALUES ('${id}', '${codalu}', '${nomalu}', '${apealu}', ${edad})`
        );
    res.json(id);
};

const deleteAlumnoController = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(`DELETE FROM alumnos WHERE id = '${id}'`);
        res.json({
            msg: "ok",
            result,
        });
    } catch (error) {
        console.log(error);
    }
};

const putAlumnoController = async (req = request, res = response) => {
    const body = req.body;
    const id = req.params.id;
    const { codalu, nomalu, apealu, edad } = body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .query(
            `UPDATE alumnos SET codalu = '${codalu}', nomalu = '${nomalu}', apealu = '${apealu}', edad = ${edad} WHERE id = '${id}'`
        );
    res.json({
        msg: "ok",
        result,
    });
};

module.exports = {
    getAlumnosController,
    postAlumnoController,
    deleteAlumnoController,
    putAlumnoController,
};
