import * as mongoose from 'mongoose';

export function isObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}
