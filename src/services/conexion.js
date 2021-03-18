const conexion = (() => {
    
    let dbpostgresql = null;
    let conection = null;

    const setConfig = (dbpostgresqlR = null) => {
        dbpostgresql = dbpostgresqlR;
    }
    
    const getConexion = (stringConection = '') => {
        if (stringConection === '') return null;
        if (conection === null) {
            conection = dbpostgresql(stringConection);
        }
        return conection;
    }

    const closeConexion = () => {
        if (conection !== null) {
            conection.close();
            conection = null;
        }
    }

    return {
        setConfig,
        getConexion,
        closeConexion,
    }
})();

module.exports = conexion;
