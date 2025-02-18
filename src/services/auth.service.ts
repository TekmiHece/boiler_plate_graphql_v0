import jwt from 'jsonwebtoken';
import { User, IUser } from '@/models/user.model';
import { AppError } from '@/utils/error';
import { environment } from '@/config/environment';
import { Secret, SignOptions } from 'jsonwebtoken';

export class AuthService {
  static generateToken(user: IUser): string {
    return jwt.sign(
      { sub: user._id, email: user.email },
      environment.jwtSecret as Secret,
      { expiresIn: environment.jwtExpiresIn } as SignOptions
    );
  }

  static async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  static async register(userData: Partial<IUser>): Promise<{ user: IUser; token: string }> {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }

    const user = await User.create(userData);
    const token = this.generateToken(user);
    return { user, token };
  }
} 