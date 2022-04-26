import { Prop, Schema } from '@nestjs/mongoose';
import { EmbeddedDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';

@Schema(DefaultSchemaOptions)
export class CategoryDocument extends EmbeddedDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 0, required: true })
  postCount: number;

  @Prop({ required: true, unique: true })
  slug: string;
}
