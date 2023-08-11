import { KeyValueObject, Operator } from "./query";

export class Filter {
  constructor(
    public readonly key: string,
    public readonly operator: Operator,
    public readonly value: any
  ) {}

  apply<T extends KeyValueObject>(data: T[]): T[] {
    return data.filter((d) => {
      const actualValue = d[this.key];
      switch (this.operator) {
        case Operator.EQUALS:
          return actualValue === this.value;
        case Operator.NOT_EQUALS:
          return actualValue !== this.value;
        case Operator.CONTAINS:
          return (actualValue as string).includes(this.value);
        case Operator.ENDS_WITH:
          return (actualValue as string).endsWith(this.value);
        case Operator.STARTS_WITH:
          return (actualValue as string).startsWith(this.value);
      }
    });
  }
}
