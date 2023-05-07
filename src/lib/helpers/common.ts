export function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export function getFilterString(...filters: string[]) {
  return filters.join('&');
}

export class PbFilter {
  private filters: string;

  constructor(...filters: string[]) {
    this.filters = filters.join('&');
  }

  public add(...filters: string[]) {
    this.filters = this.filters
      .split('&')
      .concat(filters)
      .filter((it) => !!it)
      .join('&');
  }

  public get() {
    return this.filters;
  }
}
