import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Privacy, Repeat, Category } from '../../enums/event.enum';
import { TicketType } from '../../enums/ticket.enum';

export class CreateEventDto {
  /* 
  Event Metadata
  */
  @IsString()
  eventTitle: string;

  @IsString()
  @IsEnum(Privacy)
  privacy: Privacy;

  @IsString()
  @IsEnum(Repeat)
  repeat: Repeat;

  @IsOptional()
  repeatEndDt?: string;

  @IsOptional()
  password?: string;

  onOffline: string;

  @IsString()
  eventAddress1: string;

  @IsString()
  @IsOptional()
  eventAddress2?: string;

  eventStartDt!: string;

  eventEndDt!: string;

  description: string;

  @IsEnum(Category)
  category: Category;

  /* 
  Ticket Metadata
  */

  @IsString()
  @IsOptional()
  ticketName?: string;

  @IsEnum(TicketType)
  @IsOptional()
  ticketType?: TicketType;

  @IsOptional()
  ticketQuantity?: string;

  @IsOptional()
  ticketPrice?: string;

  @IsOptional()
  salesStartDt?: string;

  @IsOptional()
  salesEndDt?: string;

  /* 
   SBT Metadata
  */

  @IsString()
  sbtName: string;

  airdropDt: string;

  ticketContractAddress: string;
}
