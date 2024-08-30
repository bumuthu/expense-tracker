import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { TaskRegister } from './services/task-service';
import cors from 'cors';
import { BACKEND_PORT } from './constants/constants';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

const register = new TaskRegister();
register.registerGetTasks(app);
register.registerCreateTask(app);
register.registerUpdateTask(app);
register.registerDeleteTask(app);

app.listen(BACKEND_PORT, () => {
    console.log(`Server is running at http://localhost:${BACKEND_PORT}`);
});
