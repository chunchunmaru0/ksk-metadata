const Crawler = require('crawler');
const getMetaData = require('./getMD');
var metaData;



async function ksk(kskUrls,rate) {
    if(rate === undefined){ //rate must be a number
        rate =0;
    }
    return new Promise((resolve, reject) => {
        const results = [];
        const c = new Crawler({
          rateLimit: rate,
          callback: (error, res, done) => {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              
              if(!Array.isArray(kskUrls)){ //if url not arr then just resolve it
                resolve(getMetaData(res));
                return
              }
              //else create array elem for each obj
              results.push(getMetaData(res));
              if (results.length === kskUrls.length) {
                resolve(results);
              }
            }
            done();
          },
        });
        if(!Array.isArray(kskUrls)){
            c.queue(kskUrls)
            
            
        }else{
            kskUrls.forEach(url => c.queue(url));
        }

      });
}


module.exports = ksk;