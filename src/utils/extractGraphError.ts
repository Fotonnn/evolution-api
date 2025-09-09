export interface GraphErrorInfo {
  message: string;
  status?: number;
  body?: any;
}

export function extractGraphError(err: any): GraphErrorInfo {
  const status = err?.response?.status;
  const body = err?.response?.data;
  const message = body?.error?.message || err?.message || (body ? JSON.stringify(body) : 'Unknown error');
  return { message, status, body };
}
