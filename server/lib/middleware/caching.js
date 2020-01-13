const cache = require('../services/Cache');

const cacheChecking = (req, res, next) => {
    console.log("/////////////////CACHING SERVICE////////////////////");
    console.log("in cache checking service, key=", req.originalUrl);
    const result = cache.get(req.originalUrl);

    if(result){
        res.json(result);
        console.log(cache.getStats());
    }else{
        res.response = res.json;
        res.json = (data) => {
            cache.save(req.originalUrl, data);
            res.response(data);
        };
        console.log(cache.getStats());
        next();
    }

};

module.exports = {
    cacheChecking,
};