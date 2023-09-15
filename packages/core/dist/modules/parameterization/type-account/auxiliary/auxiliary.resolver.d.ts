import { AuxiliaryService } from './auxiliary.service';
import { Auxiliary } from './auxiliary.entity';
import { CreateAuxiliaryDto } from './dto/createAuxiliary.dto';
import { UpdateAuxiliaryDto } from './dto/updateAuxiliary.dto';
export declare class AuxiliaryResolver {
    private readonly auxiliaryService;
    constructor(auxiliaryService: AuxiliaryService);
    createAuxiliary(input: CreateAuxiliaryDto): Promise<Auxiliary>;
    allAuxiliaries(): Promise<Auxiliary[]>;
    auxiliary(code: number): Promise<Auxiliary>;
    updateAuxiliary(code: number, input: UpdateAuxiliaryDto): Promise<Auxiliary>;
    deleteAuxiliary(code: number): Promise<boolean>;
}
