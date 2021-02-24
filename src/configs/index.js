require("mandatoryenv").load();

const configs = (() => {

    const port = process.env.USERSPA_PORT || 3000;
    const node_env = process.env.USERSPA_ENV || 'develop';
    const token = process.env.USERSPA_TOKEN;
    const origin1 = process.env.USERSPA_ORIGIN1;
    const origin2 = process.env.USERSPA_ORIGIN2;

    const listOriginAccept = [origin1, origin2];

    return {
        port,
        node_env,
        token,
        listOriginAccept,
    }
})();

module.exports = configs;
