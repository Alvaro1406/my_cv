export interface ILoginResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  role: "ADMIN" | "USER";
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string | null;
  image?: string;
  phoneNumber: string;
  role: "ADMIN" | "USER";
  isActive?: boolean;
  visible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
