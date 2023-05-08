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
###
If you're using ES6 module:
```js
import ksk from "ksk-metadata";

const kskRes = (await ksk('https://ksk.moe/view/1234/asdfasdfasdf'))

console.log(kskRes)
//do something with the result 

console.log(JSON.stringify(kskRes)) //jsonify the output obj to jsonObj

```
CommonJS example:
```js
const ksk = require('ksk-metadata');

test();
async function test() {
    const kskRes = (await ksk('https://ksk.moe/view/1234/asdfasdfasdf'))
    //do something with res
    console.log(kskRes)
    //jsonify
    console.log(JSON.stringify(kskRes)) 
}


/* Or you can do this */

const ksk = require('ksk-metadata');


(async () => {
    const kskRes = (await ksk('https://ksk.moe/view/1234/asdfasdfasdf'))
    //do something with res
    console.log(kskRes)

})();

```
###
### Changes v2 -> v1
    - Works with new updated ksk website
    - Updated to new KSK Website Layout
    - Object now returns all the metadata info fro ksk gallery
    - Dates are now returned as Unix Time
    - Thumbnail details itself is returned as an object
    - Updated demo-code
    - updated example output to new format
## Example Output

```json
{
  "sucess": true,
  "title": "KSK Manga Title",
  "full_title": "[Artist] Title [Publiser]",
  "thumbnail": {
    "url": "https://ksk-thumbnail.xyz/t/12345/abcdef/789/Artist-Title-Pubisher.png",
    "title": "Cover for KSK Manga Title",
    "alt": "Cover for KSK Manga Title"
  },
  "category": "Doujinshi",
  "authors": [
    "[Artist Name]"
  ],
  "parody": "Original Work",
  "page": "49 Pages",
  "original_size": "81 MiB",
  "resampled_size": "20 MiB",
  "tags": [
    "Tag 1",
    "Tag 2",
    "Tag 3",
    "Tag 4"
  ],
  "publisher": "Publisher Name",
  "links": [
    {
      "label": "ksk.moe",
      "url": "https://ksk.moe/view/1234/asdfasdfasdf"
    },
    {
      "label": "Publisher",
      "url": "https://ksk.moe/out/asdfghjklfghjklrtyuio=="
    }
  ],
  "circle": [
    "Artist Circle"
  ],
  "magazine":"Magazine Name 2023-05",
  "uploaded_date": "1682973355",
  "archived_date": "1683376679",
  "published_date": "1683429632",
  "updated_date": "1683431315"
}
```
### Old ksk outputs

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
