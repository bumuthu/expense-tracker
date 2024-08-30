import { EntityModel } from "./entity.model";

export interface UserModel extends EntityModel {
    name: string;
    email: string;
}