import ksk from "ksk-metadata";

let urlArr = ['https://ksk.moe/view/9/3633ca4815bd','https://ksk.moe/view/11467/b1a36dc6d714','https://ksk.moe/view/11463/0617459162d3','https://ksk.moe/view/11457/abcb247997b2']
const kskRes = (await ksk(urlArr,3000))

console.log(kskRes)

//do something with the result 

//console.log(JSON.stringify(kskRes)) //jsonify the output obj to jsonObj