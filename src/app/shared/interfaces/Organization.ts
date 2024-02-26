import {Status} from '../enums/Status';

export interface Organization {
  id: number,
  name: string,
  status: Status
}
