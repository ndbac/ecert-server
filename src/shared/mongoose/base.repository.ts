import { NotFoundException } from '@nestjs/common';
import {
  Document,
  Model,
  SaveOptions,
  FilterQuery,
  QueryOptions,
} from 'mongoose';
import { merge } from 'lodash';
import { isObjectId } from './helpers';

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

  async findById(
    id: any,
    options?: QueryOptions,
    projection: any = null,
  ): Promise<T | null> {
    if (!isObjectId(id)) return null;
    return this.findOne({ _id: id }, options, projection);
  }

  async findOne(
    conditions: FilterQuery<T>,
    options?: QueryOptions,
    projection: any = null,
  ): Promise<T | null> {
    const query = this.model.findOne(conditions, projection, options);
    return query.exec();
  }

  async findOneOrCreate(
    conditions: FilterQuery<T>,
    doc: Record<string, any>,
    options?: QueryOptions,
  ): Promise<T> {
    let document = await this.findOne(conditions, options);
    if (!document) {
      document = await this.create(merge({}, conditions, doc), options);
    }
    return document;
  }

  async findByIdOrFail(
    id: any,
    options?: QueryOptions,
    projection: any = null,
  ): Promise<T> {
    if (!isObjectId(id)) {
      return this.throwErrorNotFound();
    }
    const instance = await this.findById(id, options, projection);
    if (!instance) {
      return this.throwErrorNotFound();
    }

    return instance;
  }

  async findOneOrFail(
    conditions: FilterQuery<T>,
    options?: QueryOptions,
    projection: any = null,
  ): Promise<T> {
    const res = await this.findOne(conditions, options, projection);
    if (!res) {
      return this.throwErrorNotFound();
    }
    return res;
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

  throwErrorNotFound(): never {
    throw new NotFoundException();
  }

  private async isCollectionExists(): Promise<boolean> {
    const result = await this.model.db.db
      .listCollections({ name: this.model.collection.collectionName })
      .next();
    return !!result;
  }
}
