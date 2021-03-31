const { createResponse, createContentAssert, createContentError, encriptData } = require("../utils");
const { cadenaConexion } = require('../configs');
const { modelGetAllUser, modelGetUserByEmail, modelCreateUser } = require("../models");
const {
    validateBodyCrateUser, validateBodyLogin,
} = require('../validations');

const services = (() => {
    const getAllUsers = async () => {
        const result = await modelGetAllUser(cadenaConexion);
        if (!result.success) {
            return createResponse(500, result);
        }
        return createResponse(200, result);
    }

    const getUserByEmail = async (correo_user) => {
        const response = await modelGetUserByEmail(cadenaConexion, correo_user);
        if (response.data.length === 0) {
            return createResponse(200, 
                createContentError(`El usuario ${correo_user} no esta registrado`)
            );
        }
        return createResponse(200, response);
    }

    const createUser = async (bodyUser) => {
        const validate = validateBodyCrateUser(bodyUser);
        if (!validate.success) {
            return createResponse(400, validate)
        }

        const result = await modelCreateUser(cadenaConexion, bodyUser);
        if (!result.success) {
            return createResponse(500, result);
        }
        return createResponse(201, result);
    }

    const login = async (correo_user, bodyLogin) => {
        const resulValidate = validateBodyLogin(bodyLogin);
        if (!resulValidate.success) {
            return createResponse(400, resulValidate)
        }

        const resultQuery = await modelGetUserByEmail(correo_user);
        if (!resultQuery.success) {
            return createResponse(500, resultQuery);
        }

        if (resultQuery.data.length === 0) {
            return createResponse(401, 
                createContentError(`El usuario ${correo_user} no esta registrado`)
            );
        }

        const password_user_encript = encriptData(bodyLogin.password_user);
        if (password_user_encript !== bodyLogin.password_user) {
            return createResponse(401,
                createContentError('La contraseña es incorrecta')
            );
        }

        
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
