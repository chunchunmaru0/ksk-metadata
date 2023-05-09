const ksk = require('ksk-metadata');


async function test() {
    const kskRes = (await ksk('https://ksk.moe/view/1234/asdfasdfasdf'))
    //do something with res
    console.log(kskRes)
    //jsonify
    console.log(JSON.stringify(kskRes)) 

    //OR
    //If you want an Arrays or URL
    await (ksk([url1,url2], rate )); //url1, url2 is your ksk url and rate is Rate between those urls to access in MS
}

test();


/* Or you can do this */

const ksk = require('ksk-metadata');


(async () => {
    const kskRes = (await ksk('https://ksk.moe/view/1234/asdfasdfasdf'))
    //do something with res
    console.log(kskRes)

})();
