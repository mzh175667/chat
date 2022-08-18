import arr from "./Array";
//  average age
function getAverageAge(items) {
  return items.reduce((data, user) => data + user.age, 0) / items.length;
}
const averageDataWithDecimalValue = getAverageAge(arr);
const averageData = Math.trunc(averageDataWithDecimalValue);
export default averageData;
