import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Slider } from 'antd';

interface ControlProps {
  valueHook: () => number;
  displayFactor?: number;
  displayMax?: number;
  displayMin?: number;
  displayStep?: number;

  actionCreator: (value: number) => { type: string; payload: number };
}

const RangeInput: FC<ControlProps> = ({
  valueHook,
  displayFactor = 100,
  displayMax = 100,
  displayMin = 0,
  displayStep = 1,
  actionCreator: action,
}) => {
  const dispatch = useDispatch();
  const value = valueHook();

  const toDisplay = (value: number) => value * displayFactor;
  const fromDisplay = (value: number) => value / displayFactor;

  return (
    <Slider
      min={displayMin}
      max={displayMax}
      step={displayStep}
      value={toDisplay(value)}
      defaultValue={toDisplay(value)}
      onChange={(value: number) => dispatch(action(fromDisplay(value)))}
    />
  );
};

export default RangeInput;
