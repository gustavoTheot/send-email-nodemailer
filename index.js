import fastify from "fastify";
import nodemailer from 'nodemailer'
import 'dotenv/config'

const app = fastify();
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on port ${port}`);
});

app.get('/send', (req, resp) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_GOOGLE,
      pass: process.env.PASSWORD_GOOGLE,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  transporter
    .sendMail({
      from: 'Gustavo <dlcgustavo.28@gmail.com>',
      to: 'gustavotheotonio46@gmail.com',
      subject: 'Experimento com nodemailer',
      text: 'Olá, isso é um teste utilizando nodemailer.',
    })
    .then((message) => {
      resp.send(message);
    })
    .catch((error) => {
        resp.send(error);
    });
});