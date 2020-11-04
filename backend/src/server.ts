import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { RootModule } from "./modules/root.module";
import puppeteer from "puppeteer";
import memoize from "memoizee";

const app = express();

app.get("/", (_, res) => {
  res.send("ok");
});

app.get("/badge/*?", async (req, res) => {
  if (!req.params[0]) {
    return res.sendStatus(400);
  }

  try {
    const imageBuffer = await memoizedGetImage(req.params[0]);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  } catch (e) {
    res.sendStatus(500);
  }
});

const memoizedGetImage = memoize(getImage, {
  promise: true,
  maxAge: 3600000 * 2, // two hours
});
async function getImage(cardFileUri: string) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 500,
      height: 1000,
    },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto(
    `http://algocards.netlify.app/internalBadgeHtml?cardFile=${decodeURI(
      cardFileUri
    )}`,
    { waitUntil: "networkidle0" }
  );
  const card = await page.$("#card");
  if (!card) {
    throw "no card on page";
  }

  const bounding_box = await card.boundingBox();
  if (!bounding_box) {
    throw "could not get bounding box";
  }

  const imageBuffer = await page.screenshot({
    type: "jpeg",
    quality: 75,
    clip: {
      x: 0,
      y: 0,
      width: Math.min(bounding_box.width + 20, page.viewport().width),
      height: Math.min(bounding_box.height + 20, page.viewport().height),
    },
  });

  browser.close();
  return imageBuffer;
}

const { schema } = RootModule;

const server = new ApolloServer({ schema, playground: true });
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({ port }, async () => {
  console.log(`🚀  Server ready at http://localhost:${port}`);
});
