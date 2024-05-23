import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'antd';

interface ControlProps {
  title: string;
  valueHook: () => boolean;
  actionCreator: (value: boolean) => { type: string; payload: boolean };
}

const Toggle: FC<ControlProps> = ({
  title,
  valueHook,
  actionCreator: action,
}) => {
  const dispatch = useDispatch();
  const value = valueHook();

  return (
    <p>
      <Switch
        style={{
          margin: '0 15px',
        }}
        checked={value}
        onChange={(checked) => dispatch(action(checked))}
      />
      <label>{title}</label>
    </p>
  );
};

export default Toggle;
