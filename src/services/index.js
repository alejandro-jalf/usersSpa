const { createResponse, createContentAssert } = require("../utils");
const { cadenaConexion } = require('../configs');
const { modelGetAllUser, modelGetAllUserPG } = require("../models");

const services = (() => {

    const getAllUsersPG = async () => {
        const result = await modelGetAllUserPG(cadenaConexion);
        return createResponse(200, result);
    }

    const getAllUsers = async () => {
        const result = await modelGetAllUser(cadenaConexion);
        return createResponse(200, result);
    }

    const getUserByEmail = async (correo_user) => {
        return createResponse(
            200,
            createContentAssert('Ruta getUserByEmail aun no displonible')
        );
    }

    const createUser = async (bodyUser) => {
        return createResponse(
            200,
            createContentAssert('Ruta createUser aun no displonible')
        );
    }

    const login = async (correo_user, bodyLogin) => {
        return createResponse(
            200,
            createContentAssert('Ruta login aun no displonible')
        );
    }

    const updateUSer = async (correo_user, bodyUser) => {
        return createResponse(
            200,
            createContentAssert('Ruta updateUSer aun no displonible')
        );
    }

    const updateDataGeneral = async (correo_user, bodyUser) => {
        return createResponse(
            200,
            createContentAssert('Ruta updateDataGeneral aun no displonible')
        );
    }

    const updateEmail = async (correo_user, bodyEmail) => {
        return createResponse(
            200,
            createContentAssert('Ruta updateEmail aun no displonible')
        );
    }

    const updatePassword = async (correo_user, bodyPassword) => {
        return createResponse(
            200,
            createContentAssert('Ruta updatePassword aun no displonible')
        );
    }

    const recoveryCount = async (correo_user) => {
        return createResponse(
            200,
            createContentAssert('Ruta recoveryCount aun no displonible')
        );
    }

    const updateStatus = async (correo_user, bodyStatus) => {
        return createResponse(
            200,
            createContentAssert('Ruta updateStatus aun no displonible')
        );
    }

    const deleteUser = async (correo_user) => {
        return createResponse(
            200,
            createContentAssert('Ruta deleteUser aun no displonible')
        );
    }

    return {
        getAllUsersPG,
        getAllUsers,
        getUserByEmail,
        createUser,
        login,
        updateUSer,
        updateDataGeneral,
        updateEmail,
        updatePassword,
        recoveryCount,
        updateStatus,
        deleteUser,
    }
})();

module.exports = services;
