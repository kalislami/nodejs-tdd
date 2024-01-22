import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    // Key configurations for avg load test in this section
    stages: [
        { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
        { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
};

export default () => {
    const url = 'http://localhost:3000/api/user/login';
    const payload = JSON.stringify({
        username: 'kamal',
        password: 'kamal'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    // const res = http.get('http://localhost:3000');

    check(res, {
        'is status 200': (r) => r.status === 200,
        // 'is status 401': (r) => r.status === 401,
        'is status 500': (r) => r.status === 500,
    })
    sleep(1);
};
