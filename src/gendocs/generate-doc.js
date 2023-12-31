import jsdoc2md from 'jsdoc-to-markdown';
import fs from 'node:fs';
import { exec } from 'node:child_process';
import PACKAGE_VERSION from '../package-version.cjs';

const PATH_TO_API_JS = 'src/modules/api/**/*.js';

async function writeApiReference() {
  const outputFile = 'docs/api-reference.md';
  const template = fs.readFileSync('src/gendocs/api-template.hbs', 'utf-8');

  const output = await jsdoc2md.render({ files: PATH_TO_API_JS, template });
  fs.writeFileSync(outputFile, output);
}

function writeCliDocumentation() {
  const outputFile = 'docs/cli.md';
  const template = fs.readFileSync('src/gendocs/cli-template.hbs', 'utf-8');
  const childProcess = exec('musch -h');

  childProcess.stdout.on('data', function (data) {
    fs.writeFileSync(outputFile, template.replace('{{help}}', data));
  });
}

async function writeReadme(
  template,
  example,
  screenshotPath,
  outputPath,
  urlPrefix = '',
) {
  const output = template
    .replace('{{example}}', example)
    .replace('{{version}}', PACKAGE_VERSION)
    .replace('{{screenshotPath}}', screenshotPath);

  fs.writeFileSync(
    outputPath,
    output.replaceAll(
      /]\(([-\w]+)\)/gi,
      (full, filename) => `](${urlPrefix}${filename}.md)`,
    ),
  );
}

async function writeReadmes() {
  const template = fs.readFileSync('src/gendocs/readme-template.hbs', 'utf-8');
  const example = fs.readFileSync('example.js', 'utf-8');
  await writeReadme(template, example, 'hello-musch.gif', 'docs/README.md');
  await writeReadme(
    template,
    example,
    'docs/hello-musch.gif',
    'README.md',
    'https://pckerneis.github.io/musch/#/',
  );
}

async function run() {
  await writeApiReference();
  writeCliDocumentation();
  await writeReadmes();
}

run();
