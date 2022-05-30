import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { AccuracyService } from '../providers/accuracy.service';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { AccuracyInputDto, AccuracyResDto } from '../dto/accuracy.dto';
import { imageFileFilter } from 'src/shared/media/uploadMedia.helpers';
import { AuthEndpoint } from 'src/decorators/auth-endpoint.decorator';
import { IamNamespace } from 'src/shared/types';
import { ProjectorAccessGuard } from 'src/guards/resources/projector-access.guard';

@Controller('accuracy')
@ApiTags('accuracy')
@UseGuards(ProjectorAccessGuard)
@UsePipes(ValidationPipe)
export class AccuracyController {
  constructor(private readonly accuracySrv: AccuracyService) {}

  @ApiOperation({
    operationId: 'dataAccuracyManually',
    summary: 'generate qrcode & signature',
  })
  @AuthEndpoint({ namespaces: [IamNamespace.ADMIN, IamNamespace.PROJECT] })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'data accuracy manually',
    type: AccuracyResDto,
  })
  @ApiBody({ type: AccuracyInputDto })
  @SecurityDecorator()
  @Post('/manually/generate')
  async dataAccuracyManually(
    @User('') userData: TokenDetailsDto,
    @Body() input: AccuracyInputDto,
  ) {
    return await this.accuracySrv.dataAccuracyManually(userData, input);
  }

  @ApiOperation({
    operationId: 'dataAccuracyAutomatically',
    summary: 'generate qrcode, signature to add to photo automatically',
  })
  @AuthEndpoint({ namespaces: [IamNamespace.ADMIN, IamNamespace.PROJECT] })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'data accuracy automatically',
    type: AccuracyResDto,
  })
  @ApiBody({ type: AccuracyInputDto })
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      limits: { fileSize: 4000084 },
    }),
  )
  @SecurityDecorator()
  @Post('/automatically/generate')
  async dataAccuracyAutomatically(
    @User('') userData: TokenDetailsDto,
    @Body() input: AccuracyInputDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.accuracySrv.dataAccuracyAutomatically(
      userData,
      input,
      file,
    );
  }
}
