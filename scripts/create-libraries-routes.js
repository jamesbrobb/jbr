const fs = require('fs');
const PATH = require('path');
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const directoryTree = require('directory-tree');


/*function walk(arg, cb) {
  for (let i = 0; i < arg.length; i++) {
    const node = cb(arg[i]);

    if(!node.children) {
      continue;
    }

    walk(node.children, cb);
  }
}*/

function walk(node, cb) {

  if (node.children !== undefined) {
    node.children.forEach((child) => {
      walk(child, cb);
    });
  }

  cb(node);
}


function parsePageData(node) {

  if(!node.children) {
    return;
  }

  const readme = node.children.find(child => child.name === 'README.md');
  const readmeDir = node.children.find(child => child.name === '.README');

  if(!readme && !readmeDir) {
    return
  }

  let pageData;

  if(readme && !readmeDir) {
    pageData = getPageData(node)
    node.description = readme.path;
  }

  if(readmeDir) {
    pageData = getPageData(node, readmeDir.children)
  }

  if(pageData) {
    for (key in pageData) {
      node[key] = pageData[key]
    }
  }

  node.children = node.children.filter(child => !child.name.includes('README'));
}

function getPageData(node, children) {

  const parts = node.name.split('.'),
    type = parts.length > 1 ? parts.pop() : '',
    name = parts[0];

  const pageData = {
    path: name,
    type,
    githubLink: `${node.path.replace('/.README', '')}.ts`
  }

  if(children) {

    children.forEach(child => {

      if (child.name === 'DESCRIPTION.md') {
        pageData.description = child.path;
      }

      if (child.name === 'EXAMPLE.md') {
        pageData.info = pageData.info || [];
        pageData.info.push({
          name: 'Example',
          path: 'example',
          uri: child.path
        });
      }

      if (child.name === 'API.md') {
        pageData.info = pageData.info || [];
        pageData.info.push({
          name: 'API',
          path: 'api',
          uri: child.path
        });
      }

      if (child.name === 'controls.json') {
        var data = fs.readFileSync(child.path,'utf8');
        pageData.controls = JSON.parse(data).controls;
      }

      if (child.children && child.children.length) {
        pageData.sections = pageData.sections || [];
        pageData.sections.push(getPageData(child, child.children));
      }
    });
  }

  return pageData;
}

function parseNode(node) {

  if(node.children) {

    node.children = node.children.filter(child => {

      const keys = Object.keys(child);

      return !(keys.length === 2 && keys.includes('name') && keys.includes('path'));
    });

    collapseSrcAndLibDirs(node)

    if(!node.children.length) {
      delete node.children;
    }
  }
}

/*
 If node only has one child and that child is a directory, collapse
 */
function collapseSrcAndLibDirs(node) {

  if(node.children.length !== 1) {
    return;
  }

  const dir = node.children.find(
    child => ['src', 'lib'].find(dirname => dirname === child.name)
  );

  if(dir) {
    node.children = dir.children;
    collapseSrcAndLibDirs(node);
  }
}



const optionList = [
  {
    name: 'path',
    alias: 'p',
    required: true,
    defaultOption: true,
    typeLabel: '{underline string}',
    description: '🗂 The input folder to process. Required.'
  }
]

const usageNotes = [
  {
    header: 'Makes the portfolio menu',
    content: 'Blah blah blah'
  },
  {
    header: 'Options',
    optionList: optionList
  }
]

const usage = commandLineUsage(usageNotes);

let options = null;
try {
  options = commandLineArgs(optionList)
} catch(e) {
  console.log(usage);
  return;
}

if (Object.keys(options).length === 0 || options.help || !options.path) {
  console.log(usage)
  return;
}

if (!fs.existsSync(options.path)) {
  console.log('-----------------------------------------------------------------------------------------------------')
  console.log(`path does not exist`);
  console.log('-----------------------------------------------------------------------------------------------------')
  console.log(usage)
  return;
}

try {

  const ignoreHidden = new RegExp('.*\\/\\..*');
  const ignoreTpl = new RegExp('.*\\/.*\.tpl.md');

  const dirTree = directoryTree(options.path, {
    extensions: new RegExp('\.(md|json)$'),
    exclude: [/node_modules/, ignoreTpl],
    normalizePath: true,
    pretty: true
  });

  walk(dirTree, parsePageData);
  walk(dirTree, parseNode);
  walk(dirTree, (node) => {
    node.path = node.name;
    delete node.name;
  });

  fs.writeFileSync(
    './projects/portfolio/src/assets/json/libraries-routes.json',
    JSON.stringify({
      path: 'libraries',
      children: dirTree.children
    }, null, '  ')
  );

} catch(e) {
  console.log(e);
  console.log(usage);
}
