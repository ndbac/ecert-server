import { Module } from '@nestjs/common';
import { HashingService } from "./hashing.provider";

@Module({ providers: [HashingService], exports: [HashingService] })

export class HashingModule { }