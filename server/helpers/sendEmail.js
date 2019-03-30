const nodemailer = require('nodemailer')

function sendEmail(email) {

    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ahmad.syukron6991@gmail.com",
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: "ahmad.syukron6991@gmail.com",
        to: email,
        subject: "happy monday",
        html:
            `have a greate monday, start your day with post your difficulties last week`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('success')
        }
    });
}

module.exports = sendEmail