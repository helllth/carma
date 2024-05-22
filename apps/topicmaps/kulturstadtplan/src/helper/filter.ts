import { classifyMainlocationTypeName } from './styler';

const itemFilterFunction = ({ filterState }) => {
  return (item) => {
    let result = true;

    if (filterState.mode === 'einrichtungen') {
      const category = classifyMainlocationTypeName(item.mainlocationtype.name);
      if (filterState['einrichtungen'].indexOf(category) !== -1) {
        result = true;
      }
    }

    return result;
  };
};
export default itemFilterFunction;
