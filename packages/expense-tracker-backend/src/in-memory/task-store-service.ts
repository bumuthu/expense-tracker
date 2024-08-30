import { TaskModel, TaskStatus } from "expense-tracker-common";
import { AbstractTaskStore } from "./abstract-task-store";
import { initialTasks } from "../data/initial-tasks";

export class TaskStoreService extends AbstractTaskStore {
    private records: TaskModel[] = [];
    private static instace: TaskStoreService = new TaskStoreService();

    private constructor() {
        super()
        this.records = initialTasks;
    }

    public static getInstance() {
        return TaskStoreService.instace;
    }

    public get(title?: string): TaskModel[] {
        if (title) {
            const filteredTasks = this.records.filter(task =>
                task.title.toLowerCase().includes(title.toLowerCase())
            );
            return filteredTasks;
        } else {
            return this.records
        }
    }

    public create(data: TaskModel): TaskModel {
        const newTodo: TaskModel = {
            ...data,
            createdAt: Date.now().toString(),
            status: TaskStatus.TODO,
            id: this.getNextId()
        }
        this.records.push(newTodo)
        return newTodo;
    }

    public update(data: TaskModel): TaskModel {
        const record = this.records.find(r => r.id == data.id)
        if (!record) {
            throw new Error("Record not found");
        }
        const index = this.records.indexOf(record);
        const newRecord = {
            ...record,
            status: data.status
        }
        this.records.splice(index, 1, newRecord)
        return newRecord;
    }

    public delete(id: number) : TaskModel {
        const record = this.records.find(r => r.id == id)
        if (!record) {
            throw new Error("Record not found");
        }
        const index = this.records.indexOf(record);
        this.records.splice(index, 1)
        return record;
    }
}