// src/index.ts
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Middleware
import { errorHandler } from "./middleware/errorHandler.ts";
import { apiLimiter } from "./middleware/rateLimiter.ts";

// Rotas
import signupRouter from "./routes/signup.ts";
import loginRouter from "./routes/login.ts";
import steamRouter from "./routes/steam.ts";
import checkoutRouter from "./routes/checkout.ts";
import updateemailRouter from "./routes/updateemail.ts";
import updatepasswordRouter from "./routes/updatepassword.ts";
import updateUserRouter from "./routes/updateUser.ts";
import sendemailRouter from "./routes/sendemail.ts";
import passwordResetRouter from "./routes/passwordReset.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// =======================
// Middleware de Segurança
// =======================
app.use(helmet()); // Adiciona headers de segurança
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting global
app.use("/api/", apiLimiter);

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`📝 [${timestamp}] [${req.method}] ${req.originalUrl}`);
  if (Object.keys(req.body).length > 0) {
    console.log(`   Body:`, req.body);
  }
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
app.use("/api", passwordResetRouter); // rotas de recuperação de senha
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
// Error Handler (deve ser o último middleware)
// =======================
app.use(errorHandler);

// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Swagger UI disponível em http://localhost:${PORT}/api/docs`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
});
