const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up Nodemailer transporter (use your email provider's SMTP details)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example: 'gmail'
  auth: {
    user: 'chaverimdispatcher.app@gmail.com', // Use your email
    pass: 'pmdc goix sfub kdbt'   // Use your email password or an app password
  }
});

// POST route to send email
app.post('/send-email', (req, res) => {
  const { from, to, subject, message } = req.body;

  const mailOptions = {
    from,
    to,
    subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});