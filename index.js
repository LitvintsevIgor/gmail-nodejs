const express = require('express')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN || "---"
const smtp_password = process.env.SMTP_PASSWORD || "---"

app.use(cors())


app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: true, // true for 465, false for other ports
    // port: 25,
    // tls: {
    //     rejectUnauthorized: false
    // },
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

app.post('/sendMessage', async (req, res) => {

    let {firstName, email, subject, message} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `MY PORTFOLIO`, // sender address
        to: "litvincevi@mail.ru, litvintsevigori@gmail.com", // list of receivers
        subject: "HR want me", // Subject line
        // text: "Hello world?", // plain text body
        html: `<b>Hello</b>
<div>HR ${firstName} sent you a message</div>
<div>Email for response: ${email}</div>
<div>Subject: ${subject}</div>
<div>Message: ${message}</div>`, // html body
    });
    res.send('Send message!')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})