// Importamos el módulo 'express' que nos permitirá crear y manejar nuestro servidor web.
const express = require('express');

// Creamos una instancia de la aplicación express.
const app = express();

// Definimos una ruta para la raíz del servidor. Cuando se accede a la ruta '/', se responde con 'Hello, World!'.
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Establecemos el puerto en el que el servidor escuchará. Primero intentamos obtener el valor del puerto desde las variables de entorno (esto es útil para despliegues en servicios de nube). Si no está definido, usamos el puerto 3000 por defecto.
const port = process.env.PORT || 3000;

// Hacemos que el servidor comience a escuchar en el puerto definido. También mostramos un mensaje en la consola para confirmar que el servidor está corriendo.
const server = app.listen(port, () => console.log(`Server running on port ${port}`));

// Exportamos la instancia de la aplicación y el servidor. Esto es útil para realizar pruebas o integrar con otros módulos.
module.exports = { app, server };
