import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';

@Schema(DefaultSchemaOptions)
export class VerifyDocument extends BaseDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ default: null, nullable: true })
  passwordResetToken: string;

  @Prop({ default: null, nullable: true })
  passwordResetExpires: Date;

  @Prop({ default: null, nullable: true })
  verificationToken: string;

  @Prop({ default: null, nullable: true })
  verificationTokenExpires: string;
}
