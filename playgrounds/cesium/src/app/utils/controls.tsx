import React, { useEffect, useContext, useState } from 'react';
import { UIComponentContext } from '../components/UIProvider';
import {
  setSelectionTransparency,
  setShowTileset,
  setTilesetOpacity,
  useSelectionTransparency,
  useShowTileset,
  useTilesetOpacity,
} from '../store';
import RangeInput from '../components/controls/ReduxRangeInput';
import Switch from '../components/controls/ReduxSwitch';
import { Select } from 'antd';
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
      width: '200px',
    }}
  >
    <RangeInput
      valueHook={useTilesetOpacity}
      actionCreator={setTilesetOpacity}
    />
  </div>
);

export const uiTilesetToggle = (
  <Switch
    title={'Show Tileset'}
    actionCreator={setShowTileset}
    valueHook={useShowTileset}
  />
);

const tilesetComponents = (
  <>
    {uiTilesetOpacitySlider}
    {uiTilesetToggle}
  </>
);

export function useTilesetControl() {
  const { addComponent, removeComponent } = useContext(UIComponentContext);

  useEffect(() => {
    console.log('useTilesetControl');
    addComponent('bottomLeft', tilesetComponents);
    return () => {
      removeComponent('bottomLeft', tilesetComponents);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const uiSelectionTransparencySlider = (
  <div
    style={{
      padding: '0 15px',
      width: '200px',
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

//  const [localKey, setLocalKey] = useState(key);

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
