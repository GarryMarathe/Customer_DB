export interface User {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
    token?: string;
  }
  