import supertest from "supertest";
import { createTestUser, removeTestUser } from "./util";
import { web } from "../src/application/web.js";

describe('POST /api/user/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/user/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/user/login')
            .send({
                username: "",
                password: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/user/login')
            .send({
                username: "test",
                password: "salah"
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/user/login')
            .send({
                username: "salah",
                password: "rahasia"
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});