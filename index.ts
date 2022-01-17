import express, { Request, Response } from "express";

const app = express();
const PORT: number = 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started listening at http://localhost:${PORT}`);
});

app.get("/now", (req: Request, res: Response) => {
  const date: Date = new Date();
  res.send(date);
});

app.get("/flipcoin", (req: Request, res: Response) => {
  res.send(Math.random() > 0.5 ? "heads" : "tails");
});

app.get("/restaurants", (req: Request, res: Response) => {
  // ToDo
});
