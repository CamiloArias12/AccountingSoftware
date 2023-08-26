import { Repository } from 'typeorm';
import { Auxiliary } from './auxiliary.entity';
import { CreateAuxiliaryDto } from './dto/createAuxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/updateAuxiliary.dto';
export declare class AuxiliaryService {
    private readonly auxiliaryRepository;
    constructor(auxiliaryRepository: Repository<Auxiliary>);
    create(createAuxiliaryDto: CreateAuxiliaryDto): Promise<Auxiliary>;
    findAll(): Promise<Auxiliary[]>;
    findOne(code: number): Promise<Auxiliary>;
    update(code: number, updateAuxiliaryDto: UpdateAuxiliaryDto): Promise<Auxiliary>;
    remove(code: number): Promise<void>;
}
