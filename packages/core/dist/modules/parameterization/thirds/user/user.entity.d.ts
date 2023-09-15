import { iUser } from "./dto/user.interface";
import { Affiliate } from "../affiliate/affiliate.entity";
import { Employee } from "../employee/employee.entity";
export declare class User implements iUser {
    typeidentification: string;
    identification: number;
    expeditionDate: Date;
    expeditionCity: string;
    countryCard: string;
    municipalityCard: String;
    cityCard: String;
    name: string;
    lastName: string;
    gender: string;
    statusCivil: string;
    addressResidence: string;
    municipality: String;
    city: String;
    phone: number;
    landLine: number;
    email: string;
    housingType: string;
    studies: string;
    profession: string;
    foreignOperations: boolean;
    publicResources: boolean;
    publicRecognition: boolean;
    publicPower: boolean;
    status: boolean;
    affiliate: Affiliate;
    employee: Employee;
}
