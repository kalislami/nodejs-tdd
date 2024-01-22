import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 5, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
    duration: '10s', // This can be shorter or just a few iterations
    // iteration: 5,
    noVUConnectionReuse: true,
    noCookiesReset: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
};

function randomString(length, charset = '') {
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz123456789';
    let res = '';
    while (length--) res += charset[(Math.random() * charset.length) | 0];
    return res;
}

const NAME_VAL = `K6 User ${randomString(15)}`;

export default async () => {
    const url = 'http://localhost:3000/api/user/login/oauth';
    const payload = JSON.stringify({
        name: NAME_VAL,
        oauth_id: 'ini_oauth_id'
    });

    const oauthParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const oauth = await http.post(url, payload, oauthParams);

    check(oauth, {
        'oauth 200': (r) => r.status === 200,
        'oauth 400': (r) => r.status === 400,
        'oauth 500': (r) => r.status === 500,
    })

    sleep(1);
};