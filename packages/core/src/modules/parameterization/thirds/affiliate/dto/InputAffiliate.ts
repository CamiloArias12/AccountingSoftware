import { Field, InputType, } from "@nestjs/graphql";
import { BeneficiariesInput} from "../beneficiary/dto/createBeneficiary.dto";
import { CreateAfiliateDto } from "./createAfiliate.dto";

@InputType()
export class InputAffiliateCreate {
      
      @Field()
      inputAffiliate:CreateAfiliateDto
      
      @Field()
      beneficiary:BeneficiariesInput

}
