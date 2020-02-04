const sql = require('mssql')

const config = {
    user: 'ravellp',
    password: 'Pavani23',
    server: "golem.csse.rose-hulman.edu",
    database: 'crudLAX20',
    port: 1433
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    }).catch(err => console.log('Database connection falied.', err))

module.exports = {sql, poolPromise};