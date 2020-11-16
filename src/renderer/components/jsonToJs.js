const camelCase = require('lodash.camelcase');
const path = require('path');
const fs = require('fs');

/**
 * @function                                  jsonToJS
 * @description                               Read JSON files and return as object or write to a JS file.
 *
 * @param {Object}          config            Configuration Object
 * @param {String|String[]} config.path       Path to Dir of lottie .json files, Path to lottie .json file or array of paths to lottie .json files.
 * @param {?String}         config.varName    Var name to declare json object as. Default is file name.
 * @param {?Boolean}        config.save       Save output to file
 * @param {?String}         config.banner     Banner text to add to top of file. Only used when saving to file.
 * @param {?String}         config.outDir     Dir to save .js file to. Defaults to same location as input file if not specified.
 *
 * @returns {Object}  jsonToJsObj {varName: jsonFile}
 */
export default function jsonToJS(config, cb) {
  if (!config.path)
    throw new Error(`[jsonToJs] 'config.filePath' is required.`);

  const filePaths = config.path;
  const banner = config.banner || false;
  const saveToFile = config.save || false;
  const jsonToJsObj = {};

  // Check if filePaths is an array of files, a single file or a dir
  // Check if array
  if (Array.isArray(filePaths)) {
    filePaths.forEach((filePath) => {
      parseJsonToJS(filePath);
    });
    // return jsonToJsObj;
    if (cb) cb(jsonToJsObj);
  }

  // is Dir
  else if (fs.existsSync(filePaths) && fs.lstatSync(filePaths).isDirectory()) {
    fs.readdirSync(filePaths).forEach((file) => {
      parseJsonToJS(path.join(filePaths, file));
    });
    if (cb) cb(jsonToJsObj);
    // return jsonToJsObj;
  }

  // is file
  else if (fs.existsSync(filePaths) && fs.lstatSync(filePaths).isFile()) {
    parseJsonToJS(filePaths);
    if (cb) cb(jsonToJsObj);
    // return jsonToJsObj;
  }

  // filePath is none of the above
  else {
    throw new Error(
      `[jsonToJs] 'config.filePath' is not an Dir path, File path or array of file paths.`
    );
  }

  function parseJsonToJS(filePath) {
    // Get file name
    const file = path.parse(filePath);
    const varName = config.varName || camelCase(file.name);
    const outName = file.name + '.js';
    const outDir = config.saveDir || file.dir;

    // Check is it a JSON file
    if (file.ext.toLowerCase() !== '.json') {
      console.log(
        `[jsonToJs] File ignored as extension is not '.json': ${file.base}`
      );
      return false;
    }
    // Read file
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    jsonToJsObj[camelCase(file.name)] = fileContent;

    if (saveToFile) {
      const jsFile = `${
        banner ? `/* ${banner} ${file.name} */\n` : ''
      }window.${varName} = ${fileContent};`;
      fs.writeFileSync(path.join(outDir, outName), jsFile);
    }
  }
}
