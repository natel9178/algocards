import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { RootModule } from "./modules/root.module";
import puppeteer from "puppeteer";

var browser: puppeteer.Browser;
const app = express();

app.get("/", (_, res) => {
  res.send("ok");
});

app.get("/badge", async (_, res) => {
  const page = await browser.newPage();
  await page.goto("https://algocards.netlify.app");
  const imageBuffer = await page.screenshot({ type: "jpeg", quality: 75 });
  res.setHeader("Content-Type", "image/jpeg");
  res.send(imageBuffer);
});

const { schema } = RootModule;

const server = new ApolloServer({ schema, playground: true });
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({ port }, async () => {
  browser = await puppeteer.launch();
  console.log(`🚀  Server ready at http://localhost:${port}`);
});
