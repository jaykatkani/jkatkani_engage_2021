const redisClient = require("./config/redis");

exports.saveCallId = (key, value) => {
    return new Promise((resolve, reject) => {
        // A redis function to take key in stringify manner and delete it after 1 day, i.e. 86400 secs
        redisClient.SET(key, JSON.stringify(value), "EX", 86400, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

exports.getCallId = (key) => {
    return new Promise((resolve, reject) => {
        // A redis function to get key
        redisClient.GET(key, (err, res) => {
            if (err) {
                reject(err);
            }
            // because out key is in stringify therefore we will parse it
            resolve(JSON.parse(res));
        });
    });
};

