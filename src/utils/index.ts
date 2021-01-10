import * as fs from "fs";

export const jsReg = /\.[j|t]s$/;

export const isJsFile = (filename: string) => {
  return jsReg.test(filename);
};

export const loadJs = (filepath: string) => {
  const vb = require(filepath);
  if (vb.default) {
    return vb.default;
  }
  return vb;
}

export const readdir = (
  filepath: string,
  callback: (filepath: string) => void
) => {
  const stats = validatePath(filepath);
  if (!stats) {
    return;
  }
  if (stats.isDirectory()) {
    const files = fs.readdirSync(filepath);

    files.forEach((filename) => {
      readdir(filepath + "/" + filename, callback);
    });
  } else {
    callback && callback(filepath);
  }
};

export const readdirFiles = (filepath: string) => {
  const files = [];
  readdir(filepath, (filename: string) => {
    files.push(filename);
  });
  return files;
};

export const readdirAndLoad = (filepath: string, callback: (file: any) => void, reg?: RegExp) => {
  readdir(filepath, (filename: string) => {
    if (reg && !reg.test(filename)) {
      return;
    }
    callback(filename);
  });
};

export const readdirFilesAndLoad = (filepath: string, reg?: RegExp) => {
  const files = [];
  readdir(filepath, (filename: string) => {
    if (reg && !reg.test(filename)) {
      return;
    }
    files.push(loadJs(filename));
  });
  return files;
}

export const processValue = (obj: Object, key: string, value: any) => {
  if (obj[key] === void 0) {
    obj[key] = value;
  }
}

function validatePath(path: string): fs.Stats {
  try {
    return fs.lstatSync(path);
  } catch (err) {
    return null;
  }
}
