import { classifyMainlocationTypeName } from './styler';

const itemFilterFunction = ({ filterState }) => {
  return (item) => {
    let result = false;

    console.log('xxx', filterState);

    if (filterState.mode === 'einrichtungen') {
      const category = classifyMainlocationTypeName(item.mainlocationtype.name);
      if (filterState['einrichtung'].indexOf(category) !== -1) {
        result = true;
      }
    }

    return result;
  };
};
export default itemFilterFunction;
