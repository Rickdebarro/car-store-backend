import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protectedMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization;
    
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ status: 401, message: 'Não autorizado: token ausente ou inválido.' });
    }
    
    const token = header.split(' ')[1];

    if(!token) {
      return res.status(401).json({ status: 401, message: 'Não autorizado: token ausente.' });
    }

    try {
      const response = await fetch(process.env.USER_SERVICE_URL + '/auth/token/introspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        return res.status(401).json({ status: 401, message: 'Não autorizado: token inválido.' });
      }

      // Tipagem explícita do JSON esperado
      const data = await response.json() as { user?: unknown };

      // checagem mínima antes de usar
      if (!data || typeof data !== 'object' || !('user' in data)) {
        return res.status(401).json({ status: 401, message: 'Não autorizado: token inválido.' });
      }

      (req as any).user = (data as any).user;
      next();

    } catch (error) {
      return res.status(401).json({ status: 401, message: 'Não autorizado: token inválido.' });
    }

}