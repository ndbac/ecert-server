import { Prop, Schema } from '@nestjs/mongoose';
import { EmbeddedDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';

@Schema(DefaultSchemaOptions)
export class CommentDocument extends EmbeddedDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  text: string;

  @Prop({
    require: true,
    description: 'id of the post/comment that it replies',
  })
  parentId: string;
}
