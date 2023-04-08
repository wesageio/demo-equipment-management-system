import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { EmployeesModule } from '../employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Organizations } from './schemas/organizations.entity';
import { Queries } from '../employees/customQueries/queries';
import { Employees } from '../employees/schemas/employees.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Organizations, Employees]),
    // MongooseModule.forFeature([{ name: Organizations.name, schema: OrganizationsSchema }]),
    EmployeesModule,
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, Queries],
})
export class OrganizationsModule {}
