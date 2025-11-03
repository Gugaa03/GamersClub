// src/middleware/validation.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler.ts";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: "A senha deve ter pelo menos 8 caracteres" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos uma letra maiúscula" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos uma letra minúscula" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos um número" };
  }
  return { valid: true };
};

export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email e senha são obrigatórios", 400);
  }

  if (!validateEmail(email)) {
    throw new AppError("Email inválido", 400);
  }

  next();
};

export const validateSignupData = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Todos os campos são obrigatórios", 400);
  }

  if (!validateEmail(email)) {
    throw new AppError("Email inválido", 400);
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    throw new AppError(passwordValidation.message || "Senha inválida", 400);
  }

  if (confirmPassword && password !== confirmPassword) {
    throw new AppError("As senhas não coincidem", 400);
  }

  next();
};

export const validateCheckoutData = (req: Request, res: Response, next: NextFunction) => {
  const { userId, games } = req.body;

  if (!userId) {
    throw new AppError("ID do usuário é obrigatório", 400);
  }

  if (!games || !Array.isArray(games) || games.length === 0) {
    throw new AppError("Lista de jogos inválida", 400);
  }

  for (const game of games) {
    if (!game.id || !game.name || typeof game.price !== "number") {
      throw new AppError("Dados de jogo inválidos", 400);
    }
  }

  next();
};
