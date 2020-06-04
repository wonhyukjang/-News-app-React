const express = require("express");
const app = express();
const port = 5000;
var request = require("request");
const cors = require('cors');

app.use(cors())
function validNY(temp) {
    if(temp == null) {
        return false;
    }
    if(temp.multimedia == null || temp.multimedia.length == 0) {
        return false
    }
    if(temp.published_date == null || temp.published_date.length == 0) {
        return false
    }
    if(temp.abstract == null || temp.abstract.length == 0) {
        return false
    }
    if(temp.title == null || temp.title.length == 0) {
        return false
    }
    // if(temp.section == null || temp.section.length == 0 || temp.section == "") {
    //     return false
    // } 
    return true
}
function makeData(temp, mode) {
    let store = []
    if(mode == 'ny') {
        for (let i = 0, l = temp.docs.length; i < l; i++) {
            var ind = {}
            ind['id'] = temp.docs[i]._id
            ind['titles'] = temp.docs[i].headline.main
            if(temp.docs[i].pub_date) {
                tmp = temp.docs[i].pub_date.split('-')
                rep = tmp[0] + "-" + tmp[1] + "-" + tmp[2].substring(0,2)
                ind['date'] = rep
            }
            changeFlag = 1
            for(let j = 0; j < temp.docs[i].multimedia.length; j++) {
                if (temp.docs[i].multimedia[j].width >= 2000) {
                    ind['img'] = "https://static01.nyt.com/" + temp.docs[i].multimedia[j].url
                    changeFlag = 0
                    break
                    // temp[i].multimedia[0].width = 0
                    // temp[i]['change'] = 1
                    // temp[i].multimedia[0].url = 'Nytimes_hq.jpg'
                } else {
                    continue
                    // temp[i]['change'] = 0
                }
            }

            if (changeFlag == 1) {
                ind['img'] = 'Nytimes_hq.jpg';
            } 
            if(temp.docs[i].news_desk == null || temp.docs[i].news_desk.length == 0) {
                continue
            }
            if(temp.docs[i].news_desk) {
                if(temp.docs[i].news_desk.toLowerCase() === 'sport') {
                    ind['section'] = 'Sports'
                } else {
                    ind['section'] = temp.docs[i].news_desk
                }
            } else {
                ind['section'] = ""
            }
            // ind['section'] = temp.docs[i].news_desk? temp.docs[i].news_desk: ""
            ind['desc'] = temp.docs[i].abstract
            ind['source'] = 'NY'
            ind['direct'] = temp.docs[i].web_url
            store.push(ind)
        }
    } else {
        for (let i = 0, l = temp.length; i < l; i++) {
            var ind = {}
            ind['id'] = temp[i].id
            ind['titles'] = temp[i].webTitle
            ind['date'] = temp[i].webPublicationDate
            ind['img'] = temp[i].bigUrl

            if(temp[i].sectionId) {
                if(temp[i].sectionId.toLowerCase() === 'sport') {
                    ind['section'] = 'Sports'
                } else {
                    ind['section'] = temp[i].sectionId
                }
            } else {
                ind['section'] = ""
            }

            // ind['section'] = temp[i].sectionId ? temp[i].sectionId: ""
            ind['desc'] = temp[i].blocks.body[0].bodyTextSummary
            ind['shortDesc'] = temp[i].short_desc
            ind['source'] = 'Guardians'   
            ind['direct'] = temp[i].webUrl
 
            store.push(ind)                    
        } 
    }
    // ix = 0
    // while(ix < store.length) {
    //     if(store[ix].section == 'None') {
    //         store.slice(ix,1)
    //     } else {
    //         ix++
    //     }
    // }
    // for(let i = 0; i < store.length; i++) {
    //     if(store[i] == "None") {

    //     }
    // }
    return store
}
function add3Dots(string){
    var dots = "...";
    returnIdx = 0
    for(var i = 0; i < string.length; i++) {
      if (string[i] == ' ') {
          if(i + 4 < 430) {
            returnIdx = i;
          }
          else {
            return string.substring(0, returnIdx) + '...'
          }
      }    
    }
    return string + "..."
  }
  function add3DotsDesc(string){
    var dots = "...";
    returnIdx = 0
    counter = 0
    for(var i = 0; i < string.length; i++) {
      if (string[i] == '.' && string[i+1] == ' ') {
          counter += 1
          if(counter == 4) {
            returnIdx = i;
            break
          }
          else {
              continue
          }
      }    
    }
    if(counter < 4) {
        return string
    } else {
        return string.substring(0, returnIdx) + '...'
    }
  }

  function addSpaceDesc(string){
    returnIdx = 0
    counter = 0
    for(var i = 0; i < string.length; i++) {
      if (string[i] == '.' && string[i+1] == ' ') {
          counter += 1
          if(counter == 4) {
            returnIdx = i;
            break
          }
          else {
              continue
          }
      }    
    }
    if(counter < 4) {
        return ""
    } else {
        return string.substring(returnIdx+1, string.length)
    }
  }
