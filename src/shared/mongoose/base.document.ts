import { SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

export class BaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
  id: string;

  static get schema(): Schema {
    return SchemaFactory.createForClass(this as any);
  }
}

export class EmbeddedDocument extends Document {
  static get schema(): Schema {
    return SchemaFactory.createForClass(this as any);
  }
}
