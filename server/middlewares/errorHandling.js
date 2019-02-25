function errorHandling(req, res) {
    console.log(req.error)
    // console.log('sampe err handling')
    console.log(req.error)
    let errors = []
    if(req.error.register) {
        if(req.error.register.errors) {
            if(req.error.register.errors.name) {
                errors.push(req.error.register.errors.name.message)
            }
            if(req.error.register.errors.password) {
                errors.push(req.error.register.errors.password.message)
            }
            if(req.error.register.errors.email) {
                errors.push(req.error.register.errors.email.message)
            }
        }
    } else if (req.error.login) {
        errors.push(req.error.login.msg)
    } else if (req.error.question) {
        if(req.error.question.errors) {
            if(req.error.question.errors.title) {
                errors.push(req.error.question.errors.title.message)
            }
            if (req.error.question.errors.description) {
                errors.push(req.error.question.errors.description.message)
            }
        }
    }
    res.status(500).json(errors)
}

module.exports = errorHandling