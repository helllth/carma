const itemFilterFunction = ({ filterState }) => {
  return (item) => {
    let result = false;

    if (filterState.inklusion) {
      if (item.plaetze_fuer_behinderte) {
        result = item.plaetze_fuer_behinderte;
      }
    }

    if (filterState.normal) {
      if (!item.plaetze_fuer_behinderte) {
        result = true;
      }
    }

    if (filterState.alter) {
      if (filterState.alter === 'unter2') {
        if (item.alter === 0) {
          result = true;
        } else {
          result = false;
        }
      } else if (filterState.alter === 'ab2') {
        if (item.alter === 0 || item.alter === 1) {
          result = true;
        } else {
          result = false;
        }
      } else if (filterState.alter === 'ab3') {
        if (item.alter < 3) {
          result = true;
        } else {
          result = false;
        }
      }
    }

    return result;
  };
};
export default itemFilterFunction;

export const toggleFilter = (kind, filter, filterState, setFilterState) => {
  const newFilterState = { ...filterState };
  let filterGroupSet = new Set(filterState[kind]);
  if (filterGroupSet.has(filter)) {
    filterGroupSet.delete(filter);
  } else {
    filterGroupSet.add(filter);
    if (kind === 'positiv') {
      if (newFilterState.negativ.indexOf(filter) !== -1) {
        let otherFilterGroupSet = new Set(newFilterState['negativ']);
        otherFilterGroupSet.delete(filter);
        newFilterState['negativ'] = Array.from(otherFilterGroupSet);
      }
    } else {
      if (newFilterState.positiv.indexOf(filter) !== -1) {
        let otherFilterGroupSet = new Set(newFilterState['positiv']);
        otherFilterGroupSet.delete(filter);
        newFilterState['positiv'] = Array.from(otherFilterGroupSet);
      }
    }
  }
  newFilterState[kind] = Array.from(filterGroupSet);
  newFilterState[kind].sort();
  setFilterState(newFilterState);
  return newFilterState;
};

export const clearFilter = (kind, filterState, setFilterState) => {
  const newFilterState = { ...filterState };
  newFilterState[kind] = [];
  setFilterState(newFilterState);
  return newFilterState;
};
