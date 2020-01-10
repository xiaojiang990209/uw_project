const cache = require('../services/Cache');

const cacheChecking = (req, res, next) => {
    console.log("in cache checking service, key=", req.originalUrl);
    const result = cache.get(req.originalUrl);
    if(result){
        res.json(result);
    }else{
        res.response = res.json;
        res.json = (data) => {
            cache.save(req.originalUrl, data);
            cache.getStats();
            res.response(data);
        };
        next();
    }

};

module.exports = {
    cacheChecking,
};