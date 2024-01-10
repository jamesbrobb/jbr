
import {
  CommonPathHandler,
  JBRPathHandler,
  NgPathHandler,
  NodeModulesPathHandler,
  RxjsPathHandler,
  AngularMaterialPathHandler,
  parseDeclaration,
  parse
} from "../libraries/ts";


const pathHandlers = [
  new CommonPathHandler(),
  new NodeModulesPathHandler(),
  new AngularMaterialPathHandler(),
  new NgPathHandler(),
  new RxjsPathHandler(),
  new JBRPathHandler()
]

const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/core/src/lib/analytics/analytics-service.ts';
//const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/core/src/lib/commands/command/command.ts';
//const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/ui/src/lib/common/overlay/color/color-overlay.component.ts';
//const sourcePath = '/Users/James/WebstormProjects/jbr/libraries/ui/src/lib/forms/codemirror/codemirror.component.ts';


const source = parse({
  debug: false,
  lazy: false,
  walk: false,
  nodeParseFn: parseDeclaration,
  sourcePath,
  pathHandlers
});

console.log(source);

