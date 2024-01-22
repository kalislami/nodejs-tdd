import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 1, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
    duration: '10s', // This can be shorter or just a few iterations
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
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