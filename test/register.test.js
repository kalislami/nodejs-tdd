import supertest from "supertest";
import { createTestUser, removeTestUser } from "./util.js";
import { web } from "../src/application/web.js";

describe('POST /api/user', function () {

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/user')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/user')
            .send({
                username: '',
                password: '',
                name: ''
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already registered', async () => {
        await createTestUser();

        const result = await supertest(web)
            .post('/api/user')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if NIK is not valid', async () => {
        const result = await supertest(web)
            .post('/api/user')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test',
                nik: 'salah' //nik harus angka dan 12-16 digit
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should can register if NIK is valid', async () => {
        const result = await supertest(web)
            .post('/api/user')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test',
                nik: '1234567891123456' //nik harus angka dan 12-16 digit
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });
});