import { dbg } from './dbg.js';
import { EventQueue } from './event-queue.js';
import chalk from 'chalk';
import { isFinitePositiveNumber } from '../utils.js';

const scheduledEvents = new EventQueue();

let paused = false;
let currentEventTime = 0;
let previousTimeStamp = 0;
let intervalHandle;
let currentSchedulerId = 0;
let elapsedSeconds = 0;
let speed = 1;
let playTime = 0;

export function toggleSchedulerPaused() {
  paused = !paused;
}

export function getCurrentEventTime() {
  return currentEventTime;
}

export function getCurrentSchedulerId() {
  return currentSchedulerId;
}

/**
 * Returns the elapsed time in seconds since scheduler start
 * @returns {number} elapsed time in seconds
 */
export function getElapsedSeconds() {
  return elapsedSeconds;
}

/**
 * Returns the current time cursor position.
 * @returns {number} the cursor position
 */
export function clock() {
  return playTime;
}

export function setSchedulerSpeed(newSpeed) {
  if (!isFinitePositiveNumber(newSpeed)) {
    throw new Error('Speed should be a finite positive number.');
  }

  speed = newSpeed;
}

export function getSchedulerSpeed() {
  return speed;
}

export function isPaused() {
  return paused;
}

/**
 * Reset the scheduler to its default state
 */
export function initScheduler() {
  dbg('Initialise scheduler.');
  clearInterval(intervalHandle);
  intervalHandle = null;
  currentEventTime = 0;
  currentSchedulerId = 0;
  previousTimeStamp = 0;
  playTime = 0;
  speed = 1;
  elapsedSeconds = 0;
}

/**
 * Schedule an action at a given time position
 * @param {number} time the time at which the action should be performed
 * @param {Function} action the function to be called
 */
export function schedule(time, action) {
  dbg('Schedule at ', time);
  scheduledEvents.add(time, action);
}

/**
 * Increments scheduler ID
 */
export function incrementSchedulerId() {
  currentSchedulerId++;
}
/**
 * Decrements scheduler ID
 */
export function decrementSchedulerId() {
  currentSchedulerId--;
}

function processEvents(outputLines) {
  const t = playTime;

  let next = scheduledEvents.next(t);

  while (next != null) {
    currentEventTime = next.time;

    try {
      next.event();
    } catch (e) {
      outputLines.push(chalk.red(e));
    }

    next = scheduledEvents.next(t);
  }

  currentEventTime = t;
}

/**
 * Starts the scheduler
 *
 * @param {string[]} outputLines array of messages to log
 */
export function startScheduler(outputLines) {
  dbg('Start scheduler.');
  previousTimeStamp = Date.now();

  intervalHandle = setInterval(() => {
    const currentTimeStamp = Date.now();

    if (paused) {
      previousTimeStamp = currentTimeStamp;
      return;
    }

    const elapsed = (currentTimeStamp - previousTimeStamp) / 1000;
    elapsedSeconds += elapsed;
    playTime += elapsed * speed;

    processEvents(outputLines);
    previousTimeStamp = currentTimeStamp;
  }, 1);
}
