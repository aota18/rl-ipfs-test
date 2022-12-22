import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Country } from '../../enums/country.enum';
import { MARRIED_STATUS } from '../../enums/user.enum';

export class UpdateUserInput {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum(Country)
  @IsOptional()
  nationality?: Country;

  @IsOptional()
  birthday?: number;

  @IsString()
  @IsOptional()
  companyAddress1?: string;

  @IsString()
  @IsOptional()
  companyAddress2?: string;

  @IsString()
  @IsOptional()
  twitterHandle?: string;

  @IsOptional()
  married: MARRIED_STATUS;

  @IsOptional()
  marriageDt: number;

  @IsString()
  @IsOptional()
  ens: string;
}
