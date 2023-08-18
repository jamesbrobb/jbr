
export class StringUtils {

    public static replaceMultiple(source: string, targetValues: string[], values: string[]): string {

        let result: string = source;

        targetValues.forEach((targetValue: string, index: number) => {
            result = result.replace(targetValue, values[index]);
        });

        return result;
    }

    public static toCamelCase(text: string): string {
        return text.replace(/-\w/g, (txt) => this._clearAndUpper(txt));
    }

    public static toPascalCase(text: string): string {
        return text.replace(/(^\w|-\w)/g, (txt) => this._clearAndUpper(txt));
    }

    public static toKebabCase(text: string): string {
        return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    public static toClassCase(text: string): string {
      return text.replace(/(?:^|[-_/])(\w)/g, (txt) => this._clearAndUpper(txt));
    }

    public static toConstantCase(text: string): string {
      return text.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
    }

    public static toSnakeCase(text: string): string {
      return text.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    public static toWords(text: string): string {
      return text.replace(/(?:^|[-_/])(\w)/g, (txt) => this._clearAndUpper(txt, ' '));
    }

    private static  _clearAndUpper(text: string, delimiter=""): string {
        return text.replace(/-/, delimiter).toUpperCase();
    }
}
