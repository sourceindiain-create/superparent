import type { IncomingMessage, ServerResponse } from 'http';
import app from '../server';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // Delegate to Express app
  return app(req as any, res as any);
}
