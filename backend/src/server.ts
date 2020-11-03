import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { RootModule } from "./modules/root.module";
import puppeteer from "puppeteer";

const app = express();

app.get("/", (_, res) => {
  res.send("ok");
});

app.get("/badge/*?", async (req, res) => {
  if (!req.params[0]) {
    return res.sendStatus(400);
  }
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 500,
      height: 1000,
    },
  });
  const page = await browser.newPage();

  await page.goto(
    `http://algocards.netlify.app/internalBadgeHtml?cardFile=${decodeURI(
      req.params[0]
    )}`,
    { waitUntil: "networkidle0" }
  );
  const card = await page.$("#card");
  if (!card) {
    res.sendStatus(500);
    browser.close();

    return;
  }

  const bounding_box = await card.boundingBox();
  if (!bounding_box) {
    res.sendStatus(500);
    browser.close();

    return;
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
  res.setHeader("Content-Type", "image/jpeg");
  res.send(imageBuffer);
  browser.close();
});

const { schema } = RootModule;

const server = new ApolloServer({ schema, playground: true });
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({ port }, async () => {
  console.log(`🚀  Server ready at http://localhost:${port}`);
});
