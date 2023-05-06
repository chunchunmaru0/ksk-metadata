README.md
# KSK-Metadata Scraper
## SCRAPE THE METADATA FROM KSK.MOE

#
#

Use this KSK-MEtadata Scraper to scrape the metadata from the ksk.moe


## USAGE

Returns an object containing all the metadata info
```js
import {ksk} from 'ksk-metadata'

    const kskResult = await ksk('https://ksk.moe/archive/10426/i-think-im-the-only-one-getting-this-on-the-job-training')

    //do something with the result
    console.log(kskResult);

```

