import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { MovementOutput } from '../deferred-movement/dto/types';
import { NoteMovement } from './note-movement.entity';
import { NoteMovementService } from './note-movement.service';
import { ResponseGraphql } from 'src/config/graphql-response/response-graphql';
import {
  EnumTypeNote,
  NoteMovementInput,
  NoteMovementPayment,
} from './dto/types';
import { Movement } from '../movement/movement.entity';
import { InputSearchMovement } from '../movement/dto/types';

@Resolver(() => NoteMovement)
export class NoteMovementResolver {
  constructor(private readonly noteMovementService: NoteMovementService) {}

  @Query(() => [MovementOutput])
  async findMovementsNote(
    @Args('data', { type: () => InputSearchMovement })
    data: InputSearchMovement,
  ) {
    return await this.noteMovementService.find(data);
  }
  @Query(() => NoteMovement)
  async findMovementNote(@Args('idMovement') idMovement: string) {
    return await this.noteMovementService.findOne({
      where: { movementId: idMovement },
      relations: {
        movement: true,
        account_movement: true,
      },
    });
  }

  @Mutation(() => ResponseGraphql)
  async createNote(@Args('data') data: NoteMovementInput) {
    return this.noteMovementService.create(data);
  }

  @Mutation(() => ResponseGraphql)
  async updateNote(
    @Args('data') data: NoteMovementInput,
    @Args('idMovement') idMovement: string,
  ) {
    return this.noteMovementService.update(data, idMovement);
  }
  @Query(() => ResponseGraphql)
  async isUpdateNote(@Args('idMovement') idMovement: string) {
    return this.noteMovementService.isUpdate(idMovement);
  }

  @Query(() => [NoteMovementPayment])
  async getNotesPayment(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
    @Args('type') typeNote: EnumTypeNote,
  ): Promise<NoteMovementPayment[]> {
    return await this.noteMovementService.findMovementPayment(
      startDate,
      endDate,
      typeNote,
    );
  }
}
