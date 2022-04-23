import { Prop, Schema } from '@nestjs/mongoose';
import { EmbeddedDocument } from 'src/shared/mongoose/base.document';
import { DefaultSchemaOptions } from 'src/shared/mongoose/schema-option';
import { ENotificationType } from './types';
import { EEmailOption } from '../util/types';

@Schema({ _id: false })
export class EmailDetails extends EmbeddedDocument {
  @Prop()
  sender?: string;

  @Prop()
  recipient?: string;

  @Prop()
  body?: string;

  @Prop()
  subject?: string;

  @Prop({ required: true })
  option: EEmailOption;

  @Prop({ required: true })
  type: ENotificationType;
}

@Schema(DefaultSchemaOptions)
export class EmailNotifcationLog extends EmbeddedDocument {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({
    required: true,
    type: EmailDetails.schema,
  })
  emailDetail: EmailDetails;
}
