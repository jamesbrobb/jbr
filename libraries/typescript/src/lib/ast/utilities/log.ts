

export function log(message: any, header?: string): void {
  console.log(`-----------${header || '-----------'}-----------`);
  console.log(message);
  console.log('----------------------------------');
}
