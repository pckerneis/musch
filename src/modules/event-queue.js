/**
 * @typedef ScheduledEvent
 *
 * Holds together an event, the time location at which it is scheduled and the scheduler's reference for this scheduled
 * event.
 *
 * @type {object}
 * @property {string} ref - a unique identifier.
 * @property {number} time - time position in seconds.
 * @property {number} schedulerId - scheduler ID.
 * @property {Function} event - action to perform.
 */

/**
 * Maintains an ordered list of scheduled events and exposes methods to add and retrieve them. It doesn't keep track of the
 * time but instead is meant to be used by repeatedly calling `next` to obtain all the events that should be fired at a
 * specified time location.
 */
export class EventQueue {
  /**
   * The current list of scheduled events.
   * @type {ScheduledEvent[]}
   */
  events = [];

  latestRefIdx = 0;

  /**
   * Pop and return the next event in the queue if its time location is inferior to the specified time location. Return
   * null otherwise.
   *
   * @param {number} now - The current time location.
   * @returns {ScheduledEvent|null} a scheduled event whose time location is inferior to the specified time or `null` if no event match.
   */
  next(now) {
    if (this.events.length === 0) {
      return null;
    }

    if (this.events[0].time <= now) {
      return this.events.splice(0, 1)[0];
    }

    return null;
  }

  /**
   * Insert an event in the queue. The queue is kept sorted in time position at insertion. If there are already events at
   * the specified time location, the event will be inserted after the last event with equal time location.
   *
   * @param {number} time The time location at which the event is scheduled.
   * @param {Function} event the event to add to the queue.
   * @param {number} schedulerId - Scheduler ID
   *
   * @returns {string} the scheduled event ID that can used later on to remove the event from the queue. See {@link remove}.
   */
  add(time, event, schedulerId) {
    if (isNaN(time)) {
      time = 0;
    }

    const idx = this.insertIndex(time, 0, this.events.length);
    const scheduledEvent = {
      event,
      time,
      schedulerId,
      ref: this.newRef(),
    };

    this.events.splice(idx, 0, scheduledEvent);

    return scheduledEvent.ref;
  }

  /**
   * Insert an event in the queue. The queue is kept sorted in time position at insertion. If there are already events at
   * the specified time location, the event will be inserted after the last event with equal time location.
   *
   * @param {string} eventRef A reference to the event to remove, obtained from a call to {@link add}.
   */
  remove(eventRef) {
    this.events = this.events.filter((e) => e.ref !== eventRef);
  }

  /**
   * Removes all previously added events.
   */
  clear() {
    this.events = [];
  }

  insertIndex(time, min, max) {
    const range = max - min;

    if (range === 0) {
      return min;
    }

    let pivot = (Math.random() * range + min) | 0;
    let timeAtPivot = this.events[pivot].time;

    while (timeAtPivot === time) {
      pivot++;

      if (pivot >= this.events.length) {
        return pivot;
      }

      timeAtPivot = this.events[pivot].time;

      if (timeAtPivot > time) {
        return pivot;
      }
    }

    if (timeAtPivot > time) {
      return this.insertIndex(time, min, pivot);
    } else {
      return this.insertIndex(time, pivot + 1, max);
    }
  }

  newRef() {
    return '' + this.latestRefIdx++;
  }
}