require("mandatoryenv").load();

const configs = (() => {

    const port = process.env.PORT || 5000;
    const node_env = process.env.USERSPA_ENV || 'develop';
    const token = process.env.USERSPA_TOKEN;
    const origin1 = process.env.USERSPA_ORIGIN1;
    const origin2 = process.env.USERSPA_ORIGIN2;
    const cadenaConexion = process.env.USERSPA_CONECTION;
    const user = process.env.USERSPA_USER;
    const password = process.env.USERSPA_PASSWORD;

    const listOriginAccept = [origin1, origin2];

    return {
        port,
        node_env,
        token,
        listOriginAccept,
        cadenaConexion,
        user,
        password,
    }
})();

module.exports = configs;
