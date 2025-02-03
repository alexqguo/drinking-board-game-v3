export abstract class BaseModel<T> {
  public data: T;

  public constructor(data: T) {
    this.data = data;
  }

  static fromJSON<T, U extends BaseModel<T>>(
    this: new (data: T) => U,
    data: unknown
  ): U {
    return new this(data as T);
  }
}