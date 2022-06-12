const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");

const getConnection = require("../db/db.config");

const getMatriculasController = async (req = request, res = response) => {
    //conectarse a la bd
    //obtener pool de conexion
    const pool = await getConnection();
    // const result = await pool.request().query("SELECT * FROM matriculas");

    //select compuesta de tres tablas
    const result = await pool
        .request()
        .query(
            `SELECT * FROM matriculas m JOIN cursos c ON m.id_cur = c.id JOIN alumnos a ON m.id_alu = a.id`
        );

    // console.log(result);

    res.json(result.recordset);
};

const postMatriculaController = async (req = request, res = response) => {
    const body = req.body;
    const { id_alu, id_cur, nota } = body;

    const id = uuidv4();

    const pool = await getConnection();
    const result = await pool
        .request()
        .query(
            `INSERT INTO matriculas VALUES ('${id}','${id_alu}', '${id_cur}', ${nota})`
        );
    res.json(id);
};

const deleteMatriculaController = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(`DELETE FROM matriculas WHERE id = '${id}'`);
        res.json({
            msg: "ok",
            result,
        });
    } catch (error) {
        console.log(error);
    }
};

const putMatriculaController = async (req = request, res = response) => {
    const body = req.body;
    const id = req.params.id;
    const { id_alu, id_cur, nota } = body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .query(
            `UPDATE matriculas SET id_alu = '${id_alu}', id_cur = '${id_cur}', nota = ${nota} WHERE id = '${id}'`
        );
    res.json({
        msg: "ok",
        result,
    });
};

module.exports = {
    getMatriculasController,
    postMatriculaController,
    deleteMatriculaController,
    putMatriculaController,
};
