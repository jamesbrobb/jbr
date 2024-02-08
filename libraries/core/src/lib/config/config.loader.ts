

export class ConfigLoader<T extends {[key: PropertyKey]: unknown}> {

  readonly #path: string;

  #config?: T;

  constructor(path: string) {
    this.#path = path;
  }

  async load(): Promise<boolean> {
    const response = await fetch(this.#path);
    this.#config = await response.json()
    return true;
  }

  getValueByKey(key: keyof T): T[keyof T] | undefined {
    return this.#config?.[key];
  }
}