function validGuardian(temp) {
    console.log(temp)
//     if(temp.blocks == null || temp.blocks.length == 0) {
//         return false
//     } else {
//         if(temp.blocks.main == null || temp.blocks.main.length == 0) {
//             return false
//         } else {
//             if(temp.blocks.main.elements == null || temp.blocks.main.elements.length == 0) {
//                 return false
//             } else {
//                 if(temp.blocks.main.elements[0] == null || temp.blocks.main.elements[0].length == 0) {
//                     return false
//                 } else{
//                     if(temp.blocks.main.elements[0].assets == null || temp.blocks.main.elements[0].assets.length == 0) {
//                         return false
//                     } else {
//                         if(temp.blocks.main.elements[0].assets[temp.blocks.main.elements[0].assets.length - 1] == null ||
// temp.blocks.main.elements[0].assets[temp.blocks.main.elements[0].assets.length - 1].length == 0) {
//                                 return false
//                             }
//                     }

//                 }
//             }
//         }
//     }
    if(temp.webPublicationDate == null || temp.webPublicationDate.length == 0) {
        return false
    }
    if(temp.blocks == null || temp.blocks.length == 0) {
        return false
    } else {
        if(temp.blocks.body == null || temp.blocks.body.length == 0) {
            return false
        } else {
            if(temp.blocks.body[0] == null || temp.blocks.body[0].length == 0) {
                return false
            } else {
                if(temp.blocks.body[0].bodyTextSummary == null || temp.blocks.body[0].bodyTextSummary.length == 0) {
                    return false
                }                
            }
        }
    }
    if(temp.webTitle == null || temp.webTitle.length == 0) {
        return false
    }
    if(temp.sectionId == null || temp.sectionId.length == 0) {
        return false
    } 
    return true
}

function cleaning(temp) {
    for(var i = 0; i < temp.length; i++) {
        flag = 0
        if(validNY(temp[i])) {
            temp[i].id = i;
            temp[i]['source'] = 'NY'   

            if(temp[i].multimedia) {
                changeFlag = 1
                for(var j = 0; j < temp[i].multimedia.length; j++) {
                    if (temp[i].multimedia[j].width >= 2000) {
                        temp[i]['bigUrl'] = temp[i].multimedia[j].url
                        changeFlag = 0
                        break
                        // temp[i].multimedia[0].width = 0
                        // temp[i]['change'] = 1
                        // temp[i].multimedia[0].url = 'Nytimes_hq.jpg'
                    } else {
                        continue
                        // temp[i]['change'] = 0
                    }
                }
                if (changeFlag == 1) {
                    temp[i]['bigUrl'] = 'Nytimes_hq.jpg';
                } 
            } else {
                temp[i]['bigUrl'] = 'Nytimes_hq.jpg';
            }
            if(temp[i].published_date) {
                tmp = temp[i].published_date.split('-')
                rep = tmp[0] + "-" + tmp[1] + "-" + tmp[2].substring(0,2)
                temp[i].published_date = rep
            }
            if(temp[i].section == null || temp[i].section.length == 0)
                temp[i]= "";
                
            // const arr = ['world', 'politics', 'business','technology','sports'];
            //     for(var q = 0; q < arr.length; q++) {
            //         if (temp[i].section == arr[q] || temp[i].subsection == arr[q]) {
            //             temp[i].sectionFinal = arr[q]
            //             flag = 1
            //             break
            //         } else {
            //             temp[i].sectionFinal = arr[q]
            //         }
            //     }
            
        } 
        else {
            delete temp[i];
        }
    }
}

function cleaningGuardian(temp) {
    console.log(temp)
    for(var i = 0; i < temp.length; i++) {
        flag = 0
        if(validGuardian(temp[i])) {
            try {
                if(temp[i].blocks.main.elements[0].assets[temp[i].blocks.main.elements[0].assets.length - 1].file) {
                    temp[i]['bigUrl'] = temp[i].blocks.main.elements[0].assets[temp[i].blocks.main.elements[0].assets.length - 1].file
                } else {
                    temp[i]['bigUrl'] = 'Guardians_hq.png'
                } 
            } catch {
                temp[i]['bigUrl'] = 'Guardians_hq.png'
            }
            temp[i]['source'] = 'Guardians'   

            if(temp[i].webPublicationDate) {
                tmp = temp[i].webPublicationDate.split('-')
                rep = tmp[0] + "-" + tmp[1] + "-" + tmp[2].substring(0,2)
                temp[i].webPublicationDate = rep
            }
            if(temp[i].blocks.body[0].bodyTextSummary) {
                temp[i].blocks.body[0].bodyTextSummary = temp[i].blocks.body[0].bodyTextSummary
            }
            // const arr = ['world', 'politics', 'business','technology','sport'];
            //     for(var q = 0; q < arr.length; q++) {
            //         if (temp[i].sectionId == arr[q]) {
            //             temp[i].sectionId = arr[q]
            //             flag = 1
            //             break
            //         } else {
            //             continue
            //         }
            //     }
            //     if(flag == 0)
            //         temp[i].section = 'Health'
            //     else {
                    if(temp[i].sectionId == 'sport') {
                        temp[i].section = 'sports'
                    } else {
                        temp[i].section = temp[i].sectionId
                    }
                // }
        } 
        else {
            delete temp[i];
        }
    }
    temp.filter(function(a){return typeof a !== 'null';})

}

