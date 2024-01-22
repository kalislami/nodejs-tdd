import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
    duration: '1m', // This can be shorter or just a few iterations
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
};

export default () => {
    const url = 'http://localhost:3000/api/user';
    const payload = JSON.stringify({
        username: 'kamalk6',
        password: 'kamalk6'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'is status 400': (r) => r.status === 400,
        'is status 500': (r) => r.status === 500,
    })
    sleep(1);
};