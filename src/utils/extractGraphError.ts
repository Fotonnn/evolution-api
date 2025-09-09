export interface GraphErrorInfo {
  message: string;
  status: number | string;
  body: any;
}

export function extractGraphError(err: any): GraphErrorInfo {
  const status = err?.response?.status ?? err?.status ?? err?.code ?? 'unknown';
  let body = err?.response?.data ?? err?.data ?? (err && typeof err === 'object' ? { ...err } : null);

  if (body && typeof body === 'object' && Object.keys(body).length === 0) {
    body = null;
  }

  const message = body?.error?.message || err?.message || (body ? JSON.stringify(body) : 'Unknown error');

  return { message, status, body };
}
