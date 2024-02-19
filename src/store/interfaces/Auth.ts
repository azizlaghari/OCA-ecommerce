export interface User {
  _id: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  points: number;
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  isActive: boolean;
  emailVerificationToken: number | null;
  emailVerificationTokenExpires: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  createdAt: Date;
  updatedAt: Date;
  wishlist?: string[];
  cart?: string[];
}

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  addressLine1: string;
  addressLine2: string;
}

export interface UpdatePassType {
  currentPassword: string;
  newPassword: string;
}

export interface AuthState {
  token: String | null;
  user: User | null;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface SignupType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface verifyEmailType {
  email: string;
  emailVerificationToken: number;
}
export interface CreatePasswordType {
  password: string;
  email: string;
}

export interface ChangePassType {
  passwordResetToken: string;
  password: string;
  confirmPassword: string;
}
export interface ResetPassType {
  passwordResetToken: number;
  password: string;
  email: string;
}
