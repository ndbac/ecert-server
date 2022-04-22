import { Module } from '@nestjs/common';
import { HashingModule } from './hashing/hashing.module';
import { EncryptionService } from './hashing/hashing.service';

@Module({
    imports: [HashingModule],
    providers: [EncryptionService],
    exports: [EncryptionService],
})
export class CommonModule { }
