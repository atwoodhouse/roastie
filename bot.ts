import { Telegraf } from "telegraf";
import { config } from "dotenv";
import OpenAI from "openai";

const PROMPT =
  "Formulera en kvick text om den här bilden som imiterar en 'roast', där du använder mild satir för att skapa en humoristisk effekt som skulle kunna ses som godmodigt gycklande snarare än allvarlig kritik. Texten ska vara kort, max en mening eller två.";

config();

const { BOT_TOKEN, OPENAI_API_KEY, ALLOWED_CHAT_ID } = process.env;

if (!BOT_TOKEN || !OPENAI_API_KEY) {
  throw new Error("Please set BOT_TOKEN and OPENAI_API_KEY in your .env file");
}

const bot = new Telegraf(BOT_TOKEN);
const openai = new OpenAI();

async function getSarcasticComment(imageUrl: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: PROMPT,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
      temperature: 0.5,
    });

    const message = response.choices[0].message.content;

    return (message || "Roast error :/").replace(/^["']|["']$/g, "");
  } catch (error) {
    console.error("Error getting a sarcastic comment:", error);
    return "Roast error :(";
  }
}

bot.on("photo", async (ctx) => {
  if (ALLOWED_CHAT_ID && ctx.chat?.id.toString() !== ALLOWED_CHAT_ID) return;

  const photo = ctx.message.photo.pop();
  if (photo) {
    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
    const comment = await getSarcasticComment(fileLink.href);
    ctx.reply(comment);
  }
});

console.log("~~~ Roastie ~~~");
bot.launch().catch((error) => {
  console.log("Failed to connect bot to Telegram: " + error);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
