import { validate } from "../validation/validation.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    registerOauthValidation
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString()
    return prismaClient.user.update({
        data: {
            token: token,
            last_login: new Date()
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}

const oauth = async (request) => {
    const loginRequest = validate(registerOauthValidation, request);
    const validOauthId = loginRequest.oauth_id === process.env.OAUTH_ID
    if (!validOauthId) {
        throw new ResponseError(403, "Unauthorized");
    }
    delete loginRequest.oauth_id

    const newDate = new Date()
    let loginfo = `time => ${newDate.getSeconds()}:${newDate.getMilliseconds()}, login oauth: ${loginRequest.name}`

    let user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true
        }
    });

    if (!user) {
        loginRequest.password = 'oauth';

        user = await prismaClient.user.create({
            data: loginRequest,
            select: {
                username: true
            }
        });

        const newDate = new Date()
        loginfo = `time => ${newDate.getSeconds()}:${newDate.getMilliseconds()}, register and login oauth: ${loginRequest.name}`
    }

    console.log(loginfo);

    const token = uuid().toString()
    return await prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}

const logout = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

const remove = async (request) => {
    return await prismaClient.user.delete({
        where: {
            username: request.username
        }
    })
}

const removeAll = async () => {
    return await prismaClient.user.deleteMany({where: {}})
}

export default {
    register,
    login,
    oauth,
    logout,
    remove,
    removeAll
}