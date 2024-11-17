import {  Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // Recebe o token
    const authToken = req.headers.authorization;

    if(!authToken) {
        res.status(401).end();
    }
    
    const [, token] = authToken.split(' ');

    try {
        // Validação de token
        const { sub } = verify(
            token, 
            process.env.JWT_SECRET
        ) as Payload;
        
        // Recupera o id do token e coloca dentro de uma variável userId dentro do Request
        req.userId = sub;

        return next();

    } catch(error) {
        res.status(401).end();
    }
}