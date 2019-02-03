var scrapUtils = require('../models/scrapModel');
var Parser = require('rss-parser');

exports.getFormattedData = async function(langName){
    let obj = scrapUtils.LANG_FEED;
    let data = [];
    for(let key in obj){
        let webSite = key;
        let webUrl = obj[key];
        let feedUrl = webUrl.replace('${langName}',langName);
        let parser = new Parser();
        let feed = await parser.parseURL(feedUrl);
        let topFive = feed.items.slice(0,5);
        topFive.forEach(element => {
            let webTemp = webSite; 
            if(webSite == 'Google'){
                let n = element.title.lastIndexOf('-');
                if(n > -1)
                    webTemp = element.title.substring(n + 1);
                
                let matches = [];
                let html = element.content;
                html.replace(/<p>(.*?)<\/p>/g, function () {
                    matches.push(arguments[1]);
                });
                console.log(matches[0]);
                element.content = matches[0];
            }
            else if(webSite == 'Medium'){
                let cont = element.contentSnippet;
                cont = cont.replace('Continue reading on Medium','');
                element.content = cont;
            }
            element.website = webTemp;
            data.push(element);
        });
    }
    let pro = data ? Promise.resolve(data) : Promise.reject();
    return pro;
};