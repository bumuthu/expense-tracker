import { Document, Model } from "mongoose";
import connectToTheDatabase from "../utils/mongo-connection";
import { EntityModel } from "expense-tracker-common";

export class EntityService<E extends EntityModel, D extends Document> {
    protected dbModel: Model<D>;

    constructor(dbModel: Model<D>) {
        this.dbModel = dbModel;
    }

    protected async before() {
        await connectToTheDatabase();
    }

    async get(key: string, populate?: any): Promise<E> {
        try {
            await this.before();
            if (populate) {
                return this.dbModel.findById(key).populate(populate) as any;
            }
            return this.dbModel.findById(key) as any;
        } catch (e: any) {
            console.error("Error: get,", e);
            throw e;
        }
    }

    async getAll(populate?: any): Promise<E[]> {
        try {
            await this.before();
            if (populate) {
                return this.dbModel.find().populate(populate);
            }
            return this.dbModel.find();
        } catch (e: any) {
            console.error("Error: get,", e);
            throw e;
        }
    }

    async create(data: any): Promise<E> {
        try {
            await this.before();
            return this.dbModel.create(data) as any;
        } catch (e: any) {
            console.error("Error: create,", e);
            throw e;
        }
    }

    async update(key: string, update: any, populate?: any): Promise<E | null> {
        try {
            await this.before();
            if (populate) {
                return this.dbModel.findByIdAndUpdate(key, update, { new: true }).populate(populate) as any;
            }
            return this.dbModel.findByIdAndUpdate(key, update, { new: true }) as any;
        } catch (e: any) {
            console.error("Error: update,", e);
            throw e;
        }
    }

    async delete(key: string): Promise<E | null> {
        try {
            await this.before();
            return this.dbModel.findByIdAndDelete(key);
        } catch (e: any) {
            console.error("Error: delete,", e);
            throw e;
        }
    }

    static getEntityKey(data: EntityModel): string {
        return data["_id"] as string
    }
}