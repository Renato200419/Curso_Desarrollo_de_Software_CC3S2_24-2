// Importamos el módulo 'supertest' que se usa para hacer solicitudes HTTP en nuestras pruebas.
const request = require('supertest');
// Importamos la instancia de la aplicación y el servidor desde el archivo de la aplicación.
const { app, server } = require('../src/app');  

// Definimos un bloque de pruebas para la ruta GET '/'
describe('GET /', () => {
    // Después de ejecutar todas las pruebas en este bloque, cerramos el servidor para liberar el puerto.
    afterAll(() => {
        server.close();  // Cierra el servidor después de completar las pruebas
    });

    // Definimos una prueba que verifica la respuesta de la ruta '/'
    it('should return Hello, World!', async () => {
        // Hacemos una solicitud GET a la ruta '/'
        const res = await request(app).get('/');
        // Verificamos que el código de estado de la respuesta sea 200 (OK)
        expect(res.statusCode).toEqual(200);
        // Verificamos que el texto de la respuesta sea 'Hello, World!'
        expect(res.text).toBe('Hello, World!');
    });
});
