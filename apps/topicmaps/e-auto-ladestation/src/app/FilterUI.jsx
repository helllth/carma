import { Chart } from 'chart.js';
import React, { useEffect, useMemo, useState } from 'react';
import { useContext } from 'react';
import { Badge, Button, Form } from 'react-bootstrap';
import { Select } from 'antd';
import ReactChartkick, { PieChart } from 'react-chartkick';
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { ResponsiveTopicMapContext } from 'react-cismap/contexts/ResponsiveTopicMapContextProvider';

import { crossLinkApps } from './helper/constants';

import 'url-search-params-polyfill';

ReactChartkick.addAdapter(Chart);

const FilterUI = () => {
  return (
    <div>
      <h4>Ich suche nach:</h4>
      <Select
        placeholder="Kategorien auswählen ..."
        style={{ width: '100%', marginBottom: 8 }}
        options={[{ value: 'sample', label: <span>sample</span> }]}
        mode="multiple"
        allowClear
        defaultValue={['sample']}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <h4>Ich schlie&szlig;e aus:</h4>
      <Select
        placeholder="Kategorien auswählen ..."
        style={{ width: '100%' }}
      />
    </div>
  );
};
export default FilterUI;
