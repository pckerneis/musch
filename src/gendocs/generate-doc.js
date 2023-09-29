import jsdoc2md from 'jsdoc-to-markdown';
import fs from 'node:fs';
import { exec } from 'node:child_process';
import PACKAGE_VERSION from '../package-version.cjs';

async function writeApiReference() {
  const inputFile = 'src/modules/api.js';
  const outputFile = 'docs/api-reference.md';
  const template = fs.readFileSync('src/gendocs/api-template.hbs', 'utf-8');

  const output = await jsdoc2md.render({ files: inputFile, template });
  fs.writeFileSync(outputFile, output);
}

function writeCliDocumentation() {
  const outputFile = 'docs/cli.md';
  const template = fs.readFileSync('src/gendocs/cli-template.hbs', 'utf-8');
  const childProcess = exec('fwd -h');

  childProcess.stdout.on('data', function (data) {
    fs.writeFileSync(outputFile, template.replace('{{help}}', data));
  });
}

function writeReadmes() {
  const template = fs.readFileSync('src/gendocs/readme-template.hbs', 'utf-8');
  const example = fs.readFileSync('example.js', 'utf-8');
  const replaced = template
    .replace('{{example}}', example)
    .replace('{{version}}', PACKAGE_VERSION);

  fs.writeFileSync(
    'docs/README.md',
    replaced.replaceAll(
      /]\(([-\w]+)\)/gi,
      (full, filename) => `](${filename}.md)`,
    ),
  );
  fs.writeFileSync(
    'README.md',
    replaced.replaceAll(
      /]\(([-\w]+)\)/gi,
      (full, filename) => `](https://pckerneis.github.io/fwd/#/${filename})`,
    ),
  );
}

async function run() {
  await writeApiReference();
  writeCliDocumentation();
  writeReadmes();
}

run();
