import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';

@Resolver(() => Provider)
export class ProviderResolver {
  constructor(private readonly providerService: ProviderService) {}


  @Query(() => [Provider], { name: 'provider' })
  findAll() {
    return this.providerService.findAll();
  }

  @Query(() => Provider, { name: 'provider' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.providerService.findOne(id);
  }

  @Mutation(() => Provider)
  removeProvider(@Args('id', { type: () => Int }) id: number) {
    return this.providerService.remove(id);
  }
}
