const Crawler = require('crawler')

ksk('https://ksk.moe/view/9875/67efb5e74bb1')
function ksk(kskUrl) {

    var metaData;
    return new Promise((resolve, reject) => {
        const c = new Crawler({
            rateLimit: 20000,
            // This will be called for each crawled page
            callback: (error, res, done) => {
                if (error) {
                    console.log(error);
                    metaData = { 'sucess': false }
                    reject(metaData)
                } else {
                    const $ = res.$;
                    //console.dir(res.$('#metadata').html());
                    let title,fullTitle;
                    let tags = [];
                    let category, parody, magazine, toalPages, oSize, rSize, uploadedAt, archivedAt, publishedAt, updatedAt
                    let authors = [];
                    let circle = [];
                    let links=[{label:'ksk.moe', url: kskUrl}]
                    
                    let extLink, label;
                    //console.log($('#metadata').find('main >div>div >a').html())
                    let thumbnail = {
                        url :($('#cover').find('img').attr('src')),
                        title: ($('#cover').find('img').attr('title')),
                        alt: ($('#cover').find('img').attr('alt')),
                    }
                    title =   $('#metadata').find('header >h1').text()
                    fullTitle =$('#metadata').find('header >h2').text()
                    console.log(title,fullTitle)
                    console.log(thumbnail)
                    $('#metadata').find('main >div>strong').each(function (index, element) {

                        switch ($(element).text()) {
                            case 'Category':
                                $(element).parent().find('div >a').each(function (ind, el) {
                                    category = $(el).text().replace(/\n/g, '')
                                })
                                break;
                            case 'Artist':
                                $(element).parent().find('div >a').each(function (ind, el) {
                                    authors.push($(el).text().replace(/\n/g, '').replace(/\d.+/g, ''))
                                })
                                break;
                            case 'Circle':
                                $(element).parent().find('div >a').each(function (ind, el) {
                                    circle.push($(el).text().replace(/\n/g, '').replace(/\d.+/g, ''))
                                })
                                break;
                            case 'Parody':
                                $(element).parent().find('div >a').each(function (ind, el) {
                                    parody = ($(el).text()).replace(/\n/g, '').replace(/\d.+/g, '')
                                })
                                break;
                            case 'Magazine':
                                $(element).parent().find('div >a').each(function (ind, el) {
                                    magazine = ($(el).text()).replace(/\n/g, '').replace(/\d.+/g, '')
                                })
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
                                    extLink = `https://ksk.moe/${$(el).attr('href')}`
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
                        "authors": authors,
                        //"circle":circle,
                        "tags": tags,
                        'publisher': label,
                        "links": links,
                        //"created_date": date,
                        //"published_date": pubDate
                    }
                    if(circle != undefined || circle != ''){
                        metaData['circle'] = circle
                    }
                    console.log(metaData)
                    done();
                    resolve(metaData);

                }

            }
        });

        c.queue(kskUrl);

    });

}
