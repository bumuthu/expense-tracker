import { TaskModel } from "expense-tracker-common";

export abstract class AbstractTaskStore {
    private latestId: number = 1;

    public getNextId(): number {
        this.latestId++
        return this.latestId;
    }

    public abstract get(title?: string): TaskModel[] ;
    public abstract create(data: TaskModel): TaskModel;
    public abstract update(data: TaskModel): TaskModel;
    public abstract delete(id: number): TaskModel;
}