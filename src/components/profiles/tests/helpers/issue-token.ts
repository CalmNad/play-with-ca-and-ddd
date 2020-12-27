import { sign } from "jsonwebtoken";

export function issueToken(data: any): string {
    return sign(data, process.env.JWT_SECRET!, {
        expiresIn: "15m",
        algorithm: "HS256",
    });
}

export function issueDeadToken(data: any): string {
    return sign(data, process.env.JWT_SECRET!, {
        expiresIn: "1s",
        algorithm: "HS256",
    });
}
