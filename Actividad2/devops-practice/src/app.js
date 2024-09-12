// Importa el módulo 'express' para poder crear una aplicación web
const express = require('express');
// Crea una instancia de la aplicación Express
const app = express();

// Define una ruta para la raíz del servidor ('/')
// Cuando se recibe una solicitud GET en la raíz, se responde con 'Hello, World!'
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Verifica si el módulo actual es el módulo principal
// Esto permite que el archivo se ejecute como una aplicación independiente
if (require.main === module) {
    // Obtiene el puerto desde la variable de entorno PORT o usa 3000 por defecto
    const port = process.env.PORT || 3000;

    // Agrega lógica para mostrar mensajes diferentes en desarrollo y producción
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isDebugMode = process.env.DEBUG === 'true';

    if (isDevelopment && isDebugMode) {
        console.log('Debugging is enabled');
    } else {
        console.log('Running in production mode');
    }

    // Inicia el servidor en el puerto especificado y muestra un mensaje en la consola
    const server = app.listen(port, () => console.log(`Server running on port ${port}`));

    // Exporta el servidor para que pueda ser usado en pruebas o en otros módulos
    module.exports = server;
} else {
    // Si el módulo no es el principal, exporta la aplicación Express para su uso en otros módulos
    module.exports = app;
}
