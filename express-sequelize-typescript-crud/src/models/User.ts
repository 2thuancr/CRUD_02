import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { UserAttributes, UserCreationAttributes } from '../types';

// Define which attributes are optional when creating a User
interface UserCreationAttributesOptional extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributesOptional> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public address?: string;
  public gender!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Virtual fields
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Instance methods
  public getDisplayGender(): string {
    return this.gender ? 'Nam' : 'Nữ';
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'First name cannot be empty' },
        len: { args: [1, 100], msg: 'First name must be between 1-100 characters' },
      },
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Last name cannot be empty' },
        len: { args: [1, 100], msg: 'Last name must be between 1-100 characters' },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'Email address already exists',
      },
      validate: {
        isEmail: { msg: 'Must be a valid email address' },
        notEmpty: { msg: 'Email cannot be empty' },
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'true = male, false = female',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  }
);

export default User;

