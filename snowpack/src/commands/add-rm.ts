import {promises as fs} from 'fs';
import {send} from 'httpie';
import path from 'path';
import {CommandOptions} from '../types/snowpack';
import {generateImportMap} from 'skypack';
import {writeLockfile} from '../util';
import {logger} from '../logger';

export async function addCommand(addValue: string, commandOptions: CommandOptions) {
  const {cwd, config, lockfile, pkgManifest} = commandOptions;
  let [pkgName, pkgSemver] = addValue.split('@');
  if (!pkgSemver) {
    const {data} = await send('GET', `http://registry.npmjs.org/${pkgName}/latest`);
    pkgSemver = `^${data.version}`;
  }
  pkgManifest.webDependencies = pkgManifest.webDependencies || {};
  pkgManifest.webDependencies[pkgName] = pkgSemver;
  config.webDependencies = config.webDependencies || {};
  config.webDependencies[pkgName] = pkgSemver;
  delete pkgManifest.dependencies[pkgName];
  delete pkgManifest.devDependencies[pkgName];
  await fs.writeFile(path.join(cwd, 'package.json'), JSON.stringify(pkgManifest, null, 2));
  logger.info(`Added "${pkgName}@${pkgSemver}" to package.json web dependencies.`);
  logger.info(`Regenerating lockfile...`);
  const newLockfile = await generateImportMap(config.webDependencies, lockfile || undefined);
  await writeLockfile(path.join(cwd, 'snowpack.lock.json'), newLockfile);
}

export async function rmCommand(addValue: string, commandOptions: CommandOptions) {
  const {cwd, config, lockfile, pkgManifest} = commandOptions;
  let [pkgName] = addValue.split('@');
  pkgManifest.webDependencies = pkgManifest.webDependencies || {};
  delete pkgManifest.webDependencies[pkgName];
  config.webDependencies = config.webDependencies || {};
  delete config.webDependencies[pkgName];
  await fs.writeFile(path.join(cwd, 'package.json'), JSON.stringify(pkgManifest, null, 2));
  logger.info(`Removed "${pkgName}" from package.json web dependencies.`);
  logger.info(`Regenerating lockfile...`);
  const newLockfile = await generateImportMap(config.webDependencies, lockfile || undefined);
  await writeLockfile(path.join(cwd, 'snowpack.lock.json'), newLockfile);
}
