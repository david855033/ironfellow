import request from 'request'
import * as cookie from './cookie.js'
import { defaulRequestOption } from "./server.js";

export function signInAsync(account, password) {
    let option = new defaulRequestOption();
    option.url = "https://web9.vghtpe.gov.tw/Signon/lockaccount";
    option.method = "POST";
    option.form = { j_username: account, j_password: password };

    return new Promise((resolve, reject) => {
        request(option, function (error, response, body) {
            cookie.storeFromArray(response.headers['set-cookie']);
            resolve();
        });
    });
}
