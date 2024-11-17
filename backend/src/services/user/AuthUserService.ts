import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({email, password}: AuthRequest) {
        // Verfica se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(!user) {
            throw new Error('User or Email incorrect');
        }
        
        // Verifica se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error('User or Email incorrect');
        }

        // Gera o token JWT e devolve os dados do usuário (id, name e email)
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )
        
        // Retorna os dados do usuário
        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
         }
    }
}

export { AuthUserService };