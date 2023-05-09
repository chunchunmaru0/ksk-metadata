const Crawler = require('crawler')
var metaData;



async function ksk(kskUrls,rate) {
    if(rate == undefined){ //rate must be a number
        rate =0;
    }
    return new Promise((resolve, reject) => {
        const results = [];
        const c = new Crawler({
          rateLimit: rate,
          callback: (error, res, done) => {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              
              if(!Array.isArray(kskUrls)){ //if url not arr then just resolve it
                resolve(getMetaData(res));
                return
              }
              //else create array elem for each obj
              results.push(getMetaData(res));
              if (results.length === kskUrls.length) {
                resolve(results);
              }
            }
            done();
          },
        });
        if(!Array.isArray(kskUrls)){
            c.queue(kskUrls)
            
            
        }else{
            kskUrls.forEach(url => c.queue(url));
        }

      });
}

function getMetaData(res){
    {
        const $ = res.$;
        //console.dir(res.$('#metadata').html());
        console.log("Scraping: ",res.request.uri.href)
        let title,fullTitle;
        let tags = [];
        let category, parody, magazine, toalPages, oSize, rSize, uploadedAt, archivedAt, publishedAt, updatedAt
        let authors = [];
        let circle = [];
        let links=[{label:'ksk.moe', url: res.request.uri.href}]
        
        let extLink, label;
        //console.log($('#metadata').find('main >div>div >a').html())
        let thumbnail = {
            url :($('#cover').find('img').attr('src')),
            title: ($('#cover').find('img').attr('title')),
            alt: ($('#cover').find('img').attr('alt')),
        }
        title =   $('#metadata').find('header >h1').text()
        fullTitle =$('#metadata').find('header >h2').text()

        if(title == ''){ metaData = { 'sucess': false }; console.log('Something went wrong! Most Probably you entered wrong URL! Error Url: ', res.request.uri.href); return(metaData); }
        //console.log(title,fullTitle)
        //console.log(thumbnail)
        $('#metadata').find('main >div>strong').each(function (index, element) {

            switch ($(element).text()) {
                case 'Category':
                    $(element).parent().find('div >a').each(function (ind, el) {
                        category = $(el).text().replace(/\n/g, '')
                    })
                    break;
                case 'Artist':
                    $(element).parent().find('div >a').each(function (ind, el) {
                        let junkAuthors = $(el).text().replace(/\n/g, '')
                        authors.push(junkAuthors.replace(/\d+/g, ''))
                    })
                    break;
                case 'Circle':
                    $(element).parent().find('div >a').each(function (ind, el) {
                        let junkCircle = $(el).text().replace(/\n/g, '')
                        circle.push(junkCircle.replace(/\d+/g, ''))
                    })
                    break;
                case 'Parody':
                        parody = $(element).parent().find('span').html();
                    break;
                case 'Magazine':
                    
                        magazine = $(element).parent().find('span').html()
                        //magazine = junkMagazine.replace(/\d+/g, '')
                        //console.log(magazine)

                    break;
                case 'Tag':
                    $(element).parent().find('div >a').each(function (ind, el) {
                        //console.log("Tags:", )
                        let junkTags = ($(el).text())
                        junkTags = junkTags.replace(/\n/g, '')
                        let tag = junkTags.replace(/\d.+/g, '')
                        tags.push(tag)
                    })
                    break;
                case 'Length':
                    $(element).parent().find('div >a').each(function (ind, el) {
                        toalPages = ($(el).text()).replace(/\n/g, '')
                    })
                    break;
                case 'Metadata':
                    $(element).parent().find('div >a').each(function (ind, el) {
                        //console.log($(el).attr('href'))
                        label = $(el).text(),
                        extLink = `https://ksk.moe${$(el).attr('href')}`
                        links.push({
                            label: label,
                            url: extLink
                        })

                    })
                    break;
                case 'Size (Ori.)':
                    oSize = $(element).parent().find('div >div >span').html();
                    break;
                case 'Size (Res.)':
                    rSize = $(element).parent().find('div >div >span').html();
                    break;
                case 'Uploaded':
                    uploadedAt = $(element).parent().find('div >time').attr('data-timestamp')
                    break;
                case 'Archived':
                    archivedAt = $(element).parent().find('div >time').attr('data-timestamp')
                    break;
                case 'Published':
                    publishedAt = $(element).parent().find('div >time').attr('data-timestamp')
                    break;
                case 'Updated':
                    updatedAt = $(element).parent().find('div >time').attr('data-timestamp')
                    break;
                default:
                    break;
            }


        })

        metaData = {
            "sucess": true,
            "title": title,
            'full_title': fullTitle,
            'thumbnail': thumbnail,
            "category":category,
            "authors": authors,
            "parody":parody,                       
            "page":toalPages,
            "original_size":oSize,
            "resampled_size":rSize,                    
            "tags": tags,
            'publisher': label,
            "links": links,


        }
        if(circle.length != 0){
            metaData['circle'] = circle
        }
        
        if(magazine != undefined){
            metaData['magazine'] = magazine
        }
        dateMd ={
            "uploaded_date": uploadedAt,
            "archived_date":archivedAt,                        
            "published_date": publishedAt,
            "updated_date":updatedAt,
        }
        //adding dates to the last
        Object.entries(dateMd).forEach(([k,v]) => {metaData[k] = v})
        //console.log(metaData)
        //console.log(magazine,circle)
        
        return (metaData);

    }
}
module.exports = ksk;