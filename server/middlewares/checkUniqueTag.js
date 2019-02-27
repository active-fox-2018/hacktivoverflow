const Tag =  require('../models/tag')


// function cekUniqTag(req,res,next) {
//     // let promises = []
//     Tag
//         .find({})
//         .then(allTags => {
//             let promises  = []
//             allTags = allTags.map(e => {
//                return e.name
//             })
//             console.log(allTags);
            
//             req.body.tags.forEach(e => {
//                 if(allTags.indexOf(e.text) === -1) {
//                     promises.push(Tag.create({ name : e.text}))
//                 }
//             });
//             console.log(promises,"=======inside midleware");
            
//             Promise.all(promises)
//                 .then(data => {
//                     console.log(data)
//                     next();
                    
//                 })
//         })
//         .catch(err=> {
//             next()
//         })


    // req.body.tags.forEach(e => {
    //     console.log(e.text);
        
    //     promises.push(Tag.findOne({ name : e.text}))
    // });

    // Promise.all(promises)
    // .then(data => {
    //     req.body.tags
    //     console.log(data);
    //     next()
    // })
    // .catch(err => {
    //     console.log(err,"=========");
    //     next()
    // })
    // Tag
    //     .find({})
    //     .then(tags => {
    //         // if(tags.length == 0) {
    //         //     req.tagToInput = req.body.tags
    //         //     console.log(req.tagToInput);
    //         //     next()
    //         // } else {
    //             let tagToInput = []
    //             // for(let i = 0 ; i < tags.length; i++) {
    //             //     if(req.body.tags.indexOf(tags[i].name) !== -1) {
    //             //         tagToInput.push(tags[i])
    //             //     }
    //             // }
    //             req.tagToInput = tagToInput
    //             console.log(req.tagToInput);
                
    //             next()
    //         // }
    //     })
    //     .catch(err => {
    //         res.status(500).json('intenal server error')
    //         console.log(err);         
    //     })
// }

// module.exports = cekUniqTag