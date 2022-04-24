import { Prop, Schema } from '@nestjs/mongoose';
import { EmbeddedDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';

@Schema(DefaultSchemaOptions)
export class PostDocument extends EmbeddedDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: 0, required: true })
  viewCount: number;

  @Prop({ required: true })
  photoUrl: string[];

  @Prop({ default: null, nullable: true })
  categoriesId: string[];
}
