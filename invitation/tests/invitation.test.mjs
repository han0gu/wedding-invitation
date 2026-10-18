import test from 'node:test';
import assert from 'node:assert/strict';
import { countdown, calendarEvent } from '../src/lib/invitation.mjs';

test('countdown splits time left into complete days, hours and minutes', () => {
  assert.deepEqual(countdown('2027-06-12T13:00:00Z', Date.parse('2027-06-10T10:55:00Z')), { days: 2, hours: 2, minutes: 5 });
});
test('elapsed wedding never shows negative time', () => {
  assert.deepEqual(countdown('2027-06-12T13:00:00Z', Date.parse('2027-06-13T00:00:00Z')), { days: 0, hours: 0, minutes: 0 });
});
test('calendar uses explicit UTC dates and escapes line breaks, comma and semicolon', () => {
  const text = calendarEvent({id:'ceremony', title:'Camille & Antoine', start:'2027-06-12T15:00:00+02:00', end:'2027-06-13T01:00:00+02:00', location:'Château, France', description:'First line\nSecond; line'});
  assert.match(text, /DTSTART:20270612T130000Z\r\n/);
  assert.match(text, /DTEND:20270612T230000Z\r\n/);
  assert.match(text, /LOCATION:Château\\, France/);
  assert.match(text, /DESCRIPTION:First line\\nSecond\\; line/);
  assert.ok(text.endsWith('END:VCALENDAR\r\n'));
});
test('calendar folds UTF-8 lines without breaking a character or exceeding 75 bytes', () => {
  const text = calendarEvent({id:'long', title:'é'.repeat(100), start:'2027-06-12T13:00:00Z', end:'2027-06-12T14:00:00Z', location:'Paris', description:'Invitation'});
  assert.ok(text.split('\r\n').every(line => Buffer.byteLength(line) <= 75));
  assert.ok(text.replace(/\r\n /g,'').includes('SUMMARY:'+'é'.repeat(100)));
});
