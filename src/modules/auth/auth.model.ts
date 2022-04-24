import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDocument } from 'src/shared/mongoose/base.document';
import { IamNamespace } from 'src/shared/types';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';

@Schema(DefaultSchemaOptions)
export class AuthDocument extends BaseDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null, nullable: true })
  access_token: string;

  @Prop({ default: true, required: true })
  active: boolean;

  @Prop({ default: false, required: true })
  verify: boolean;

  @Prop({ default: new Date(), required: true })
  passwordChanged: Date;

  @Prop({ default: IamNamespace.USER, required: true })
  namespace: IamNamespace;
}