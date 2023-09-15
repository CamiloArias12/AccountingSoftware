import { Repository } from 'typeorm';
import { TypeSaving } from './type-saving.entity';
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { UpdateTypeSavingDto } from './dto/updateTypeSaving.dto';
export declare class TypeSavingService {
    private readonly typeSavingRepository;
    constructor(typeSavingRepository: Repository<TypeSaving>);
    create(createTypeSavingDto: CreateTypeSavingDto): Promise<TypeSaving>;
    findAll(): Promise<TypeSaving[]>;
    findOne(id: number): Promise<TypeSaving>;
    update(id: number, updateTypeSavingDto: UpdateTypeSavingDto): Promise<TypeSaving>;
    remove(id: number): Promise<void>;
}
