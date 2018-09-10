import request from 'request'
import * as cookie from './cookie.js'
import { parseQuery } from './parse-query'

export class defaulRequestOption {
    constructor() {
        this.url = "https://web9.vghtpe.gov.tw/";
        this.rejectUnauthorized = false;
        this.headers = {
            "Connection": "keep-alive",
            "Cache-Control": "max-age=0",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4"
        };
    }
}

export function requestAsync(query, passResult) {
    return new Promise((resolve, reject) => {
        var serverRequest = parseQuery(query);

        var option = new defaulRequestOption();
        option.headers = {
            'Cookie': cookie.getCookieString()
        }
        option.url = serverRequest.url
        serverRequest.method && (option.method = serverRequest.method)
        serverRequest.form && (option.form = serverRequest.form)
        serverRequest.body && (option.body = serverRequest.body)

        request(option, function (error, response, body) {
            cookie.storeFromArray(response.headers['set-cookie']);
            passResult || (passResult = {});
            passResult.value = body;
            passResult.query = query;
            //serverRequest.parser && (passResult.parsed = parser[serverRequest.parser](passResult.value));
            resolve(passResult);
        });
    })

}

