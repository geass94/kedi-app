export class User {
  private _id: number;
  private name: string;
  private email: string;
  private password: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
