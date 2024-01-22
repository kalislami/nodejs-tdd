import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100, //jumlah virtual user
  duration: '5s', //range waktu hit oleh virtual user
}
export default function() {
  http.get('http://localhost:3000');
  sleep(1);
}
