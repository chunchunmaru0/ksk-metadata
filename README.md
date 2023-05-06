README.md
# KSK-Metadata Scraper
## SCRAPE THE METADATA FROM KSK.MOE

#

Use this KSK-Metadata Scraper to scrape the metadata from the ksk.moe

## Install
```
npm i ksk-metadata
```

## USAGE

Returns an object containing all the metadata info
If you're using ES6 module:
```js
import {ksk} from 'ksk-metadata'

    const kskResult = await ksk('https://ksk.moe/archive/10426/i-think-im-the-only-one-getting-this-on-the-job-training')

    //do something with the result
    console.log(kskResult);

```
CommonJS example:
```js
const ksk = require('ksk-metadata')


async function test() {
    const kskRes = (await ksk('https://ksk.moe/archive/10426/i-think-im-the-only-one-getting-this-on-the-job-training'))
    //do something with res
    console.log(kskRes)
}

test();
```
###
## Example Output
```json
{
    "sucess": true,
    "title": "KSK Manga Title",
    "full_title": "[Artist] Title",
    "thumbnail": "https://ksk-thumbnail.url/896.webp",
    "authors": [
      { "name": "name", "role": "Artist" }
    ],
    "tags": [
      "Tag 1",
      "Tag 2",
      "Tag 3",
      "Tag 4",
    ],
    "publisher": "Publisher Name",
    "links": [
      {
        "label": "'ksk.moe'",
        "url": "https://ksk.moe/archive/12345/some-url"
      }
    ],
    "created_date": "2022-12-30T17:00:00.000Z",
    "published_date": "2023-03-19T16:55:01.000Z"
  }
```
