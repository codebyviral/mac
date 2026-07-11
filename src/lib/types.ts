export interface User {
  username: string;
  password: string;
  avatar: string;
}

export type ActionResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export function success<T>(data: T, message = 'success'): ActionResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function failure<T>(
  message: string,
  errors: Record<string, string[]>
): ActionResponse<never> {
  return {
    success: false,
    message,
    errors,
  };
}
