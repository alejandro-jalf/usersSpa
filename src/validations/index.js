const { createContentAssert, createContentError } = require('../utils');
const {
    schemaCreateUser,
    schemaUpdateUser,
    schemaUpdateDataGeneral,
    schemaContentLetters,
    schemaContentNumbers,
    schemaUpdateEmail,
    schemaUpdatePassword,
    schemaUpdateRecovery,
    schemaUpdateStatus,
} = require('../schema');

const validations = (() => {
    const validateBodyCrateUser = (bodyUser) => {
        let resultValidate = schemaCreateUser.validate(bodyUser);
        if (resultValidate.error) {
            return createContentError("Algun dato fue enviado de manera incorrecta", resultValidate.error);
        }

        resultValidate = schemaContentLetters.validate(bodyUser.password_user);
        if (resultValidate.error) {
            return createContentError("La contraseña debe contener al menos una letra", resultValidate.error);
        }

        resultValidate = schemaContentNumbers.validate(bodyUser.password_user);
        if (resultValidate.error) {
            return createContentError("La contraseña debe contener al menos un numero", resultValidate.error);
        }

        return createContentAssert("Validacion correcta");
    }

    const validateBodyUpdateUser = (bodyUser) => {
        let resultValidate = schemaUpdateUser.validate(bodyUser);
        if (resultValidate.error) {
            return createContentError("Algun dato fue enviado de manera incorrecta", resultValidate.error);
        }

        return createContentAssert("Validacion correcta");
    }

    const validateBodyUpdateDataUser = (bodyData) => {
        let resultValidate = schemaUpdateDataGeneral.validate(bodyData);
        if (resultValidate.error) {
            return createContentError("Algun dato fue enviado de manera incorrecta", resultValidate.error);
        }

        return createContentAssert("Validacion correcta");
    }

    const validateBodyUpdateEmail = (bodyEmail) => {
        let resultValidate = schemaUpdateEmail.validate(bodyEmail);
        if (resultValidate.error) {
            return createContentError("Algun dato fue enviado de manera incorrecta", resultValidate.error);
        }

        return createContentAssert("Validacion correcta");
    }

    const validateBodyUpdatePassword = (bodyPassword) => {
        let resultValidate = schemaUpdatePassword.validate(bodyPassword);
        if (resultValidate.error) {
            return createContentError("Algun dato fue enviado de manera incorrecta", resultValidate.error);
        }

        resultValidate = schemaContentLetters.validate(bodyPassword.password_user);
        if (resultValidate.error) {
            return createContentError("La contraseña debe contener al menos una letra", resultValidate.error);
        }

        resultValidate = schemaContentNumbers.validate(bodyPassword.password_user);
        if (resultValidate.error) {
            return createContentError("La contraseña debe contener al menos un numero", resultValidate.error);
        }

        return createContentAssert("Validacion correcta");
    }

    const validateBodyUpdateRecovery = (bodyRecovery) => {
        let resultValidate = schemaUpdateRecovery.validate(bodyRecovery);
        if (resultValidate.error) {
            return createContentError("Algun dato fue enviado de manera incorrecta", resultValidate.error);
        }

        return createContentAssert("Validacion correcta");
    }


    const validateBodyUpdateStatus = (bodyStatus) => {
        let resultValidate = schemaUpdateStatus.validate(bodyStatus);
        if (resultValidate.error) {
            return createContentError("Algun dato fue enviado de manera incorrecta", resultValidate.error);
        }

        return createContentAssert("Validacion correcta");
    }


    return {
        validateBodyCrateUser,
        validateBodyUpdateUser,
        validateBodyUpdateDataUser,
        validateBodyUpdateEmail,
        validateBodyUpdatePassword,
        validateBodyUpdateRecovery,
        validateBodyUpdateStatus,
    }
})();

module.exports = validations;
