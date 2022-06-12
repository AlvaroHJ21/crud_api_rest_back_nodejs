const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");

const getConnection = require("../db/db.config");

const getCursosController = async (req = request, res = response) => {
    //conectarse a la bd
    //obtener pool de conexion
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Cursos");

    // console.log(result);

    res.json(result.recordset);
};

const postCursoController = async (req = request, res = response) => {
    const body = req.body;
    const { codcur, nomcur, creditos  } = body;
    const id = uuidv4();

    const pool = await getConnection();
    const result = await pool
        .request()
        .query(
            `INSERT INTO Cursos VALUES ('${id}', '${codcur}', '${nomcur}', ${creditos})`
        );
    res.json(id);
};

const deleteCursoController = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(`DELETE FROM Cursos WHERE id = '${id}'`);
        res.json({
            msg: "ok",
            result,
        });
    } catch (error) {
        console.log(error);
    }
};

const putCursoController = async (req = request, res = response) => {
    const body = req.body;
    const id = req.params.id;
    const { codcur, nomcur, creditos } = body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .query(
            `UPDATE Cursos SET codcur = '${codcur}', nomcur = '${nomcur}', creditos = ${creditos} WHERE id = '${id}'`
        );
    res.json({
        msg: "ok",
        result,
    });
};

module.exports = {
    getCursosController,
    postCursoController,
    deleteCursoController,
    putCursoController,
};
