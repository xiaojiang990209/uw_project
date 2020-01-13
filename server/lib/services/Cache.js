const NodeCache = require( "node-cache" );


const TIME_TO_LIVE = 30 * 60;
const NUM_KEYS_CLEAN = 100;
const MAX_CACHE_KEYS = 800;

class Cache {
    constructor(){
        console.log("new caching service");
        this.cache = new NodeCache({ stdTTL: TIME_TO_LIVE, checkperiod: TIME_TO_LIVE * 0.2, useClones: false })
    }

    get(key) {
        const result = this.cache.get(key);

        if (result) {
            console.log(key + " exists in cache");

            //saving the new timestamp to cache
            this.cache.set(key, {result, timestamp: new Date().getTime()});
            return result.value;
        }

        console.log(key + " does not exist");
        return 0;
    }

    save(key, value){
        /*
        saving upto 800 keys in the cache
        if exceeded remove the last 100 least used items
         */
        this.cache.set(key, {value, timestamp: new Date().getTime()});
        if(this.cache.keys().length >= MAX_CACHE_KEYS){
            this.cleanCache();
        }
    }

    cleanCache(){
        //get existing keys [] & get map for all keys
        //[['url', {data, timestamp: Date}],['url', timestamp: Date]]
        console.log("Max number of keys reached, cleaning cache...");
        const cacheList = Object.entries(this.cache.mget(this.cache.keys()));

        //sort by timestamp(min......max)
        cacheList.sort((cache1, cache2) => (cache1[1].timestamp > cache2[1].timestamp) ? 1 : -1);

        //get the keys for deletion
        const deleteKeys = cacheList.slice(0, NUM_KEYS_CLEAN).map((cacheEntry) => cacheEntry[0]);
        console.log("keys to be deleted", deleteKeys);

        this.del(deleteKeys);
    }

    getKeys(){
        return this.cache.keys();
    }

    getStats(){
       return this.cache.getStats();
    }

    del(keys) {
        this.cache.del(keys);
    }

    flush() {
        this.cache.flushAll();
    }

};

module.exports = new Cache();