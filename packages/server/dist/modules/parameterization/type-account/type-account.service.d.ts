import { TypeAccount } from './type-account.entity';
import { Repository } from 'typeorm';
export declare class TypeAccountService {
    private readonly typeAccountRepository;
    constructor(typeAccountRepository: Repository<TypeAccount>);
    create(data: Partial<TypeAccount>): Promise<TypeAccount>;
    findAll(): Promise<TypeAccount[]>;
    findOne(code: number): Promise<TypeAccount>;
    update(code: number, data: Partial<TypeAccount>): Promise<TypeAccount>;
    remove(code: number): Promise<void>;
}
