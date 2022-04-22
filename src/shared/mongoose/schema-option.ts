import { SchemaOptions } from '@nestjs/mongoose';

export const DefaultSchemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: { versionKey: false },
};
