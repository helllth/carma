import { useMemo } from 'react';
import { useContext } from 'react';
import { Select } from 'antd';
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from 'react-cismap/contexts/FeatureCollectionContextProvider';

const FilterUI = () => {
  const { itemsDictionary, filterState } = useContext(FeatureCollectionContext);
  const { setFilterState } = useContext(FeatureCollectionDispatchContext);
  const zielgruppen = useMemo(
    () => itemsDictionary?.zielgruppen || [],
    [itemsDictionary]
  );

  return (
    <div>
      <h4>Ich suche nach:</h4>
      <Select
        placeholder="Kategorien auswählen ..."
        style={{ width: '100%', marginBottom: 8 }}
        options={zielgruppen.map((zielgruppe) => {
          return {
            value: zielgruppe,
            label: zielgruppe,
          };
        })}
        mode="multiple"
        allowClear
        value={filterState.positiv}
        onChange={(value) => {
          const newFilterState = { ...filterState };
          newFilterState.positiv = value;
          setFilterState(newFilterState);
        }}
      />
      <h4>Ich schlie&szlig;e aus:</h4>
      <Select
        placeholder="Kategorien auswählen ..."
        style={{ width: '100%' }}
        options={zielgruppen.map((zielgruppe) => {
          return {
            value: zielgruppe,
            label: zielgruppe,
          };
        })}
        mode="multiple"
        allowClear
        value={filterState.negativ}
        onChange={(value) => {
          const newFilterState = { ...filterState };
          newFilterState.negativ = value;
          setFilterState(newFilterState);
        }}
      />
    </div>
  );
};
export default FilterUI;
