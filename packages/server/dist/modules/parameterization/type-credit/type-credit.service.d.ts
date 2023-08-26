import { Repository } from 'typeorm';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { UpdateTypeCreditDto } from './dto/updateTypeCredit.dto';
export declare class TypeCreditService {
    private readonly typeCreditRepository;
    constructor(typeCreditRepository: Repository<TypeCredit>);
    create(createTypeCreditDto: CreateTypeCreditDto): Promise<TypeCredit>;
    findAll(): Promise<TypeCredit[]>;
    findOne(id: number): Promise<TypeCredit>;
    update(id: number, updateTypeCreditDto: UpdateTypeCreditDto): Promise<TypeCredit>;
    remove(id: number): Promise<void>;
}
