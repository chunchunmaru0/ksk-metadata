import {ksk} from 'ksk-metadata'

try {
   
    const kskResult = await ksk('https://ksk.moe/archive/10426/i-think-im-the-only-one-getting-this-on-the-job-training')
    console.log(kskResult);

} catch (error) {
    console.log(error)
    
}


//do something with result
