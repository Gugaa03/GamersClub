// GamersClub Frontend - Types
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  nickname?: string;
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

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  addFunds: (amount: number) => Promise<void>;
  refreshBalance: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  updatePassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}
