import User from '../models/User';
import { UserCreationAttributes, UserUpdateAttributes, ApiResponse } from '../types';
import { Op } from 'sequelize';

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(userData: UserCreationAttributes): Promise<User> {
    try {
      // Convert gender string to boolean if needed
      const processedData = {
        ...userData,
        gender: typeof userData.gender === 'string' 
          ? userData.gender === '1' || (userData.gender as string).toLowerCase() === 'true'
          : userData.gender
      };

      const user = await User.create(processedData);
      return user;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Get all users with optional pagination and filtering
   */
  static async getAllUsers(
    page: number = 1, 
    limit: number = 10,
    search?: string
  ): Promise<{ users: User[], total: number }> {
    try {
      const offset = (page - 1) * limit;
      let whereCondition = {};

      // Add search functionality
      if (search) {
        whereCondition = {
          [Op.or]: [
            { firstName: { [Op.like]: `%${search}%` } },
            { lastName: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } }
          ]
        };
      }

      const { rows: users, count: total } = await User.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      return { users, total };
    } catch (error: any) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: number): Promise<User | null> {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  /**
   * Update user by ID
   */
  static async updateUser(updateData: UserUpdateAttributes): Promise<User | null> {
    try {
      const { id, ...updateFields } = updateData;

      // Convert gender string to boolean if needed
      if (updateFields.gender !== undefined) {
        updateFields.gender = typeof updateFields.gender === 'string'
          ? updateFields.gender === '1' || (updateFields.gender as string).toLowerCase() === 'true'
          : updateFields.gender;
      }

      const [updatedRowCount] = await User.update(updateFields, {
        where: { id },
      });

      if (updatedRowCount === 0) {
        return null;
      }

      // Return updated user
      const updatedUser = await User.findByPk(id);
      return updatedUser;
    } catch (error: any) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  /**
   * Delete user by ID
   */
  static async deleteUser(id: number): Promise<boolean> {
    try {
      const deletedRowCount = await User.destroy({
        where: { id },
      });

      return deletedRowCount > 0;
    } catch (error: any) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  /**
   * Check if email exists
   */
  static async isEmailExists(email: string, excludeId?: number): Promise<boolean> {
    try {
      const whereCondition: any = { email };
      
      if (excludeId) {
        whereCondition.id = { [Op.ne]: excludeId };
      }

      const user = await User.findOne({ where: whereCondition });
      return !!user;
    } catch (error: any) {
      throw new Error(`Failed to check email: ${error.message}`);
    }
  }

  /**
   * Get user statistics
   */
  static async getUserStats(): Promise<{ total: number, maleCount: number, femaleCount: number }> {
    try {
      const total = await User.count();
      const maleCount = await User.count({ where: { gender: true } });
      const femaleCount = await User.count({ where: { gender: false } });

      return { total, maleCount, femaleCount };
    } catch (error: any) {
      throw new Error(`Failed to get user statistics: ${error.message}`);
    }
  }
}

export default UserService;
