module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "usbw",
    PORT:"3306",
    DB: "dbparcial3",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};



