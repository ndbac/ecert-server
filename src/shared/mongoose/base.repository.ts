import { NotFoundException } from '@nestjs/common';
import {
  ClientSession,
  Document,
  Model,
  SaveOptions,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { TransactionOptions } from 'mongodb';
import { merge, slice } from 'lodash';
import { isObjectId } from './helpers';

interface IDeleteOptions {
  session?: ClientSession | null;
}

export class BaseRepository<T extends Document> {
  protected primaryKey = '_id';

  constructor(public readonly model: Model<T>) {}

  aggregate<X = any>(aggregations?: any[]): Promise<X[]> {
    aggregations = slice(aggregations);
    console.log(aggregations);
    return this.model.aggregate<T>(aggregations).exec();
  }

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

  async find(
    conditions: FilterQuery<T>,
    options?: QueryOptions,
    projection: any = null,
  ): Promise<T[]> {
    const query = this.model.find(conditions, projection, options);
    return query.exec();
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

  async update(
    conditions: FilterQuery<T>,
    doc: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions | null,
  ): Promise<number> {
    const result = await this.model.updateOne(conditions, doc, options).exec();

    return result.ok ? result.nModified : 0;
  }

  async updateById(
    id: any,
    doc: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions & { rawResult: boolean },
  ): Promise<T | null> {
    return this.updateOne({ _id: id }, doc, options);
  }

  async updateMany(
    conditions: FilterQuery<T>,
    doc: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<number> {
    const result = await this.model.updateMany(conditions, doc, options).exec();
    return result.ok ? result.nModified : 0;
  }

  async updateOne(
    conditions: FilterQuery<T>,
    doc: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions & { rawResult: boolean },
  ): Promise<T | null> {
    return this.model
      .findOneAndUpdate(conditions, doc, merge({ new: true }, options))
      .exec();
  }

  async updateOneOrCreate(
    conditions: FilterQuery<T>,
    doc: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions & { rawResult: boolean },
  ): Promise<T | null> {
    return this.updateOne(
      conditions,
      doc,
      merge({ new: true, upsert: true, setDefaultsOnInsert: true }, options),
    );
  }

  async delete(doc: T, options?: IDeleteOptions): Promise<T>;
  async delete(docs: T[], options?: IDeleteOptions): Promise<T[]>;
  async delete(docs: T | T[], options?: IDeleteOptions): Promise<T | T[]> {
    if (Array.isArray(docs)) {
      const result: T[] = [];
      for (const doc of docs) {
        result.push(await this.delete(doc, options));
      }
      return result;
    }
    if (options && options.session) {
      docs.$session(options.session);
    }
    return docs.remove();
  }

  async deleteById(id: any, options?: QueryOptions): Promise<T | null> {
    if (!isObjectId(id)) return null;
    return this.deleteOne({ _id: id });
  }

  async deleteMany(
    conditions: FilterQuery<T>,
    options?: IDeleteOptions,
  ): Promise<number> {
    let query = this.model.deleteMany(conditions);
    if (options && options.session) {
      query = query.session(options.session);
    }
    const result = await query.exec();
    return result.ok ? result.n || 0 : 0;
  }

  async deleteOne(
    conditions: FilterQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model.findOneAndDelete(conditions, options).exec();
  }

  async withTransaction<U>(
    fn: (session: ClientSession) => Promise<U>,
    options?: TransactionOptions,
  ): Promise<U | null> {
    const session = await this.model.db.startSession();
    let result: U | null = null;
    try {
      await session.withTransaction(async (ses) => {
        result = await fn(ses);
      }, options);
      return result;
    } finally {
      session.endSession();
    }
  }

  async exists(conditions: FilterQuery<T>): Promise<boolean> {
    return this.model.exists(conditions);
  }

  async existsById(id: any): Promise<boolean> {
    if (!isObjectId(id)) return false;
    return this.exists({ _id: id });
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
