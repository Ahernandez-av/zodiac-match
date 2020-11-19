const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.HOTMAIL_USER,
      pass: process.env.HOTMAIL_PASS
    }
})

exports.emailRegistro = (email) => {
    return transporter.sendMail({
        from: 'zodiac-match@noreply.com',
        to: email,
        subject: 'Succesful registration',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <style>
          .title{
            color: black;
            font-weight: bold
          }
          </style>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Document</title>
        </head>
        <body>
        <h1 class="title">Hello, welcome to Zodiac-match</h1>
        <h2> With Zodiac-match you will find a community of people who believe in the power of destiny.</h2>
        <h2> This is the version 1.0, so remember we are still finding new ways we can improve. </h2>
               <h2> Have a fantastic day. </h2>
        </body>
        </html>
    `
    })
}