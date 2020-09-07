import General from '../src/helpers/general';

test('When pass a number with less than 6 digits and a string size of 6, it returns the same number with zeros in the left.', () => {
  const zeroPad = General.zeroPad(1523, 6);
  expect(zeroPad).toMatch('001523');
});

test('When pass a number with more than 6 digits and a string size of 6, it returns the same number without zeros in the left.', () => {
  const zeroPad = General.zeroPad(15231523, 6);
  expect(zeroPad).toMatch('15231523');
});
