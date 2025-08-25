import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { UserCreationAttributes, UserUpdateAttributes, ApiResponse } from '../types';

export class UserController {
  /**
   * Render home page
   */
  static async getHomePage(req: Request, res: Response): Promise<void> {
    try {
      res.render('index', { 
        title: 'Trang chủ',
        message: 'Welcome to Express TypeScript CRUD Application' 
      });
    } catch (error) {
      console.error('❌ Error rendering home page:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Something went wrong!' 
      });
    }
  }

  /**
   * Render create user form
   */
  static async getCreateUserForm(req: Request, res: Response): Promise<void> {
    try {
      res.render('crud', { 
        title: 'Create User',
        user: null,
        isEdit: false
      });
    } catch (error) {
      console.error('❌ Error rendering create form:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Something went wrong!' 
      });
    }
  }

  /**
   * Create new user
   */
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserCreationAttributes = {
        firstName: req.body.firstName?.trim(),
        lastName: req.body.lastName?.trim(),
        email: req.body.email?.trim(),
        address: req.body.address?.trim() || '',
        gender: req.body.gender === '1' || req.body.gender === 'true'
      };

      // Basic validation
      if (!userData.firstName || !userData.lastName || !userData.email) {
        return res.status(400).render('crud', {
          title: 'Create User',
          user: userData,
          isEdit: false,
          error: 'First name, last name and email are required!'
        });
      }

      // Check if email already exists
      const emailExists = await UserService.isEmailExists(userData.email);
      if (emailExists) {
        return res.status(400).render('crud', {
          title: 'Create User',
          user: userData,
          isEdit: false,
          error: 'Email address already exists!'
        });
      }

      await UserService.createUser(userData);
      
      res.redirect('/users?success=User created successfully');
    } catch (error: any) {
      console.error('❌ Error creating user:', error);
      res.status(500).render('crud', {
        title: 'Create User',
        user: req.body,
        isEdit: false,
        error: `Failed to create user: ${error.message}`
      });
    }
  }

  /**
   * Get all users with pagination and search
   */
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string || '';

      const { users, total } = await UserService.getAllUsers(page, limit, search);
      const totalPages = Math.ceil(total / limit);

      res.render('users/findAllUser', {
        title: 'All Users',
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
        search,
        success: req.query.success,
        error: req.query.error
      });
    } catch (error: any) {
      console.error('❌ Error fetching users:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: `Failed to fetch users: ${error.message}`
      });
    }
  }

  /**
   * Get user by ID for editing
   */
  static async getEditUserForm(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id) || parseInt(req.query.id as string);
      
      if (!userId) {
        return res.redirect('/users?error=Invalid user ID');
      }

      const user = await UserService.getUserById(userId);
      
      if (!user) {
        return res.redirect('/users?error=User not found');
      }

      res.render('users/updateUser', {
        title: 'Edit User',
        user,
        isEdit: true
      });
    } catch (error: any) {
      console.error('❌ Error fetching user for edit:', error);
      res.redirect(`/users?error=Failed to fetch user: ${error.message}`);
    }
  }

  /**
   * Update user
   */
  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.body.id);
      
      if (!userId) {
        return res.redirect('/users?error=Invalid user ID');
      }

      const updateData: UserUpdateAttributes = {
        id: userId,
        firstName: req.body.firstName?.trim(),
        lastName: req.body.lastName?.trim(),
        email: req.body.email?.trim(),
        address: req.body.address?.trim() || '',
        gender: req.body.gender === '1' || req.body.gender === 'true'
      };

      // Basic validation
      if (!updateData.firstName || !updateData.lastName || !updateData.email) {
        const user = await UserService.getUserById(userId);
        return res.status(400).render('users/updateUser', {
          title: 'Edit User',
          user: { ...user?.toJSON(), ...updateData },
          isEdit: true,
          error: 'First name, last name and email are required!'
        });
      }

      // Check if email already exists (excluding current user)
      const emailExists = await UserService.isEmailExists(updateData.email!, userId);
      if (emailExists) {
        const user = await UserService.getUserById(userId);
        return res.status(400).render('users/updateUser', {
          title: 'Edit User',
          user: { ...user?.toJSON(), ...updateData },
          isEdit: true,
          error: 'Email address already exists!'
        });
      }

      const updatedUser = await UserService.updateUser(updateData);
      
      if (!updatedUser) {
        return res.redirect('/users?error=User not found or could not be updated');
      }

      res.redirect('/users?success=User updated successfully');
    } catch (error: any) {
      console.error('❌ Error updating user:', error);
      res.redirect(`/users?error=Failed to update user: ${error.message}`);
    }
  }

  /**
   * Delete user
   */
  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id) || parseInt(req.query.id as string);
      
      if (!userId) {
        return res.redirect('/users?error=Invalid user ID');
      }

      const deleted = await UserService.deleteUser(userId);
      
      if (!deleted) {
        return res.redirect('/users?error=User not found or could not be deleted');
      }

      res.redirect('/users?success=User deleted successfully');
    } catch (error: any) {
      console.error('❌ Error deleting user:', error);
      res.redirect(`/users?error=Failed to delete user: ${error.message}`);
    }
  }

  /**
   * API: Get user statistics
   */
  static async getUserStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await UserService.getUserStats();
      
      const response: ApiResponse = {
        success: true,
        message: 'User statistics retrieved successfully',
        data: stats
      };

      res.json(response);
    } catch (error: any) {
      console.error('❌ Error getting user stats:', error);
      
      const response: ApiResponse = {
        success: false,
        message: 'Failed to get user statistics',
        error: error.message
      };

      res.status(500).json(response);
    }
  }

  /**
   * API: Get all users (JSON response)
   */
  static async getUsersApi(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string || '';

      const { users, total } = await UserService.getAllUsers(page, limit, search);
      const totalPages = Math.ceil(total / limit);

      const response: ApiResponse = {
        success: true,
        message: 'Users retrieved successfully',
        data: {
          users,
          pagination: {
            page,
            limit,
            total,
            totalPages,
          }
        }
      };

      res.json(response);
    } catch (error: any) {
      console.error('❌ Error in users API:', error);
      
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve users',
        error: error.message
      };

      res.status(500).json(response);
    }
  }
}

export default UserController;

