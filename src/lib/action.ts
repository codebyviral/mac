'use server';
import { ActionResponse, failure, success, User } from '@/lib/types';
import db from '@/lib/db';
import { userValidation } from '@/validations/user.validation';
import bcrypt from 'bcryptjs';

export async function signup(
  username: string,
  email: string,
  password: string
): Promise<ActionResponse<User>> {
  try {
    const validation = userValidation.safeParse({
      username,
      email,
      password,
    });

    if (!validation.success) {
      console.log(validation.error);
      return failure('Validation failed', {
        validation: [validation.error.issues[0].message],
      });
    } else {
      console.log(validation.data);
    }

    const passwordHash = bcrypt.hash(password, 10);

    const result = await db.query<User>(
      'INSERT INTO users (username,password) VALUES ($1, $2)',
      [username, passwordHash]
    );
    return success(result.rows[0], 'Account created');
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
}
