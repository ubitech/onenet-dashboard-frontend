export class Address {
  constructor(
    private state = '',
    private postcode = '',
    private country = '',
    private houseNumber = '',
    private road = '',
    private suburb = '',
    private town = '') {
  }

  getAddressDescription(): string {
    return `${this.road} ${this.houseNumber},${this.suburb ? this.suburb : this.town},${this.postcode},${this.state},
    ${this.country}`.replace(',,', ',').trim();

  }
}
