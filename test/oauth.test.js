import supertest from "supertest";
import { removeTestUser } from "./util";
import { web } from "../src/application/web.js";

describe('POST /api/user/login/oauth', function () {
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login / register oauth', async () => {
        const result = await supertest(web)
            .post('/api/user/login/oauth')
            .send({
                name: "test",
                oauth_id: "ini_oauth_id"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/user/login/oauth')
            .send({
                name: "",
                oauth_id: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject oauth if oauth_id is wrong', async () => {
        const result = await supertest(web)
            .post('/api/user/login/oauth')
            .send({
                name: "test",
                oauth_id: "salah"
            });

        expect(result.status).toBe(403);
        expect(result.body.errors).toBeDefined();
    });
});