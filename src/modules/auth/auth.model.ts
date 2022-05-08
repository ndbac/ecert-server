import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDocument } from 'src/shared/mongoose/base.document';
import { IamNamespace } from 'src/shared/types';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';
import { Exclude } from 'class-transformer';

const defaultPhotoUrl = process.env.DEFAULT_PROFILE_PHOTO;

@Schema(DefaultSchemaOptions)
export class AuthDocument extends BaseDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null, nullable: true })
  bio: string;

  @Prop({ default: true, required: true })
  active: boolean;

  @Prop({ default: false, required: true })
  verify: boolean;

  @Prop({ default: defaultPhotoUrl, required: true })
  photoUrl: string;

  @Exclude()
  @Prop({ default: new Date(), required: true })
  passwordChanged: Date;

  @Prop({ required: true })
  namespace: IamNamespace;
}
