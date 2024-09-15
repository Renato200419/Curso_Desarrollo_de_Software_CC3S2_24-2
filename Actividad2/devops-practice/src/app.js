const express = require('express');  // Importa el módulo Express para crear la aplicación web
const winston = require('winston');  // Importa Winston para el logging
const client = require('prom-client');  // Importa prom-client para la recolección de métricas

// Crear una instancia de la aplicación Express
const app = express();

// Configurar el logger de Winston
const logger = winston.createLogger({
    level: 'info',  // Nivel de log, puede ser 'info', 'debug', 'warn', etc.
    format: winston.format.combine(
        winston.format.timestamp(),  // Añade un timestamp a cada log
        winston.format.json()  // Formato de log en JSON
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()  // Formato simple para la salida en consola
        }),
        new winston.transports.File({ filename: 'server.log' })  // Registra los logs en un archivo
    ]
});

// Recolecta métricas predeterminadas de Node.js
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });  // Recolecta métricas cada 5 segundos

// Define una métrica personalizada: duración de las solicitudes HTTP
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',  // Nombre de la métrica
    help: 'Duration of HTTP requests in ms',  // Descripción de la métrica
    labelNames: ['method', 'path', 'status'],  // Etiquetas para diferenciar las métricas
    buckets: [0.1, 5, 15, 50, 100, 500]  // Rango de duraciones en milisegundos
});

// Middleware para logear solicitudes y medir duración
app.use((req, res, next) => {
    const start = process.hrtime();  // Registra el tiempo de inicio

    res.on('finish', () => {
        const durationInMilliseconds = process.hrtime(start)[1] / 1e6;  // Calcula la duración de la solicitud
        httpRequestDurationMicroseconds.labels(req.method, req.originalUrl, res.statusCode).observe(durationInMilliseconds);  // Observa la duración en la métrica
        logger.info(`Handled ${req.method} request to ${req.originalUrl} with status code ${res.statusCode} in ${durationInMilliseconds} ms`);  // Log de la solicitud
    });

    next();  // Pasa el control al siguiente middleware
});

// Ruta raíz que responde con 'Hello, World!'
app.get('/', (req, res) => {
    res.send('Hello, World!');  // Respuesta simple al acceso a la raíz
});

// Ruta para exponer las métricas a Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);  // Establece el tipo de contenido como el formato de métricas de Prometheus
    res.end(await client.register.metrics());  // Envía las métricas a Prometheus
});


// Ruta que simula un tiempo de respuesta lento
app.get('/slow', (req, res) => {
    // Log inicial sobre la recepción de la solicitud
    logger.info('Received a slow request');

    // Simula un retardo de 3 segundos antes de responder
    setTimeout(() => {
        res.send('Response with intentional delay');
        // Log que la solicitud ha sido procesada después del retardo
        logger.info('Processed the slow request after a 3-second delay');
    }, 3000); // Retraso de 3000 milisegundos (3 segundos)
});



// Verifica si el módulo actual es el módulo principal y ejecuta el servidor
if (require.main === module) {
    const port = process.env.PORT || 3000;  // Obtiene el puerto desde la variable de entorno o usa el puerto 3000 por defecto
    const server = app.listen(port, () => logger.info(`Server running on port ${port}`));  // Inicia el servidor y loggea el puerto
    module.exports = server;  // Exporta el servidor para su uso en otros módulos
} else {
    module.exports = app;  // Exporta la aplicación para su uso en otros módulos
}




