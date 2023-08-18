

export interface ConfigParser {
  parse(): void
}


export class Config {

  private _config: {[key: string]: unknown} | undefined;

  constructor(
    private _path: string,
    private _parser?: ConfigParser
  ) {}

  load(): Promise<boolean> {
    return fetch(this._path)
      .then((response: Response) => response.json())
      .then(config => {
        this._config = config;
        return true;
      });
  }

  parse(): void {
    this._parser?.parse();
  }

  getValueByKey<T>(key: string): T {
    return this._config?.[key] as T;
  }
}
