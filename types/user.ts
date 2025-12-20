export interface ILoginResponse {
  id: string;
  username: string;
  firstName: String;
  lastName: String;
  role: "ADMIN" | "USER";
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  firstName: String;
  lastName: String;
  email: string | null;
  phoneNumber: string;
  role: "ADMIN" | "USER";
  isActive?: boolean;
  visible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
