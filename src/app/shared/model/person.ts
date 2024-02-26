export class Person {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public gender?: { id?: string, description: string },
    public birthDate?: Date,
    public description?: string,
  ) {
  }

}
