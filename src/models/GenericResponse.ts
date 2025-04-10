export interface BaseResponse {
  succeeded: boolean;
  message?: string;
  status?: number;
}

export const createGenericResponse = <T>(
  status: number,
  message: string,
  data?: T
): GenericResponse<T> => ({
  succeeded: status >= 200 && status < 300,
  status,
  message,
  data: data || null,
});
export interface GenericResponse<T> extends BaseResponse {
  data: T | null;
}
