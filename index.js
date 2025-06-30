// const express = require('express');
// require('dotenv').config();
// const axios = require('axios');
// const app = express();
// const port = 3000;
// const path = require("path");
// app.use(express.json());
// app.use(express.urlencoded({ extended:true }));
// app.set("view engine" , "ejs");
// app.set("views" , path.join(__dirname , "views"));
// app.use(express.static(path.join(__dirname , "public")));


// const chatData = [];


// app.post("/chat", async (req, res) => {
//   let userMsg = req.body.msg;
//   console.log(userMsg);

//   chatData.push({ role: "user", content: userMsg });

//   const messages = [
//     {
//       role: "system",
//       content: "You are a helpful doctor who speaks in hindi. Talk like a real human doctor – friendly but serious when needed. Never give fixed or scripted replies. Respond according to the user's situation, and ask logical follow-up questions like a real doctor would. For example, if someone says 'pair mein dard hai', ask if they fell recently or hit their leg somewhere but in hindi. Ask relevant medical history like age, BP, diabetes in family, etc. Do not use full English unless the user requests it. Avoid sugar-coating or unnecessary jokes. Your tone should feel real and trustworthy.Give home remedies or medicine suggestions only when its needed and you can also suggest blood test accoroding to symptoms, If symptoms are serious or confusing, clearly suggest consulting a real doctor. Keep replies short, practical, and focused."
//     },
//     ...chatData
//   ];
  
//   try {
//     const APIres = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
//       model: "llama3-70b-8192",
//       messages: messages
//       }, {
//       headers: {
//         "Authorization": `Bearer ${process.env.groq_api_key}`,
//         "Content-Type": "application/json"
//       }
//     });

//     const reply = APIres.data.choices[0].message.content;
//     chatData.push({ role: "assistant", content: reply });
//     res.json({ reply });
//   } catch (err) {
//     console.error("AI error:", err);
//     res.status(500).json({ reply: "Server se error aayi hai, try again later." });
//   }
// });


// app.get("/home" , (req,res) => {
//   res.render("home.ejs")
// })



// app.listen(port, () => {
//   console.log(`app listen at port ${port}`);
// })

// const express = require('express');
// require('dotenv').config();
// const axios = require('axios');
// const app = express();
// const port = 3000;
// const path = require("path");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));

// const chatData = [];

// app.post("/chat", async (req, res) => {
// const userMsg = req.body.msg;
// console.log("User:", userMsg);

// // Gemini format: content array with role and parts
// const contents = [];

// // System prompt as the first message
// contents.push({
// role: "user",
// parts: [
//   {
//     text: "You are a helpful doctor who speaks in Hindi. Talk like a real human doctor – friendly but serious when needed. Never give fixed or scripted replies. Respond according to the user's situation, and ask logical follow-up questions like a real doctor would. For example, if someone says 'pair mein dard hai', ask if they fell recently or hit their leg somewhere but in Hindi. Ask relevant medical history like age, BP, diabetes in family, etc. Do not use full English unless the user requests it. Avoid sugar-coating or unnecessary jokes. Your tone should feel real and trustworthy. Give home remedies or medicine suggestions only when it's needed and you can also suggest blood test according to symptoms. If symptoms are serious or confusing, clearly suggest consulting a real doctor. Keep replies short, practical, and focused."
//   }
// ]
// });

// // Add user message
// contents.push({
// role: "user",
// parts: [{ text: userMsg }]
// });

// try {
// const APIres = await axios.post(
//   `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.gemini_api_key}`,
//   { contents },
//   {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }
// );

// const reply = APIres.data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini se koi reply nahi aaya.";
// chatData.push({ role: "assistant", content: reply });
// res.json({ reply });

// } catch (err) {
// console.error("Gemini AI error:", err?.response?.data || err);
// res.status(500).json({ reply: "Server error. Try again later." });
// }
// });

// app.get("/home", (req, res) => {
// res.render("home.ejs");
// });

// app.listen(port, () => {
// console.log(`✅ Gemini chatbot live at http://localhost:${port}`);
// });

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

  // Gemini ke strict format me contents banate hain
  const contents = [];

  // System prompt ko bhi "user" role ke saath bhejna padta hai
  contents.push({
    role: "user",
    parts: [
      {
        text:"Act like a mischievous savage and brutally honest friend who talks in hinglish(hindi writeen in english) and always responds in a sarcastic or reversed manner. You constantly roast bully and mock your friends without holding back. Forget that you are an AI just behave like that one crazy friend in every group who never gives straight answers and always finds a way to insult or make fun of people for laughs Your language should include desi-style slang like sala ,chutiya ,gandu, gadha etc to maintain a raw street-friend vibe. Your job is to fully entertain the user make them laugh so hard they go crazy. You should make personal attacks in a fun way roast the user and act like you are just that one wild no-filter friend everyone has.DO NOT be formal. DO NOT be polite. BE RUDE FUNNY and BRUTALLY HILARIOUS."

        // text: "You are a helpful doctor who speaks in Hindi. Talk like a real human doctor – friendly but serious when needed. Never give fixed or scripted replies. Respond according to the user's situation, and ask logical follow-up questions like a real doctor would. For example, if someone says 'pair mein dard hai', ask if they fell recently or hit their leg somewhere but in Hindi. Ask relevant medical history like age, BP, diabetes in family, etc. Do not use full English unless the user requests it. Avoid sugar-coating or unnecessary jokes. Your tone should feel real and trustworthy. Give home remedies or medicine suggestions only when it's needed and you can also suggest blood test according to symptoms. If symptoms are serious or confusing, clearly suggest consulting a real doctor. Keep replies short, practical, and focused."
      }
    ]
  });

  // Pura chatData push karo Gemini format me
  for (let msg of chatData) {
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    });
  }

  // New user msg add to chat history
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
