import express from "express";
//import logger from "morgan";

//@Bring in our Routes
import authRoutes from "./routes/authRoutes";
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accepted,Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH ,OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(logger('dev'));

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome To Banka API"
  });
});

//@auth Routes
app.use("/api/v1/auth", authRoutes);

//@Account Routes
app.use('/api/v1/accounts', accountRoutes);

app.use('/api/v1/user', accountRoutes);

//@Transaction Routes
app.use('/api/v1/transactions', transactionRoutes);

app.use("*", (req, res) => {
  res.status(404).send({
    status: res.statusCode,
    error: "Page Not Found!"
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Banka_Application is listening on port ${port}`);
});

export default app;