// @ts-check

import { now, schedule } from './scheduler.js';
import { playNote } from './midi.js';

let _midiOutput;
let _textOutputLines;
let _env;
let _cursor = 0;

/**
 *
 * @param {string} midiOutput MIDI output used
 * @param {Array} textOutputLines array of messages to log
 * @param {object} env a dictionnary that persists between executions
 */
export function initApi(midiOutput, textOutputLines, env) {
  _midiOutput = midiOutput;
  _textOutputLines = textOutputLines;
  _env = env;
  _cursor = 0;
}

/**
 * Schedule the function `action` to be called at the cursor position.
 *
 * @param {Function} action the action to schedule
 */
function fire(action) {
  schedule(_cursor, action);
}

/**
 * Repeatedly calls the function `fn` every `interval` seconds for `count` times, starting at the cursor position.
 *
 * @param {Function} action the action to repeat
 * @param {number} interval the repeat interval
 * @param {number} count how many times to repeat
 * @returns
 */
function repeat(action, interval, count = Infinity) {
  const startCount = count;
  let nextCursor = _cursor;

  const t = now();

  for (;;) {
    if (nextCursor >= t) {
      break;
    }

    count -= 1;

    if (count < 0) {
      return;
    }

    nextCursor += interval;
  }

  const scheduleNext = () => {
    schedule(nextCursor, () => {
      if (count > 0) {
        action(startCount - count);
        count -= 1;
        nextCursor += interval;
        scheduleNext();
      }
    });
  };

  scheduleNext();
}

/**
 * Log a message.
 *
 * @param {*} message
 */
function log(message) {
  _textOutputLines.push(message);
}

/**
 * Schedule a message to be logged at the cursor position.
 *
 * @param {*} message
 */
function flog(message) {
  fire(() => log(message));
}

/**
 * Move the cursor at position `time` expressed in seconds.
 *
 * @param {number} time
 */
function at(time) {
  _cursor = time;
}

/**
 * Offset the cursor by `duration` expressed in seconds.
 *
 * @param {number} duration
 */
function wait(duration) {
  _cursor += duration;
}

/**
 * @returns the cursor position.
 */
function cursor() {
  return _cursor;
}

/**
 * Schedule a MIDI note to be played at the cursor position
 * with note number `pitch`, velocity `velocity` and duration `duration` on midi channel `channel`.
 *
 * @param {number} pitch
 * @param {number} velocity
 * @param {number} duration
 * @param {number} channel
 */
function note(pitch, velocity, duration, channel) {
  fire(() => playNote(_midiOutput, channel, pitch, velocity, duration));
}

/**
 * @returns the public API
 */
export function getApi() {
  return {
    env: _env,
    fire,
    log,
    now,
    note,
    flog,
    at,
    wait,
    cursor,
    repeat,
  };
}
