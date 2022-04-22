import {
  Document,
  Model,
  SaveOptions,
} from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(public readonly model: Model<T>) {}

  async create(doc: Record<string, unknown>, options?: SaveOptions): Promise<T>;
  async create(
    docs: Record<string, unknown>[],
    options?: SaveOptions,
  ): Promise<T[]>;
  async create(
    docs: Record<string, any> | Record<string, any>[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    if (Array.isArray(docs)) {
      const result: T[] = [];
      for (const doc of docs) {
        result.push(await this.create(doc, options));
      }
      return result;
    }
    return this.save(new this.model(docs as any), options);
  }

  async save(doc: T, options?: SaveOptions): Promise<T>;
  async save(docs: T[], options?: SaveOptions): Promise<T[]>;
  async save(docs: T | T[], options?: SaveOptions): Promise<T | T[]> {
    if (Array.isArray(docs)) {
      const result: T[] = [];
      for (const doc of docs) {
        result.push(await this.save(doc, options));
      }
      return result;
    }
    return docs.save(options);
  }

  async createCollection(): Promise<void> {
    if (!(await this.isCollectionExists())) {
      await this.model.createCollection();
    }
  }

  private async isCollectionExists(): Promise<boolean> {
    const result = await this.model.db.db
      .listCollections({ name: this.model.collection.collectionName })
      .next();
    return !!result;
  }
}