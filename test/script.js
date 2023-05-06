const ksk = require('ksk-metadata')


async function test() {
    const kskRes = (await ksk('https://ksk.moe/archive/10426/i-think-im-the-only-one-getting-this-on-the-job-training'))
    //do something with res
    console.log(kskRes)
}

test();



