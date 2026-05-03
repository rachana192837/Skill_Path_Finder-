require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

app.post("/send-roadmap", async (req, res) => {
  const { phone, roadmap } = req.body;

  try {
    const message = await client.messages.create({
      body: roadmap,
      from: process.env.TWILIO_NUMBER,
      to: phone
    });

    res.json({ success: true, sid: message.sid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
console.log(process.env.TWILIO_SID);