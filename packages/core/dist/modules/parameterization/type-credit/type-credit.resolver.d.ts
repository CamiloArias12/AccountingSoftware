import { TypeCreditService } from './type-credit.service';
import { TypeCredit } from './type-credit.entity';
import { CreateTypeCreditDto } from './dto/createTypeCredit.dto';
import { UpdateTypeCreditDto } from './dto/updateTypeCredit.dto';
export declare class TypeCreditResolver {
    private readonly typeCreditService;
    constructor(typeCreditService: TypeCreditService);
    createTypeCredit(input: CreateTypeCreditDto): Promise<TypeCredit>;
    allTypeCredits(): Promise<TypeCredit[]>;
    typeCredit(id: number): Promise<TypeCredit>;
    updateTypeCredit(id: number, input: UpdateTypeCreditDto): Promise<TypeCredit>;
    deleteTypeCredit(id: number): Promise<boolean>;
}
