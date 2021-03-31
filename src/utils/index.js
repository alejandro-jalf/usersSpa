const sha1 = require("sha1");
const Sequelize = require('sequelize');
// const mail = require("nodemailer");

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
        if (length === 2) {
            if (value.toString().length === 1) {
                return `0${value}`;
            }
            return value;
        }
        if (length === 3) {
            if (value.toString().length === 1) {
                return `00${value}`
            }
            if (value.toString().length === 2) {
                return `0${value}`
            }
            return value;
        }
        return value;
    }
    
    const encriptData = (message) => {
        return sha1(message);
    }

    const createContentAssert = (message, data = null) => {
        if (data === null) {
            return {
                success: true,
                message
            }
        }
        return {
            success: true,
            message,
            data
        }
    }

    const createContentError = (message, error = null) => {
        if (error === null) {
            return {
                success: false,
                message
            }
        }
        return {
            success: false,
            message,
            error
        }
    }

    const createResponse = (status, response) => {
        return {
            status,
            response,
        }
    }

    const sendEmail = async (from, to, subject, content, user, pass) => {
        const transporter = mail.createTransport({
            service: 'Gmail',
            auth: { user, pass }
        });

        console.log(from, to, subject, content, user, pass);
        const mailOptions = {
            from: '"Super promociones de acayucan" <' + from + '>',
            to,
            subject,
            text: content
        };

        const response = await transporter.sendMail(mailOptions
            , function(error, info){
            if (error){
                console.log(error);
                return createContentError("No se puedo enviar el correo", error)
            } else {
                console.log("Email sent");
                return createContentAssert("No se puedo enviar el correo", {})
            }
        }
        );

        console.log("Respuesta de email: ", response);

        return response;
    }

    const dbpostgresql = (cadenaConexion) => {
        return new Sequelize(cadenaConexion, {
            dialect: "postgres",
            protocol: "postgres",
            // port: 5432,
            // host: "ec2-52-45-73-150.compute-1.amazonaws.com",
            // logging: true,
            // pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
            dialectOptions: {
            //     // native: true,
                ssl: true,
            //     options: {
            //         useUTC: false,
            //         dateFirst: 1,
            //         enableArithAbort: true,
            //         trustServerCertificate: true,
            //     },
            },
            // define: { timestamps: false },
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
