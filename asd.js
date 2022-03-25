const jsonObj = {
  name: 'dongmin',
  age: 25,
  isMale: true,
};

console.log('jsonObj: ', jsonObj);

const toJson = JSON.stringify(jsonObj);
console.log(toJson);
console.log(typeof toJson);

const toObj = JSON.parse(toJson);
console.log('toObj: ', toObj);
