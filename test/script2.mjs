import ksk from "ksk-metadata";

const kskRes = (await ksk('https://ksk.moe/view/11463/0617459162d3'))

console.log(kskRes)
//do something with the result 

console.log(JSON.stringify(kskRes)) //jsonify the output obj to jsonObj