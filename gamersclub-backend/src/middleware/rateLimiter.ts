// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: {
    error: "Muitas requisições deste IP, tente novamente mais tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limite de 5 tentativas de login
  message: {
    error: "Muitas tentativas de login, tente novamente em 15 minutos.",
  },
  skipSuccessfulRequests: true,
});

export const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // Máximo 3 compras por minuto
  message: {
    error: "Muitas compras em pouco tempo, aguarde um momento.",
  },
});
