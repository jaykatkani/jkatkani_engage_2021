
// what and why redis?
// We used redis-server to store the data, the main reason to use it was as follows :-
// 1. it uses hash data structure to store the data. Therefore speed is phenomenal
// 2. support of additional datatypes and persistence


// i am using it to store the peer code...
// so let say one user initiate a call and waits for the other user.....
// Inbetween i dont want to loose that connection code, so i am storing it to redis



 let redis = require("redis"),
    // client = redis.createClient({
    //     host: 'redis-17376.c251.east-us-mz.azure.cloud.redislabs.com',
    //     port: 17376,
    //     password: '3dFEsVgtKx4HuOOBbq2xFdf9WHN7nwV7'
    // });                                                                    // if deployed

client = redis.createClient();                                           // if run locally


client.on("error", (error) => {
    console.log(error);
});

module.exports = client;