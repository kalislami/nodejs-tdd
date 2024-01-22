import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    console.log('register dengan: ' + JSON.stringify(req.body));
    try {
        req.body.user_type = 'default';
        const result = await userService.register(req.body);
        console.log(result);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    console.log('login dengan: ' + JSON.stringify(req.body));
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const oauth = async (req, res, next) => {
    try {
        req.body.username = req.body.name.replace(' ', '').toLowerCase()
        req.body.user_type = 'oauth';
        const result = await userService.oauth(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        const newDate = new Date()
        console.log(`time => ${newDate.getSeconds()}:${newDate.getMilliseconds()}, failed oauth: ${JSON.stringify(req.body)}`);
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.username);
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        await userService.remove(req.body);
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const removeAll = async (_, res, next) => {
    try {
        await userService.removeAll();
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    oauth,
    logout,
    remove,
    removeAll
}