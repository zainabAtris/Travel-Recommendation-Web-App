const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(".")); // serve your contact.html

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    //service: "gmail",
    auth: {
      user: "zainabatris5192@gmail.com",
      pass: "wtilhjikdudbohqo"
    }
  });

  const mailOptions = {
    from: email,
    to: "zainabatris5192@gmail.com",
    subject: `New Contact Form Message from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
