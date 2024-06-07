import React, { useEffect, useContext } from 'react';
import { UIComponentContext } from '../components/UI/UIProvider';
import {
  setShowPrimaryTileset,
  setTilesetOpacity,
  useShowPrimaryTileset,
  useTilesetOpacity,
} from '../store/slices/viewer';
import { setSelectionTransparency, useSelectionTransparency } from '../store';
import RangeInput from '../components/controls/ReduxRangeInput';
import ReduxSwitch from '../components/controls/ReduxSwitch';
import { Select, Switch } from 'antd';
import {
  useSelectDefaultKey,
  useSelectKey,
  useSelectKeys,
  setKey,
} from '../store/slices/buildings';
import { useDispatch } from 'react-redux';

export const uiTilesetOpacitySlider = (
  <div
    style={{
      padding: '0 15px',
    }}
  >
    <RangeInput
      valueHook={useTilesetOpacity}
      actionCreator={setTilesetOpacity}
    />
  </div>
);

export const uiTilesetToggle = (
  <ReduxSwitch
    title={'Tileset anzeigen'}
    actionCreator={setShowPrimaryTileset}
    valueHook={useShowPrimaryTileset}
  />
);

export function useTilesetControl() {
  const { addComponent, removeComponent } = useContext(UIComponentContext);
  const showTileset = useShowPrimaryTileset();

  useEffect(() => {
    console.log('useTilesetControl');
    const tilesetComponents = (
      <div style={{ width: '250px' }}>
        {uiTilesetToggle}
        {showTileset && uiTilesetOpacitySlider}
      </div>
    );
    addComponent('bottomLeft', tilesetComponents);
    return () => {
      removeComponent('bottomLeft', tilesetComponents);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTileset]);
}

export const uiSelectionTransparencySlider = (
  <div
    style={{
      padding: '0 15px',
      width: '250px',
    }}
  >
    <label>Transparenz nach Auswahl </label>
    <RangeInput
      valueHook={useSelectionTransparency}
      actionCreator={setSelectionTransparency}
    />
  </div>
);

export function useSelectionTransparencyControl() {
  console.log('useSelectionTransparencyControl');
  const { addComponent, removeComponent } = useContext(UIComponentContext);

  useEffect(() => {
    addComponent('bottomLeft', uiSelectionTransparencySlider);
    return () => {
      removeComponent('bottomLeft', uiSelectionTransparencySlider);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
export function usePropertySelectionControl() {
  const { addComponent, removeComponent } = useContext(UIComponentContext);
  const key = useSelectKey();
  const keys = useSelectKeys();
  const defaultKey = useSelectDefaultKey();
  const dispatch = useDispatch();
  const action = setKey;

  useEffect(() => {
    console.log('usePropertySelectionControl', key, defaultKey);
    if (!keys || keys.length === 0) return;
    const keyOptions = Array.from(keys).map((key, i) => ({
      key: i,
      value: key,
      label: key,
    }));

    const propertySelection = (
      <div
        style={{
          width: '300px',
        }}
      >
        <Select
          style={{ width: '100%' }}
          title="Select a property to color the buildings by:"
          value={key ?? defaultKey}
          defaultValue={defaultKey}
          options={keyOptions}
          onChange={(value) => {
            console.log('selection', value);
            dispatch(action(value));
            //setLocalKey(value);
          }}
        />
      </div>
    );

    addComponent('bottomLeft', propertySelection);

    return () => {
      removeComponent('bottomLeft', propertySelection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
