const app = require("./app");

const { port } = require("./configs");

app.listen(port, () => console.info("Servidor corriendo en el puerto ", port));
