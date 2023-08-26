import { Repository } from 'typeorm';
import { Auxiliary } from './auxiliary.entity';
import { CreateAuxiliaryDto } from './dto/createAuxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/updateAuxiliary.dto';
import { TypeAccountService } from '../type-account.service';
export declare class AuxiliaryService {
    private readonly auxiliaryRepository;
    private readonly typeAccountService;
    constructor(auxiliaryRepository: Repository<Auxiliary>, typeAccountService: TypeAccountService);
    create(createAuxiliaryDto: CreateAuxiliaryDto): Promise<Auxiliary>;
    findAll(): Promise<Auxiliary[]>;
    findOne(code: number): Promise<Auxiliary>;
    update(code: number, updateAuxiliaryDto: UpdateAuxiliaryDto): Promise<Auxiliary>;
    remove(code: number): Promise<void>;
}
