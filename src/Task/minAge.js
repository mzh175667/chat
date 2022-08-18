import arr from "./Array";
var minAge = arr[0].age;
for (var i = 0; i < arr.length; i++) {
  if (arr[i].age < minAge) {
    minAge = arr[i].age;
  }
}
export default minAge;
