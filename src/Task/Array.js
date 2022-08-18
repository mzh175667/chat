import array from "./arrayConcat";
const arrData = [
  {
    id: 2,
    name: "Zul",
    age: 16,
    city: "Multan",
    phone: "6302263",
    class: "A",
  },
  {
    id: 3,
    name: "Sub",
    age: 19,
    city: "Lahore",
    phone: "6302263",
    class: "A",
  },
  {
    id: 4,
    name: "Saq",
    age: 24,
    city: "Multan",
    phone: "6302263",
    class: "A",
  },
  {
    id: 5,
    name: "Atika",
    age: 27,
    city: "Multan",
    phone: "6302263",
    class: "A",
  },
  {
    id: 6,
    name: "Hus",
    age: 29,
    city: "Lahore",
    phone: "6302263",
    class: "A",
  },
];
// add new data at start
arrData.unshift({
  id: 1,
  name: "Add MZH",
  age: 15,
  city: "Lahore",
  phone: "6302263",
  class: "A",
});
// add new data at end
const arr = arrData.concat(array);

export default arr;
