const request = require('supertest');
const { app, server } = require('../src/app');  

describe('GET /', () => {
    afterAll(() => {
        server.close();  // Cierra el servidor después de completar las pruebas
    });

    it('should return Hello, World!', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Hello, World!');
    });
});
