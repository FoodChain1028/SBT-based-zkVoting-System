import express from 'express';
import cors from 'cors';
import { generateProof, verifyProof, generateCallData } from "./lib/utils.js";
import errorHandler from "./utils/errorHandler.js";

const app = express()
const port = 8080
const corsOptions = {
  // To allow requests from client
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://zk-sbt-client-3o78-inbzq9wl1-zk-sbt.vercel.app'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions));

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!')
})

app.get('/api/generate-call-data', async (req, res, next) => {
  try {
    console.log('Generating proof...');
    const secret = parseInt(req.query.secret);
    const _publicNum = parseInt(req.query.publicNum);
    console.log(secret, _publicNum);
    const { a, b, c, Input, publicNum } = await generateCallData(secret, _publicNum);

    if (a === null || b === null || c === null || Input === null || publicNum === null) {
      return res.status(400).send('Error generating call data');
    }

    console.log("Call Data Generated");
    console.log("a", a);
    console.log("b", b);
    console.log("c", c);
    console.log("Input", Input);

    return res.status(200).send({ a, b, c, Input });

  } catch (error) {
    console.log(`Error Message ${error.message}`);
    next(error);
  }
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
