import { Document, Model } from "mongoose";
import connectToTheDatabase from "../utils/mongo-connection";
import { EntityModel } from "expense-tracker-common";

export class EntityService<E extends EntityModel, D extends Document> {
    protected dbModel: Model<D>;

    constructor(dbModel: Model<D>) {
        this.dbModel = dbModel;
        this.before();
    }

    protected async before() {
        await connectToTheDatabase();
    }

    async get(key: string): Promise<E> {
        try {
            await this.before();
            return this.dbModel.findById(key) as Promise<E>;
        } catch (e: any) {
            console.error("Error: get,", e);
            throw e;
        }
    }

    async getAll(query: Record<string, any>): Promise<E[]> {
        try {
            await this.before();
            if (query && query.month) {
                const startDate = new Date(Number(query.month))
                const currentMonth = startDate.getMonth();
                const currentYear = startDate.getFullYear();
                const endTimestamp = new Date(currentYear, currentMonth + 1, 1, 0, 0, 0, 0).getTime();

                return this.dbModel.find({ date: { $gte: startDate.getTime(), $lt: endTimestamp } });
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
            return this.dbModel.create(data) as Promise<E>;
        } catch (e: any) {
            console.error("Error: create,", e);
            throw e;
        }
    }

    async update(key: string, update: any): Promise<E | null> {
        try {
            await this.before();
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