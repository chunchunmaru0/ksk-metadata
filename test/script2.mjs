import ksk from "ksk-metadata";

let urlArr = [
    'https://ksk.moe/view/9/3633ca4815bd',
   'https://ksk.moe/view/11457/abcb247997b2',
]


const kskRes = (await ksk(urlArr, 3000)) //second param is Rate Limit in ms, change it to your liking

console.log(kskRes)

/*____________________OR_____________________*/
let  kskResult = (await ksk('https://ksk.moe/view/11457/abcb247997b2')) //can just be single url


//do something with the result

console.log(JSON.stringify(kskRes)) //jsonify the output obj to jsonObj