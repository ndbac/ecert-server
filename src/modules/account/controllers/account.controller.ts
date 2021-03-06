import {
  Controller,
  Put,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { SecurityDecorator } from 'src/decorators/security-input.decorator';
import { User } from 'src/decorators/user.decorator';
import { TokenDetailsDto } from 'src/shared/user.dto';
import { AccountService } from '../providers/account.service';
import { imageFileFilter } from 'src/shared/media/uploadMedia.helpers';
import {
  UploadPhotoResponseDto,
  SoftUpdateAccountDto,
} from '../dto/account.dto';
// import { UserResBodyInterceptor } from 'src/interceptors/user/user-res-body.interceptor';

@Controller('account')
@ApiTags('user.account')
@UsePipes(ValidationPipe)
export class AccountController {
  constructor(private readonly accountSrv: AccountService) {}

  @ApiOperation({
    operationId: 'uploadProfilePhoto',
    summary: 'user upload profile photo',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'photo uploaded successfully',
    type: UploadPhotoResponseDto,
  })
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      limits: { fileSize: 4000084 },
    }),
  )
  @SecurityDecorator()
  @Put('/profile-photo')
  async uploadProfilePhoto(
    @User('') userData: TokenDetailsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.accountSrv.updateProfilePhoto(userData, file);
  }

  @ApiOperation({
    operationId: 'softUpdateAccount',
    summary: 'user update name, bio',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'account updated successfully',
  })
  @ApiBody({ type: SoftUpdateAccountDto })
  @SecurityDecorator()
  @Put('')
  async softUpdateAccount(
    @User('') userData: TokenDetailsDto,
    @Body('') input: SoftUpdateAccountDto,
  ) {
    return await this.accountSrv.profileSoftUpdate(userData, input);
  }

  @ApiOperation({
    operationId: 'getAccountDetails',
    summary: 'get user details',
  })
  // @UseInterceptors(UserResBodyInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user details',
  })
  @ApiParam({ name: 'userId' })
  @Get('/:userId')
  async getAccountDetails(@Param('userId') userId: string) {
    return await this.accountSrv.getAccountDetails(userId);
  }
}
