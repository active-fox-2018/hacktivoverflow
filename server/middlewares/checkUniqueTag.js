const Tag = require('../models/tag')


function cekUniqTag(req, res, next) {
    let tagId = []
    let promises = []
    req.body.tags.forEach(e => {
        promises.push(Tag.findOne({ name: e.text }))
    });
    Promise.all(promises)
        .then(allTags => {         
            let newTags = req.body.tags.map(function(e) {
               return  e.text
            })
            let existTag = allTags.filter(function(e) {
                if(e != null) {
                    return e
                }
            })      
            tagId = allTags.filter(function(e) { return e != null})
            console.log(tagId, "diawal");
            
            let tagToCreate = []
            if(existTag.length > 0) {
                  newTags.forEach(e => {
                      let cek = true
                      existTag.forEach( el=> {
                          if(e === el.name) {
                            cek = false
                          }
                      })
                      if(cek) {
                          tagToCreate.push(e)
                      }
                  })
            } else {           
                tagToCreate = newTags
            }
            let promisesCreate = []
            if(tagToCreate) {
                tagToCreate.forEach(tag => {
                    promisesCreate.push(Tag.create({ name: tag }))
                })
            } 
            return Promise.all(promisesCreate)
            .then(data => {
                let tagToInput = tagId.concat(data)
                req.tags = tagToInput
                next()
                
            })
        })
        .catch(err => {
            console.log(err, "=========");
            next()
        })
}

module.exports = cekUniqTag