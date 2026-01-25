import { ENV } from '@/config/env';
import { SignIn } from '@/db/schema';
import JWT from 'jsonwebtoken';

/**
 * Generates a token
 * Note: We take a partial user object to ensure we don't accidentally 
 * include the password in the payload.
 */
export async function generateJWTToken(payload: SignIn) {
    return JWT.sign(payload, ENV.JWT_SECRET, {
        expiresIn: ENV.JWT_SECRET_EXIRES_IN as JWT.SignOptions['expiresIn'],
    });
}

/**
 * Verifies a token
 * Returns the decoded payload if valid, or null if expired/tampered
 */
export async function verifyJWTToken(token: string): Promise<SignIn | null> {
    try {
        const decoded = JWT.verify(token, ENV.JWT_SECRET);
        return decoded as SignIn;
    } catch (error) {
        // This catches TokenExpiredError or JsonWebTokenError (invalid signature)
        console.error("JWT Verification failed:", error instanceof Error ? error.message : error);
        return null;
    }
}