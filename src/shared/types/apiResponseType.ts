// export type ApiResponse<T> = {
//   status: string;
//   message: string;
//   data: T;
// };

export type ApiResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};