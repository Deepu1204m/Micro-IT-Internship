const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files

// API for projects
const projects = [
    { title: "Portfolio Website", description: "A personal website showcasing skills and projects.", link: "https://github.com/Deepu1204m/Micro-IT-Internship" },
    { title: "Voice-Enabled Chatbot", description: "An AI-powered assistant for opening apps and web search.", link: "https://github.com/Deepu1204m/VoiceAssistant-Chatbot" },
    { title: "HealthAI in IBM Hackathon", description: "A machine learning project for healthcare insights.", link: "https://github.com/Deepu1204m/Deepu1204m" }
];

app.get("/projects", (req, res) => {
    res.json(projects);
});

// Contact Form API
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Message sent successfully!");
    } catch (error) {
        res.status(500).send("Error sending message.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});