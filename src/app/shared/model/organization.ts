import {EnumType} from '../interfaces/enum-type';

export class Organization {
  constructor(public id: number, public name: string, public status: EnumType) {
  }
}
