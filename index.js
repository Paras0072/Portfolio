const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
// Serve static files from the "public" directory
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/sendemail", (req, res) => {
  const { name, email, phone, message, subject } = req.body;
  // For demonstration purposes, printing the data to the console
  console.log("Received client-side email request:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Mobile Number:", phone);
  console.log("Message:", message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "parasthakur007241@gmail.com", // replace with your email
      pass: "bxcm zgwi yzsi uqqv", // replace with your password or use an app password
    },
  });

  const mailOptions = {
    from: email, // client's email
    to: "parasthakur007241@gmail.com", // owner's email
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMobile Number: ${phone}\n\nMessage: ${message}\n\nSubject: ${subject}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    res.json({
      status: "success",
      message: "Email request received on the server.",
    });

    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});
// Handle requests to the root URL
const cvFileName = "Resume.pdf";

app.get("/download", (req, res) => {
  // Replace 'path/to/your/cv' with the actual path to your CV file
  const cvFilePath = path.join(__dirname, "/public/images", cvFileName);

  // Set the appropriate headers for the file download
  res.setHeader("Content-Disposition", `attachment; filename=${cvFileName}`);
  res.setHeader("Content-Type", "application/pdf");

  // Send the file
  res.sendFile(cvFilePath);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
