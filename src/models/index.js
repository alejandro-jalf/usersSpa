const { QueryTypes } = require("sequelize");
const conexion = require("../services/conexion");
const {
    dbpostgresql,
    createContentAssert,
    createContentError
} = require("../utils");

const models = (() => {
    conexion.setConfig(dbpostgresql);

    const modelGetAllUser = async (stringConection) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                'SELECT * FROM users',
                QueryTypes.SELECT
            );
            await conexion.closeConexion();
            return createContentAssert('Datos encontrados en la base de datos', result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar buscar los usuarios',
                error
            );
        }
    }

    const modelGetUserByEmail = async (stringConection, correo_user) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `SELECT
                    *
                FROM users WHERE correo_user = '${correo_user}'`,
                QueryTypes.SELECT
            );
            await conexion.closeConexion();
            return createContentAssert(`Datos encontrados del usuario ${correo_user}`, result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar buscar al usuario ' + correo_user,
                error
            );
        }
    }

    const modelCreateUser = async (stringConection, bodyUser) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `INSERT INTO users(
                    nombre_user, apellido_p_user, apellido_m_user, direccion_user, sucursal_user,
                    correo_user, password_user, tipo_user, access_to_user
                ) VALUES(
                    '${bodyUser.nombre_user}', '${bodyUser.apellido_p_user}', '${bodyUser.apellido_m_user}',
                    '${bodyUser.direccion_user}', '${bodyUser.sucursal_user}', '${bodyUser.correo_user}',
                    '${bodyUser.password_user}', '${bodyUser.tipo_user}','${bodyUser.access_to_user}'
                )`,
                QueryTypes.INSERT
            );
            await conexion.closeConexion();
            return createContentAssert(`Se ha dado de alta al usuario ${bodyUser.correo_user}`, result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar dar de alta al usuario ' + bodyUser.correo_user,
                error
            );
        }
    }

    const modelUpdateUSer = async (stringConection, correo_user, bodyUser) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `UPDATE users SET
                    nombre_user = '${bodyUser.nombre_user}', apellido_p_user = '${bodyUser.apellido_p_user}',
                    apellido_m_user = '${bodyUser.apellido_m_user}', direccion_user = '${bodyUser.direccion_user}',
                    sucursal_user = '${bodyUser.sucursal_user}', correo_user = '${bodyUser.correo_user}',
                    tipo_user = '${bodyUser.tipo_user}', access_to_user = '${bodyUser.access_to_user}',
                    activo_user = ${bodyUser.activo_user}
                WHERE correo_user = '${correo_user}'`,
                QueryTypes.UPDATE
            );
            await conexion.closeConexion();
            return createContentAssert(`Los datos del usuario ${correo_user} han sido modificados`, result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar modificar al usuario ' + correo_user,
                error
            );
        }
    }

    const modelUpdateDataGeneral = async (stringConection, correo_user, bodyUser) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `UPDATE users SET
                    nombre_user = '${bodyUser.nombre_user}', apellido_p_user = '${bodyUser.apellido_p_user}',
                    apellido_m_user = '${bodyUser.apellido_m_user}', direccion_user = '${bodyUser.direccion_user}'
                WHERE correo_user = '${correo_user}'`,
                QueryTypes.UPDATE
            );
            await conexion.closeConexion();
            return createContentAssert(`Los datos del usuario ${correo_user} han sido modificados`, result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar modificar al usuario generales ' + correo_user,
                error
            );
        }
    }

    const modelUpdateEmail = async (stringConection, correo_user, bodyEmail) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `UPDATE users SET
                    direccion_user = '${bodyEmail.direccion_user}'
                WHERE correo_user = '${correo_user}'`,
                QueryTypes.UPDATE
            );
            await conexion.closeConexion();
            return createContentAssert('La direccion de correo electronico ha sido actualizada', result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar modificar la direccion de correo electronico',
                error
            );
        }
    }

    const modelUpdatePassword = async (stringConection, correo_user, bodyPassword) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `UPDATE users SET
                    password_user = '${bodyPassword.password_user}'
                WHERE correo_user = '${correo_user}'`,
                QueryTypes.UPDATE
            );
            await conexion.closeConexion();
            return createContentAssert('La contraseña ha sido actualizada', result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar modificar la contraseña',
                error
            );
        }
    }

    const modelUpdateRecoveryCode = async (stringConection, correo_user, bodyRecovery) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `UPDATE users SET
                    recovery_code_user = '${bodyRecovery.recovery_code_user}'
                WHERE correo_user = '${correo_user}'`,
                QueryTypes.UPDATE
            );
            await conexion.closeConexion();
            return createContentAssert('Se ha generado un codigo de recuperacion', result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar recuperar la cuenta',
                error
            );
        }
    }

    const modelUpdateStatus = async (stringConection, correo_user, bodyStatus) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `UPDATE users SET
                    activo_user = ${bodyStatus.activo_user}
                WHERE correo_user = '${correo_user}'`,
                QueryTypes.UPDATE
            );
            await conexion.closeConexion();
            return createContentAssert('Se ha actualizado el status del usuario ' + correo_user, result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar modificar el status del usuario ' + correo_user,
                error
            );
        }
    }

    const modelDeleteUser = async (stringConection, correo_user) => {
        try {
            const accessToDataBase = conexion.getConexion(stringConection);
            const result = await accessToDataBase.query(
                `DELETE FROM users WHERE correo_user = '${correo_user}'`,
                QueryTypes.DELETE
            );
            await conexion.closeConexion();
            return createContentAssert('Se ha eliminado al usuario ' + correo_user, result);
        } catch (error) {
            return createContentError(
                'Fallo la conexion con base de datos al intentar eliminar al usuario ' + correo_user,
                error
            );
        }
    }

    return {
        modelGetAllUser,
        modelGetUserByEmail,
        modelCreateUser,
        modelUpdateUSer,
        modelUpdateDataGeneral,
        modelUpdateEmail,
        modelUpdatePassword,
        modelUpdateRecoveryCode,
        modelUpdateStatus,
        modelDeleteUser,
    }
})();

module.exports = models;
