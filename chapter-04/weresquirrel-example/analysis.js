const JOURNAL = require('./journal.js');

/* Analysis the journal entries to find a correlation between events
  and the squirrel turning into a weresquirrel

  The journal is represented as an array of objects
  let journal = [{events: ["event1", "event2"], squirrel: false}]
*/
require('./journal.js');

function phi(table) {
  // determines measure of correlation between 2 boolean variables
  // table is [n00, n01, n10, n11]
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

//console.log(phi([76, 9, 4, 1]));

function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

//console.log(tableFor("pizza", JOURNAL))

function journalEvents(journal) {
  // get distinct set of events from journal
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":" + correlation);
  } 
}

/* 
  After seeing a strong positive correlation with eating peanuts
  and a strong negative correlation with brushing teeth, let's
  check for a correlation between eating peanuts and not brushing teeth
*/

for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts")
   && !entry.events.includes("brushed teeth")) {
    entry.events.push("peanut teeth");
  }
}

console.log(phi(tableFor("peanut teeth", JOURNAL))); // returns 1