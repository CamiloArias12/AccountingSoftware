import { TypeSavingService } from './type-saving.service';
import { TypeSaving } from './type-saving.entity';
import { CreateTypeSavingDto } from './dto/createTypeSaving.dto';
import { UpdateTypeSavingDto } from './dto/updateTypeSaving.dto';
export declare class TypeSavingResolver {
    private readonly typeSavingService;
    constructor(typeSavingService: TypeSavingService);
    createTypeSaving(input: CreateTypeSavingDto): Promise<TypeSaving>;
    allTypeSavings(): Promise<TypeSaving[]>;
    typeSaving(id: number): Promise<TypeSaving>;
    updateTypeSaving(id: number, input: UpdateTypeSavingDto): Promise<TypeSaving>;
    deleteTypeSaving(id: number): Promise<boolean>;
}
