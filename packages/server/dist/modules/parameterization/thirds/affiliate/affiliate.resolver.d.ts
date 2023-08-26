import { AffiliateService } from './affiliate.service';
import { Affiliate } from './affiliate.entity';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { BeneficiariesInput } from './beneficiary/dto/createBeneficiary.dto';
import { UserInput } from '../user/dto/input/createuser.dto';
export declare class AffiliateResolver {
    private readonly afiliateService;
    private readonly userService;
    constructor(afiliateService: AffiliateService, userService: UserService);
    createAfiliate(inputAffiliate: CreateAfiliateDto, inputUser: UserInput, inputBeneficiaries: BeneficiariesInput): Promise<Affiliate>;
    allAfiliates(): Promise<Affiliate[]>;
    getAffiliate(identification: number): Promise<Affiliate>;
    afiliate(id: number): Promise<User>;
    updateAfiliate(id: number, input: UpdateAfiliateDto): Promise<Affiliate>;
}
