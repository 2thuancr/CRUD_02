export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  gender: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  gender: boolean;
}

export interface UserUpdateAttributes {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  gender?: boolean;
}

