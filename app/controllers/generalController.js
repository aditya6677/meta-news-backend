var axios = require('axios')
const utils = require('../models/scrapModel');
var Parser = require('rss-parser');
const Entities = require('html-entities').AllHtmlEntities;

exports.getTrending = function(){
    return new Promise(function(resolve,reject){
        let data = ['JavaScript','Golang','Python','Java','Php','Kotlin','Golang','Ruby','SQL','C++','Swift','C#'];
        resolve(data);
    });
}

exports.getTopTech = async function(){
    let techFeed = utils.TECH_FEED;
    let feedsArr = [];
    for (var key in techFeed) {
        let feedUrl = techFeed[key];
        let parser = new Parser();
        let feed = await parser.parseURL(feedUrl);
        let temp = feed.items;
        temp = temp.slice(0,5);
        for(var i=0;i<temp.length;i++){
            const entities = new Entities();
            let str = temp[i].content;
            let formattedString = entities.decode(str);
            temp[i].content = formattedString;
            temp[i].website = key;
            feedsArr.push(temp[i]);
        }
    }
    return new Promise(function(resolve,reject){
        feedsArr ? resolve(feedsArr) : reject();
    });
    
}