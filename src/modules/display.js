import process from 'process';
import { clearBuffer } from './rli.js';
import { now } from './scheduler.js';
import { getLastChangeDate } from './vm.js';
import { getMidiSent, resetMidiSent } from './midi.js';

/**
 * Truncates an array so that it fits into terminal.
 *
 * @param {Array} textOutputLines an array of messages
 */
function truncateOutputLines(textOutputLines) {
  const maxLines = process.stdout.rows - 6;
  if (textOutputLines.length > maxLines) {
    textOutputLines.splice(0, textOutputLines.length - maxLines);
  }
}

/**
 * Clear the terminal and print a welcome header.
 *
 * @param {string} version
 */
export function printWelcome(version) {
  clearBuffer();
  console.log(`
 ▄▀▀ █ █ █ █▀▄
 █▀  ▀█▀█▀ █▄█
          v${version}
  `);
}

/**
 * Clear the terminal and print runner info.
 *
 * @param {string[]} outputLines an array of messages to be logged
 * @param {string} filePath path to current program file
 * @param {string} outputName MIDI output name
 */
function drawOnce(outputLines, filePath, outputName) {
  clearBuffer();
  truncateOutputLines(outputLines);

  const maxPathLength = process.stdout.columns - 20;
  const truncatedPath = filePath.substring(0, maxPathLength);
  const maxOutputLength = process.stdout.columns - 10;
  const truncatedOutput = outputName.substring(0, maxOutputLength);

  const borderMargin = new Array(process.stdout.columns - 7).fill(' ').join('');

  console.log(
    `╔══${borderMargin}══╗
 in    ${truncatedPath} (at ${getLastChangeDate().toLocaleTimeString()})
 out   [${getMidiSent() ? 'x' : ' '}] ${truncatedOutput}
 time  ${now()}
╚══${borderMargin}══╝
${outputLines.join('\n')}`,
  );
}

/**
 * Start drawing runner info at fixed interval.
 *
 * @param {string} outputName MIDI output name
 * @param {string} file path to current program file
 * @param {string[]} outputLines an array of logged messages
 */
export function startDisplay(outputName, file, outputLines) {
  setInterval(() => {
    drawOnce(outputLines, file, outputName);
    resetMidiSent();
  }, 100);

  process.stdout.on('resize', () => drawOnce(outputLines, file, outputName));
}
