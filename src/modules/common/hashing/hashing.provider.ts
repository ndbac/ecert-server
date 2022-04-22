import { Injectable } from "@nestjs/common";

@Injectable()
export class HashingService {
    constructor() { }

    encrypt(rawText: string) {
        return `${rawText}-hashed`;
    }

    decrypt(encryptedText: string) {
        return encryptedText;
    }
}