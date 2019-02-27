const Tag = require('../models/tag')

module.exports = {
    create(req,res) {
        req.body.tags.forEach(el => {
            Tag
                .findOne({
                    name : el
                })
                .then(data => {
                    if(data) {

                    }
                })
        });
        
            
    }
}