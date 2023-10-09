function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrom(string) {
  string = string.trim().replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i].toLowerCase();
  }
  return string === reversedString;
}

function getNumbers(string) {
  string = String(string);
  let number = '';
  for (const char of string) {
    if (char !== ' ' && Number.isInteger(Number(char))) {
      number += char;
    }
  }
  return Number(number) ? Number(number) : NaN;
}

checkStringLength('string', 20);
isPalindrom('ДоВод');
getNumbers('');
