import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {InfosFinanciera, InfosFinancieraRelations} from '../models';

export class InfosFinancieraRepository extends DefaultCrudRepository<
  InfosFinanciera,
  typeof InfosFinanciera.prototype.id,
  InfosFinancieraRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(InfosFinanciera, dataSource);
  }
}
