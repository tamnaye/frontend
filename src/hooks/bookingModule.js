import { times } from "./times";

export function getStartEndTime(checkedState) {
    function getCheckedIndex(checkedState) {
      var arr = [];
      var index = checkedState.indexOf(true);
      while (index !== -1) {
        arr.push(index);
        index = checkedState.indexOf(true, index + 1);
      }
      return arr;
    }
    const object = {
      startTime: times()[getCheckedIndex(checkedState)[0]],
      timeLength: getCheckedIndex(checkedState).length,
    };
    return object;
  }