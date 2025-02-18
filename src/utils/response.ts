/* 
  This file contains the response types and functions for the API.
  If you want to use REST API, you can use this file for standardizing the responses.
*/

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message
});

export const errorResponse = (error: string): ApiResponse<null> => ({
  success: false,
  error
}); 