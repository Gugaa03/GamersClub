// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface ApiError {
  error: string;
  status?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiClient(API_BASE_URL);

// API Methods
export const authApi = {
  login: (email: string, password: string) =>
    api.post("/api/login", { email, password }),
  
  signup: (name: string, email: string, password: string) =>
    api.post("/api/signup", { name, email, password }),
};

export const userApi = {
  updateEmail: (userId: string, newEmail: string) =>
    api.post("/api/updateUser/email", { userId, newEmail }),
  
  updatePassword: (
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) =>
    api.post("/api/updateUser/password", {
      userId,
      oldPassword,
      newPassword,
      confirmPassword,
    }),
  
  addFunds: (userId: string, amount: number) =>
    api.post("/api/addfunds", { userId, amount }),
};

export const checkoutApi = {
  purchase: (userId: string, games: any[]) =>
    api.post("/api/checkout", { userId, games }),
};
