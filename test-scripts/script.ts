const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "email",
    pass: "password, lol",  
  },
});

async function sendTestEmail() {
  try {
    await transporter.sendMail({
      from: "email",
      to: "email, lol", 
      subject: "Test Email",
      text: "This is a test email from Nodemailer",
    });
    console.log("✅ Test email sent successfully!");
  } catch (error) {
    console.error("❌ Test email error:", error);
  }
}

sendTestEmail();