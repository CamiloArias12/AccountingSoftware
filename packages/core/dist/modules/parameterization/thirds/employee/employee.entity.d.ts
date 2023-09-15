import { User } from "../user/user.entity";
import { IEmployee } from "./dto/employee.interface";
export declare class Employee implements IEmployee {
    idEmployee: number;
    username: string;
    password: string;
    user: User;
}
