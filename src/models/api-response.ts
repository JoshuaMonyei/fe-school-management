import { AppError } from "./app-error";
import { Message } from "./message";

export interface ApiResponse {
  data: any;
  error: AppError | null;
}
