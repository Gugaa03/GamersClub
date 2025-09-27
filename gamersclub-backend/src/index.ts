// src/index.ts
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Rotas
import signupRouter from "./routes/signup.ts";
import loginRouter from "./routes/login.ts";
import steamRouter from "./routes/steam.ts";
import checkoutRouter from "./routes/checkout.ts";
import updateemailRouter from "./routes/updateemail.ts";
import updatepasswordRouter from "./routes/updatepassword.ts";
import updateUserRouter from "./routes/updateUser.ts";
import sendemailRouter from "./routes/sendemail.ts";
dotenv.config();

const app = express();
const PORT = 4000;

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`📝 [${req.method}] ${req.originalUrl} - Body:`, req.body);
  next();
});

// =======================
// Rotas /api
// =======================
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/steam", steamRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/updateemail", updateemailRouter);
app.use("/api/updatepassword", updatepasswordRouter);
app.use("/api/updateUser", updateUserRouter);
app.use("/api/sendemail", sendemailRouter); // rota para envio de email
app.get("/", (req, res) => {
  res.send("GamersClub Backend rodando!");
});

// =======================
// Swagger setup
// =======================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GamersClub Backend API",
      version: "1.0.0",
      description: "API do GamersClub - gerenciamento de usuários, pagamentos e Steam",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // aponta para todos os arquivos de rota
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger UI disponível em http://localhost:${PORT}/api/docs`);
});
