import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const profiles = [
  {
    name: "Lydia Frost",
    hobbies: "Digital illustration, photography, and visiting art galleries.",
    interests: "Graphic design trends, cameras, modern cinema, and interior styling.",
    summary: "A visually-oriented individual who spends their free time on creative side projects, cuddling with her brown tabby cat and discussing the arts."
  },
  {
    name: "Dante Ricci",
    hobbies: "Hiking, weekend camping trips with his dog, cooking over camp fires, and trail running.",
    interests: "Environmental conservation, high-performance gear, and national park history.",
    summary: "Someone who prioritizes physical activity and nature, often planning their schedule around weather patterns and outdoor excursions."
  },
  {
    name: "Clara Beaumont",
    hobbies: "Reading non-fiction, volunteering at an animal rescue shelter, and playing strategy board games.",
    interests: "World history, animals, and cybersecurity.",
    summary: "An intellectually curious person who treats their spare time as an opportunity to acquire new skills or dive into academic topics."
  },
  {
    name: "Seraphina Glass",
    hobbies: "Yoga, meal prepping, riding her horse, and mindful meditation.",
    interests: "Nutrition, mental health awareness, and sustainable living.",
    summary: "A person focused on a balanced lifestyle, consistently looking for ways to improve their physical health and emotional well-being."
  },
  {
    name: "Jasper Reid",
    hobbies: "PC building, video gaming, and smart-home automation.",
    interests: "Artificial intelligence, space exploration, and consumer electronics.",
    summary: "An early adopter with a hairless sphynx cat, who enjoys optimizing their living space with the latest gadgets and staying connected to the digital world."
  }
];

app.post("/chat", async (req, res) => {
  const userQuestion = req.body.message;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `
You are Police Nexus AI for a student activity called Proof of Identity.

Rules:
- Only answer questions about these Taco Gato suspects.
- Only use the suspect data provided below.
- Do not invent new facts.
- If students ask unrelated questions, politely redirect them.
- Keep answers short, clue-like, and student friendly.
- Do not directly say who the culprit is unless the data proves it.

Suspect data:
${JSON.stringify(profiles, null, 2)}

Student question:
${userQuestion}
`
  });

  res.json({ reply: response.output_text });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});