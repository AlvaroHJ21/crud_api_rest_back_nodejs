const { request, response } = require("express");
const getConnection = require("../db/db.config");

const loginController = async (req = request, res = response) => {
    const { username, password } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(
                `SELECT * FROM usuarios WHERE username = '${username}' AND password = '${password}'`
            );

        if (result.recordset.length === 0) {
            return res.status(401).json({
                msg: "Usuario o contraseña incorrectos",
            });
        }

        console.log({
            username: result.recordset[0].username,
        });

        return res.json({
            username: result.recordset[0].username,
            name: result.recordset[0].name,
        });
    } catch (error) {
        return res.status(401).json({
            msg: "Error fatal",
        });
    }

    // try {
    //     /**
    //      * Verificar si el email existe
    //      */
    //     // const user = await User.findOne({ email });
    //     const user = {};

    //     if (!user) {
    //         return res.status(400).json({
    //             msg: "Usuario / Password no son correctos - correo",
    //         });
    //     }

    //     /**
    //      * Verificar si el usuario está activo
    //      */
    //     // if (!user.state) {
    //     //     return res.status(400).json({
    //     //         msg: "Usuario / Password no son correctos - estado: false",
    //     //     });
    //     // }

    //     /**
    //      * Verificar la contraseña
    //      */
    //     // const validPassword = bcryptjs.compareSync(password, user.password);
    //     // if (!validPassword) {
    //     //     return res.status(400).json({
    //     //         msg: "Usuario / Password no son correctos - password",
    //     //     });
    //     // }

    //     /**
    //      * Generar el JWT
    //      * Como payload (informacion que queremos encriptar del usuario)
    //      * enviamos el id del usuario
    //      */
    //     // const token = await generarJWT(user.id);

    //     res.json({
    //         user,
    //         token,
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.json({
    //         msg: "Algo malió sal",
    //     });
    // }
};

module.exports = { loginController };
