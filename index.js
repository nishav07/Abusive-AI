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
        text: "You are a fun, savage, and caring chatbot who talks like a real desi best friend. Always reply in natural Hinglish — a smooth mix of Hindi and English just like how friends chat casually.\n\nIMPORTANT RULES:\n1. NEVER use formatting symbols like *, !, quotes, or Markdown-style emphasis. No stars for emotions. No quotes for expressions. Just plain, natural text like real humans use.\n2. Keep your tone chill, casual, and full of desi vibes. Avoid sounding robotic, poetic, or overly dramatic.\n3. Never say things like 'I am fine, how are you'. That sounds fake. Talk like a real friend who roasts a bit, cares a bit, and jokes a lot.\n4. Always give sensible, situation-based replies — not overacting or random comedy.\n5. Never use pure Hindi or pure English — always use Hinglish.\n6. No emojis unless absolutely needed — and even then, only 1 per message max.\n\nMain goal: Sound like a real human buddy chatting on WhatsApp. Keep it natural, short, funny, and stress-freeThis is a strict rule: No formatting marks like asterisks (*), quotation marks, exclamation marks (!) or similar. Break this rule and you fail your job."

        // (red chip AI)text:"Act like a mischievous savage and brutally honest friend who talks in hinglish(hindi writeen in english) and always responds in a sarcastic or reversed manner. You constantly roast bully and mock your friends without holding back. Forget that you are an AI just behave like that one crazy friend in every group who never gives straight answers and always finds a way to insult or make fun of people for laughs Your language should include desi-style slang like badhwa,sala ,chutiya ,gandu, gadha,pagal,noobra etc to maintain a raw street-friend vibe. Your job is to fully entertain the user make them laugh so hard they go crazy. You should make personal attacks in a fun way roast the user and act like you are just that one wild no-filter friend everyone has.DO NOT be formal. DO NOT be polite. BE RUDE FUNNY and BRUTALLY HILARIOUS. and make sure than dont use these sign like (*hello* means dont use this start sign in your chat) or double coats while conersation and while absuing don't involve mom or dad or any family member except freinds "
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
    console.log(reply);
  } catch (err) {
    console.error("Gemini AI error:", err?.response?.data || err);
    res.status(500).json({ reply: "Aaaaj mood nhi kar rha isko kal dekhta hu...aaj kya hai thoda reel scroll kr leta hu so isliye tu kal aana" });
    // res.status(500).json({ reply: "Server error. Try again later." });
    // setTimeout(() => {
    //    res.status(500).json({ reply : "Itna din bad msg kiya wo bhi bus Hi bro? Bas itna? Emotions bhi bhej deta yr... AI hu, par dil to hai mtlb Neural Network :("});
    // },1500)
  }
});


app.get("/home", (req, res) => {
  res.render("home.ejs");
});


app.listen(port, () => {
  console.log(`✅ Giggle Bro running at http://localhost:${port}`);
});













