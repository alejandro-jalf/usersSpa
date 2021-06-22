const sha1 = require("sha1");
const Sequelize = require('sequelize');
const mail = require("nodemailer");
const { user, password } = require('../configs');

const utils = (() => {
    const _arrayMonths = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    const completeDataForDate = (value, length = 2) => {
        if (length === 2)
            if (value.toString().length === 1) return `0${value}`
        if (length === 3) {
            if (value.toString().length === 1) return `00${value}`
            if (value.toString().length === 2) return `0${value}`
        }
        return value;
    }
    
    const encriptData = (message) => sha1(message);

    const createContentAssert = (message, data = null) => (data === null) ?
        { success: true, message } :
        { success: true, message, data}

    const createContentError = (message, error = null) => (error === null) ?
        { success: false, message } :
        { success: false, message, error }

    const createResponse = (status, response) => ({ status, response })

    const sendEmail = async (to, code) => {
        const transporter = mail.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user,
                pass: password,
            },
        });

        try {
            const info = await transporter.sendMail({
                from: '"Super Promociones de acayucan" <alexlofa45@gmail.com>',
                to,
                subject: "Codigo de seguridad",
                html: `
                <h1>Se esta recuperando tu cuenta</h1>
                <p>Tu cuenta esta siendo recuperada, para poder recuperarla deberas loguearte con tu usuario que usas para iniciar sesion, y en el apartado de contraseña deberas poner el codigo de seguridad que esta proporcionado a continuacion</p>
                <br><br> <b>Codigo de seguridad: </b> ${code} <br><br>
                <p>Despues de haber iniciado sesion es importante que cambies tu contraseña por una que sea facil de recordar para ti, y que ademas sea complicada de decifrar para los demas. Recuerda tu nueva contraseña debe ser mayor de 6 caracteres y ademas debera tener por lo menos una letra y un numero.</p>
                `
            });

            return createContentAssert('Correo enviado', info);
        } catch (error) {
            console.log(error);
            return createContentError('Error al enviar el correo', error);
        }
    }

    const dbpostgresql = (cadenaConexion) => {
        return new Sequelize(cadenaConexion, {
            dialect: "postgres",
            protocol: "postgres",
            pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
            dialectOptions: {
                native: true,
                ssl: {
                    rejectUnauthorized: false
                },
                options: {
                    useUTC: false,
                    dateFirst: 1,
                    enableArithAbort: true,
                    trustServerCertificate: true,
                },
            },
            define: { timestamps: false },
        });
    }

    return {
        completeDataForDate,
        createContentAssert,
        createContentError,
        createResponse,
        dbpostgresql,
        encriptData,
        sendEmail,
    }
})();

module.exports = utils;
