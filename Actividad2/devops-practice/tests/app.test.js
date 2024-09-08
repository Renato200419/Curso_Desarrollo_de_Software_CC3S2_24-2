const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(0, done); // Esto permite al sistema asignar un puerto libre automáticamente
    });

    afterAll((done) => {
        server.close(done); // Cierra el servidor después de que las pruebas hayan terminado
    });

    it('should return Hello, World!', async () => {
        const res = await request(server).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Hello, World!');
    });
});
