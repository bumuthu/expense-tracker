import { Request, Response, Express } from 'express';
import { AbstractTaskStore } from '../in-memory/abstract-task-store';
import { TaskStoreService } from '../in-memory/task-store-service';
import { TaskModel } from 'expense-tracker-common';

export class TaskRegister {
    private taskStore: AbstractTaskStore;

    constructor() {
        this.taskStore = TaskStoreService.getInstance();
    }

    public registerGetTasks(express: Express) {
        express.get('/tasks', (req: Request, res: Response) => {
            console.log("Calling get tasks, params", req.query);
            try {
                const { title } = req.query;
                const tasks = this.taskStore.get(title as string);
                res.status(200).json(tasks);
            } catch (err) {
                console.error("Failed to get tasks:", err)
                res.status(500).json({ message: "Failed to get tasks" });
            }
        });
    };

    public registerCreateTask(express: Express) {
        express.post('/tasks', (req: Request, res: Response) => {
            console.log("Calling post tasks");
            try {
                const { title, description } = req.body;
                if (!title) {
                    res.status(400).json({ message: "Title is required" });
                    return;
                }
                const taskCreated = this.taskStore.create({ title, description } as TaskModel);
                res.status(201).json(taskCreated);
            } catch (err) {
                console.error("Failed to create task:", err)
                res.status(500).json({ message: "Failed to create task" });
            }
        });
    };

    public registerUpdateTask(express: Express) {
        express.put('/tasks/:id', (req: Request, res: Response) => {
            console.log("Calling put tasks, params", req.params);
            try {
                const { id } = req.params;
                const { status } = req.body;
                if (!id) {
                    res.status(400).json({ message: "Task ID in path is required" });
                    return;
                }
                if (status == undefined) {
                    res.status(400).json({ message: "Status is required" });
                    return;
                }
                const taskUpdated = this.taskStore.update({ status, id: parseInt(id) } as TaskModel);
                res.status(200).json(taskUpdated);
            } catch (err) {
                console.error("Failed to update task:", err)
                res.status(500).json({ message: "Failed to update task" });
            }
        });
    };

    public registerDeleteTask(express: Express) {
        express.delete('/tasks/:id', (req: Request, res: Response) => {
            console.log("Calling delete tasks, params", req.params);
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: "Task ID in path is required" });
                    return;
                }
                const taskDeleted = this.taskStore.delete(parseInt(id));
                res.status(200).json(taskDeleted);
            } catch (err) {
                console.error("Failed to delete task:", err)
                res.status(500).json({ message: "Failed to delete task" });
            }
        });
    };
}