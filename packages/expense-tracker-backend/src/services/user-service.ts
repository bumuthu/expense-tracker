import { UserModel } from "expense-tracker-common";
import { EntityService } from "./entity.service";
import UserDBModel, { UserDocument } from "../models/user.model";

export class UserService extends EntityService<UserModel, UserDocument> {
    constructor() {
        super(UserDBModel);
    }
}