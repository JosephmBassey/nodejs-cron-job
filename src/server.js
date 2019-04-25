import express from 'express'
import cron from 'node-cron'
import nodemailer from 'nodemailer'
const app = express();

const PORT = process.env.PORT || 4000

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ENTER USER",
    pass: "ENTER PASSWORD"
  }
});

app.get('/', (req, res) => {
  res.send('Cron Job Demo!');
});


cron.schedule("* * * 1 * *", ()=>{
  console.log("---------------------");
  const  mailOptions = {
    from: "myEmail@mail.com",
    to: "sampleuser@mail.com",
    subject: `NOdejs Cron Job Tester ;)`,
    text: `Hi there, this email is just to test cron job 😄`
  };
  transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
});
app.listen(PORT , () => {
  console.log(`Serrver Started on port port! ${PORT}`);
});

