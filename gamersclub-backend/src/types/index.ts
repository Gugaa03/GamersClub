// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  nickname?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  developer?: string;
  publisher?: string;
  release_date?: string;
  rating?: number;
  discount?: number;
  oldPrice?: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CheckoutRequest {
  userId: string;
  games: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface UpdateEmailRequest {
  userId: string;
  newEmail: string;
}

export interface UpdatePasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}
