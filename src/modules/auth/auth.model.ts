import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDocument } from 'src/shared/mongoose/base.document';
import { IamNamespace } from 'src/shared/types';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';

const defaultPhotoUrl = process.env.DEFAULT_PROFILE_PHOTO;

@Schema(DefaultSchemaOptions)
export class AuthDocument extends BaseDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: null, nullable: true })
  bio: string;

  @Prop({ default: true, required: true })
  active: boolean;

  @Prop({ default: false, required: true })
  verify: boolean;

  @Prop({ default: defaultPhotoUrl, required: true })
  photoUrl: string;

  @Prop({ default: new Date(), required: true })
  passwordChanged: Date;

  @Prop({ default: IamNamespace.USER, required: true })
  namespace: IamNamespace;
}
