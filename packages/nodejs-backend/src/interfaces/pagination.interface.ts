import { Timestamp } from 'typeorm';
import { Status } from '../enums/event.enum';
import { SBTStatus } from '../enums/sbt.enum';
import { PermitStatus, TicketStatus } from '../enums/ticket.enum';

export interface SearchOption {
  search?: number;
  page?: number;
  status?: Status | TicketStatus | PermitStatus | SBTStatus;
  limit?: number;
  from?: any;
  to?: any;
  fromDate?: any;
  toDate?: any;
  previous?: boolean;
  // Offset = (page-1) * limit
}
