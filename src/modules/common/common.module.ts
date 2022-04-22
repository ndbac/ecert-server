import { Module } from '@nestjs/common';
import { HashingModule } from './hashing/hashing.module';
import { HashingService } from './hashing/hashing.service';

@Module({
    imports: [HashingModule],
    providers: [HashingService],
    exports: [HashingService],
})
export class CommonModule { }
