const request = require('request');

const _EXTERNAL_URL = 'https://swapi.dev/api/films/';

const callSwapi = (callback: any) => {
    request(_EXTERNAL_URL, { json: true }, (err: Error, res: Request, body: Body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

module.exports.callApi = callSwapi;