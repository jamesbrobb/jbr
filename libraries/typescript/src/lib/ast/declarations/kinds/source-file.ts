import {DeclarationKind} from "../declaration-kind";
import {Declaration} from "../declaration-types";


export type SourceFileDeclaration = {
  fileName: string,
  path: string,
  imports: Declaration<any>[],
  exports: Declaration<any>[],
} & Declaration<DeclarationKind.SOURCE_FILE>;