app.get("/", (req, res) => res.send("Hello world"))
app.get("/endpoint", (req, res) => res.send("This is my new endpoint"))

app.get("/weatherNY", (req, res) => {
    request("http://api.weatherstack.com/current?access_key=9da49d85fda805b6e67450071dfc906d&query=New%20York",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp_c = parsedBody['current']['temperature']
                    res.send({temp_c})

                }
            }
    )
})
app.get("/NY_Home", (req, res) => {
    request("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['results']
                    cleaning(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/NY_World", (req, res) => {
    request("https://api.nytimes.com/svc/topstories/v2/world.json?api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['results']
                    cleaning(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})                    
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/NY_Politics", (req, res) => {
    request("https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['results']
                    cleaning(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/NY_Business", (req, res) => {
    request("https://api.nytimes.com/svc/topstories/v2/business.json?api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['results']
                    cleaning(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/NY_Technology", (req, res) => {
    request("https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['results']
                    cleaning(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/NY_Sports", (req, res) => {
    request("https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['results']
                    cleaning(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/Guardian_Home", (req, res) => {
    request("https://content.guardianapis.com/search?api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&section=(sport|business|technology|politics)&show-blocks=all&page-size=100",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['response']['results']
                    cleaningGuardian(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})
app.get("/Guardian_World", (req, res) => {
    request("https://content.guardianapis.com/world?api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&show-blocks=all&page-size=100",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['response']['results']
                    cleaningGuardian(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/Guardian_Politics", (req, res) => {
    request("https://content.guardianapis.com/politics?api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&show-blocks=all&page-size=100",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['response']['results']
                    cleaningGuardian(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/Guardian_Business", (req, res) => {
    request("https://content.guardianapis.com/business?api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&show-blocks=all&page-size=100",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['response']['results']
                    cleaningGuardian(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/Guardian_Technology", (req, res) => {
    request("https://content.guardianapis.com/technology?api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&show-blocks=all&page-size=100",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['response']['results']
                    cleaningGuardian(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/Guardian_Sport", (req, res) => {
    request("https://content.guardianapis.com/sport?api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&show-blocks=all&page-size=100",
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['response']['results']
                    cleaningGuardian(temp)
                    temp = temp.filter(function(a){return typeof a !== 'null';})
                    res.send({temp:temp.slice(0,10)})
                }
            }
    )
})

app.get("/article", (req, res) => {
    const param = req.query;
    var queryLink;
    if(param.web_url) {
        queryLink = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22' + param.web_url + '%22)&api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy';
        request(queryLink,
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['response']
                    if(temp['docs'].length == 0) {
                        res.send({temp})
                    } else {
                    if(temp['docs'][0]['multimedia']) {
                        changeFlag = 1

                        for(var i = 0; i < temp['docs'][0]['multimedia'].length; i++) {
                            {
                                if (temp['docs'][0]['multimedia'][i].width >= 2000) {
                                    temp['docs'][0]['url_Link'] = "https://static01.nyt.com/" + temp['docs'][0]['multimedia'][i].url
                                    temp['docs'][0]['id'] = i
                                    changeFlag = 0
                                    // <img src={"https://static01.nyt.com/" + this.state.data.docs[0].multimedia[0].url} alt="Card image cap"/>
                                    break
                                } else {
                                    continue
                                }
                            } 
                        }
                        if(changeFlag == 1) {
                            temp['docs'][0]['url_Link'] = 'Nytimes_hq.jpg'
                            temp['docs'][0]['id'] = i
                        }
                    } else {
                        temp['docs'][0]['url_Link'] = 'Nytimes_hq.jpg'
                        temp['docs'][0]['id'] = i    
                    }

                    if(temp['docs'][0].pub_date) {
                        tmp = temp['docs'][0].pub_date.split('-')
                        rep = tmp[0] + "-" + tmp[1] + "-" + tmp[2].substring(0,2)
                        temp['docs'][0].published_date = rep
                    }
                    if(temp['docs'][0].abstract) {
                        temp['docs'][0]['short_desc'] = add3DotsDesc(temp['docs'][0].abstract)
                    }
                    if(temp['docs'][0].news_desk) {
                        if(temp['docs'][0].news_desk.toLowerCase() === 'Sport') {
                            temp['docs'][0].news_desk = 'Sports'
                        } 
                    } 
                    if(temp['docs'][0].abstract) {
                        temp['docs'][0]['long_desc'] = addSpaceDesc(temp['docs'][0].abstract)
                    }
                    res.send({temp})

                }
            }
            })
    }
    else {
        queryLink = 'https://content.guardianapis.com/' + param.id + '?api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&show-blocks=all';
        request(queryLink,
            function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body)
                    var temp = parsedBody['response']['content']
                    if(temp.length == 0) {
                        res.send({temp})
                    } else {
                    try {
                        if(temp.blocks.main.elements[0].assets[temp.blocks.main.elements[0].assets.length - 1].file) {
                            temp['url_Link'] = temp.blocks.main.elements[0].assets[temp.blocks.main.elements[0].assets.length - 1].file
                        } else {
                            temp['url_Link'] = 'Guardians_hq.png'
                        } 
                    } catch {
                        temp['url_Link'] = 'Guardians_hq.png'
                    }
                    

                    if(temp['webPublicationDate']) {
                        tmp = temp['webPublicationDate'].split('-')
                        rep = tmp[0] + "-" + tmp[1] + "-" + tmp[2].substring(0,2)
                        temp['webPublicationDate'] = rep
                    }
                    if(temp.blocks.body[0].bodyTextSummary) {
                        temp['short_desc'] = add3DotsDesc(temp.blocks.body[0].bodyTextSummary)
                    }
                    if(temp.sectionId) {
                        if(temp.sectionId.toLowerCase() === 'sport') {
                            temp.sectionId = 'Sports'
                        } 
                    } 
                    if(temp.blocks.body[0].bodyTextSummary) {
                        temp['long_desc'] = addSpaceDesc(temp.blocks.body[0].bodyTextSummary)
                    }
                    res.send({temp})

                }
            }
            })
        }
    })

    app.get("/Search", (req, res) => {
        const param = req.query;
        var queryLink;
        console.log("Params", param)
        
        if(param.source == 'ny') {
            // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=trump&api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy
            queryLink = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + param.id + '&sort=newest&api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy';
            request(queryLink,
                function(error, response, body) {
                    if(!error && response.statusCode == 200) {
                        var parsedBody = JSON.parse(body)
                        var temp = parsedBody['response']
                        cleaning(temp)
                        // temp = temp.filter(function(a){return typeof a !== 'null';})
                        // temp2 = [];

                        // for(let i of temp)
                        //     i && temp2.push(i); // copy each non-empty value to the 'temp' array

                        // temp = temp2;
                        console.log("Temp", temp)
                        dum = makeData(temp, param.source)
                        res.send({temp : dum.slice(0,10)})

                    }
                })
        }
        else {
            https://content.guardianapis.com/search?q=trump&api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&show-blocks=all&page-size=100            
            queryLink = 'https://content.guardianapis.com/search?q=' + param.id + '&api-key=c6aa0af3-1235-4cfe-84dc-310b41f9e231&show-blocks=all&page-size=100';
            request(queryLink,
                function(error, response, body) {
                    if(!error && response.statusCode == 200) {
                        var parsedBody = JSON.parse(body)
                        var temp = parsedBody['response']['results']
                        cleaningGuardian(temp)
                        temp = temp.filter(function(a){return typeof a !== 'null';})
                        dum = makeData(temp, 'guardian')
                        res.send({temp : dum.slice(0,10)})

                        // if(temp.blocks.main.elements[0].assets[temp.blocks.main.elements[0].assets.length - 1].file) {
                        //     temp['url_Link'] = temp.blocks.main.elements[0].assets[temp.blocks.main.elements[0].assets.length - 1].file
                        // } else {
                        //     temp['url_Link'] = 'Guardians_hq.jpg'
                        // }
                
    
                        // if(temp['webPublicationDate']) {
                        //     tmp = temp['webPublicationDate'].split('-')
                        //     rep = tmp[0] + "-" + tmp[1] + "-" + tmp[2].substring(0,2)
                        //     temp['webPublicationDate'] = rep
                        // }
                        // if(temp.blocks.body[0].bodyTextSummary) {
                        //     temp['short_desc'] = add3DotsDesc(temp.blocks.body[0].bodyTextSummary)
                        // }
                        // res.send({temp})
    
                    }
                })
            }
        })
        
        
// https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22https://www.nytimes.com/2020/03/18/world/asia/china-coronavirus-zero-infections.html%22)&api-key=UXiAdVizChhDejGyG68rl1CG5inuLKiy  

app.listen(port, () => console.log("Example app"))