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
                    var mdData = [];
                    var mdTitle = []
                    let testArr=[];
                    let dataTest=[];
                    let newTagsArr = [];
                    //console.log($('#metadata').find('main >div>div >a').html())
                    $('#metadata').find('main >div>strong').each(function (index, element) {

                        switch ($(element).text()) {
                            case 'Metadata':
                                console.log("There is Metadata in here")
                                $(element).parent().find('div >a').each(function (ind, el) {
                                    //console.log($(el).attr('href'))
                                    mdData.push($(el).attr('href'))
                                    dataTest[index]=$(el).attr('href')
                                })
                                break;
                        
                            default:
                                break;
                        }
                        //console.log($(element).text());
                        mdTitle.push($(element).text());
                        testArr[index] = $(element).text();
                        // if ($(element).text() == 'Tag') {
                        //     $(element).parent().find('div >a').each(function (ind, el) {
                        //     newTagsArr.push(mdData.push($(el).text()))
                        //     })
                        //     dataTest[index] = newTagsArr;
                        // }
                        if ($(element).text() == 'Metadata') {
                            $(element).parent().find('div >a').each(function (ind, el) {
                                //console.log($(el).attr('href'))
                                mdData.push($(el).attr('href'))
                                dataTest[index]=$(el).attr('href')
                            })
                        }
                        if (
                            $(element).text() == 'Size (Ori.)' ||
                            $(element).text() == 'Size (Res.)'
                        ) {

                            let el = $(element).parent().find('div >div >span').html();
                            console.log(el)
                            mdData.push(el)
                            dataTest[index]= el

                        }
                        if (
                            $(element).text() == 'Uploaded' ||
                            $(element).text() == 'Archived' ||
                            $(element).text() == 'Published' ||
                            $(element).text() == 'Updated'
                            ) {
                                console.log($(element).parent().find('div >time').attr('data-timestamp'))
                                dataTest[index]= $(element).parent().find('div >time').attr('data-timestamp')
                        }
                        if (
                            $(element).text() == 'Tag'){
                                $(element).parent().find('div >a').each(function (ind, el) {
                                   //console.log("Tags:", )
                                   let junkTags = ($(el).text())
                                   junkTags = junkTags.replace(/\n/g, '')
                                   let tags = junkTags.replace(/\d.+/g, '')
                                   newTagsArr.push(tags)
                                })
                            }

                        $(element).parent().find('div >a').each(function (ind, el) {
                            mdData.push($(el).text())
                            dataTest[index]=$(el).text()
                        })
                    });

                    console.log(mdTitle, mdData)
                    // for (let i =0)
                    console.log("Test,", testArr,dataTest, "Tags:", newTagsArr)
                    return
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
//module.exports = ksk;