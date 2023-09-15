import { User } from './user.entity';
import { QueryRunner, Repository } from 'typeorm';
import { UserInput } from './dto/input/createuser.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(dto: UserInput, queryRunner: QueryRunner | null): Promise<User>;
    findOne(identification: number): Promise<User | null>;
}
