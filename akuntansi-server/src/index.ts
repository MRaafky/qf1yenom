import express, { type Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

app.use(cors());
app.use(express.json());

export default app;