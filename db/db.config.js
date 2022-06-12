const sql = require("mssql");

const sqlConfig = {
    user: "sa",
    password: "root",
    database: "CRUD_API_REST",
    server: "localhost",
    // pool: {
    //     max: 10,
    //     min: 0,
    //     idleTimeoutMillis: 30000,
    // },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};

const getConnection = async () => {
    try {
        const pool = await sql.connect(sqlConfig);
        // const result = await pool.request().query("SELECT 1");
        // console.log(result);
        return pool;
    } catch (error) {
        console.log(error);
    }
};

module.exports = getConnection;
