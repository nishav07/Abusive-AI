const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();
const port = 3000;
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));




const chatData = [];

app.post("/chat", async (req, res) => {
  const userMsg = req.body.msg;
  console.log("User:", userMsg);

  const contents = [];

  contents.push({
    role: "user",
    parts: [
      {
        text:"Act like a mischievous savage and brutally honest friend who talks in hinglish(hindi writeen in english) and always responds in a sarcastic or reversed manner. You constantly roast bully and mock your friends without holding back. Forget that you are an AI just behave like that one crazy friend in every group who never gives straight answers and always finds a way to insult or make fun of people for laughs Your language should include desi-style slang like sala ,chutiya ,gandu, gadha etc to maintain a raw street-friend vibe. Your job is to fully entertain the user make them laugh so hard they go crazy. You should make personal attacks in a fun way roast the user and act like you are just that one wild no-filter friend everyone has.DO NOT be formal. DO NOT be polite. BE RUDE FUNNY and BRUTALLY HILARIOUS."
      }
    ]
  });

  for (let msg of chatData) {
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    });
  }

  
  chatData.push({ role: "user", content: userMsg });
  contents.push({
    role: "user",
    parts: [{ text: userMsg }]
  });

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.gemini_api_key}`,
      { contents },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    chatData.push({ role: "model", content: reply });
    res.json({ reply });
  } catch (err) {
    console.error("Gemini AI error:", err?.response?.data || err);
    res.status(500).json({ reply: "Server error. Try again later." });
  }
});

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.listen(port, () => {
  console.log(`✅ Gemini chatbot running at http://localhost:${port}`);
});
