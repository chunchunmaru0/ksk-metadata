const Crawler = require('crawler')

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
                    //console.dir(list);
                    let title = res.$('#metadata').children('h1').text();
                    if (title == undefined || title == '') {
                        metaData = { 'sucess': false }
                        reject(metaData)
                        return
                    }
                    let full_title = res.$('#metadata').children('h2').text();

                    var list = [];

                    $('#metadata').find('div >div >a').each(function (index, element) {
                        list.push($(element).attr('title'));
                    });

                    let authors = [];
                    let tags = [];
                    var link = '';
                    var links = [];
                    var publisher = '';
                    var unixDate = '';
                    list.forEach(el => {
                        if (el == undefined) {
                            return; 
                        }
                        if (el.includes('Artist')) { //for Artist
                            var artist = (el.replace('Artist: ', ''))
                            authors.push({
                                "name": artist,
                                "role": "Artist"
                            })
                        }
                        if (el.includes('Circle')) { //for Circle 
                            var circle = (el.replace('Circle: ', ''))
                            authors.push({
                                "name": circle,
                                "role": "Circle"
                            })
                        }

                        if (el.includes('Tag')) {
                            var tag = (el.replace('Tag: ', ''))
                            tags.push(tag);

                        }
                    });
                    links.push({
                        "label": 'ksk.moe',
                        "url": kskUrl
                    })
                    res.$('#metadata .l').last().find('a').each(function (index, element) {
                        //console.log($(element).attr('title'));
                        if ($(element).attr('title') == undefined) {
                            publisher = ($(element).text().replace(/\n/g, ''))
                            link = ($(element).attr('href'));
                            links.push({
                                "label": publisher,
                                "url": link
                            })
                        } else if (($(element).attr('title').includes('Page'))) {
                            //no publisher it's page
                        } else {
                            publisher = ($(element).text().replace(/\n/g, ''))
                            link = ($(element).attr('href'));
                            links.push({
                                "label": publisher,
                                "url": link
                            })
                        }
                        //console.log($(element).attr('href'))



                    });
                    let date, pubDate, imgUrl;
                    res.$('#metadata .createdAt').each((index, element) => {
                        unixDate = ($(element).attr('data-timestamp'))
                        date = new Date(unixDate * 1000);
                        //console.log(date.toLocaleDateString("default"));
                    });
                    res.$('#metadata .publishedAt').each((index, element) => {
                        unixDate = ($(element).attr('data-timestamp'))
                        pubDate = new Date(unixDate * 1000);
                        //console.log(date.toLocaleDateString("default"));
                    });
                    res.$('.wrapper').find('img').each((index, element) => {
                        imgUrl = ($(element).attr('src'))
                    });
                    metaData = {
                        "sucess": true,
                        "title": title,
                        'full_title': full_title,
                        'thumbnail': imgUrl,
                        "authors": authors,
                        "tags": tags,
                        'publisher': publisher,
                        "links": links,
                        "created_date": date,
                        "published_date": pubDate
                    }
                }

                done();
                resolve(metaData);

            }
        });
        c.queue(kskUrl);

    });

}
module.exports = ksk;