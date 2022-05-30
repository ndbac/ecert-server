import { Prop, Schema } from '@nestjs/mongoose';
import { EmbeddedDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';

@Schema(DefaultSchemaOptions)
export class AccuracyDocument extends EmbeddedDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  data: string;

  @Prop({ required: true })
  qrCode: string;

  @Prop({ required: true })
  signature: string;
}
