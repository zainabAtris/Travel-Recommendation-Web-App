const nodemailer = require("nodemailer");

async function send() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "your.email@gmail.com",
      pass: "your_real_app_password"
    }
  });

  try {
    const info = await transporter.sendMail({
      from: "your.email@gmail.com",
      to: "your.email@gmail.com",
      subject: "Test Email",
      text: "This is a test email."
    });

    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}

send();
