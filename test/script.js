const ksk = require('ksk-metadata');


async function test() {
    const kskRes = (await ksk('https://ksk.moe/view/1234/asdfasdfasdf'))
    //do something with res
    console.log(kskRes)
    //jsonify
    console.log(JSON.stringify(kskRes)) 
}

test();


/* Or you can do this */

const ksk = require('ksk-metadata');


(async () => {
    const kskRes = (await ksk('https://ksk.moe/view/1234/asdfasdfasdf'))
    //do something with res
    console.log(kskRes)

})();
