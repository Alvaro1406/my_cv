export interface IAuthCredentials {
  username: string;
  password: string;
}

export interface IAuthResponse {
  success: boolean;
  message: {
    es: string;
    en: string;
  };
  token: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    image: string;
    role: "ADMIN" | "USER";
  };
}

export interface IProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  image?: string;
  email: string;
  phoneNumber: string;
  role: "ADMIN" | "USER";
}
