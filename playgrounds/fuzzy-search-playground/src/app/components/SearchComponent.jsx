import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { AutoComplete, Button, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { builtInGazetteerHitTrigger } from 'react-cismap/tools/gazetteerHelper';

const renderTitle = (category) => {
  let title = '???';
  switch (category) {
    case 'pois':
      title = 'POIS';
      break;
    case 'bpklimastandorte':
      title = 'Klimastandorte';
      break;
    case 'kitas':
      title = 'Kitas';
      break;
    case 'bezirke':
      title = 'Bezirke';
      break;
    case 'quartiere':
      title = 'Quartiere';
      break;
    case 'adressen':
      title = 'Adressen';
      break;
    default:
      title = category;
      break;
  }
  return <span>{title}</span>;
};

const renderItem = (address) => {
  const addressLabel = buildAddressWithIconUI(address);
  return {
    key: address.sorter,
    value: address.string,
    label: addressLabel,
    sData: address,
  };
};

function buildAddressWithIconUI(addresObj) {
  let icon;
  if (addresObj.glyph === 'pie-chart') {
    icon = 'chart-pie';
  } else {
    icon = addresObj.glyph;
  }
  const streetLabel = (
    <div>
      <span>
        <i className={icon && 'fas ' + 'fa-' + icon}></i>
        {'  '}
      </span>
      <span>{addresObj.string}</span>
    </div>
  );

  return streetLabel;
}

const generateOptions = (results) => {
  return results.map((result, idx) => {
    const streetLabel = buildAddressWithIconUI(result.item);
    return {
      key: result.item.sorter,
      label: <div>{streetLabel}</div>,
      value: result.item?.string,
      sData: result.item,
    };
  });
};

const mapDataToSearchResult = (data) => {
  console.log('vvv', data);
  const splittedCategories = {};

  data.forEach((item) => {
    const address = item.item;
    const catName = address.type;

    if (splittedCategories.hasOwnProperty(catName)) {
      splittedCategories[catName].push(renderItem(address));
    } else {
      splittedCategories[catName] = [renderItem(address)];
    }
  });

  const prepareOptions = [];

  Object.keys(splittedCategories).forEach((item) => {
    let optionItem = {};

    if (!optionItem.hasOwnProperty(item)) {
      optionItem.label = renderTitle(item);
      optionItem.options = splittedCategories[item];
    }

    prepareOptions.push(optionItem);
  });

  return prepareOptions;
};

const preps = [
  'an',
  'auf',
  'hinter',
  'neben',
  'über',
  'unter',
  'vor',
  'zwischen',
  'durch',
  'für',
  'gegen',
  'ohne',
  'um',
  'mit',
  'bei',
  'nach',
  'in',
  'von',
  'zu',
  'aus',
  'bis',
  'seit',
  'anstatt',
  'außerhalb',
  'innerhalb',
];
const articles = ['der', 'die', 'das', 'den', 'dem', 'des'];
const stopwords = [...preps, ...articles];

function SearchComponent({
  allData,
  setGazetteerHit,
  gazetteerHit,
  mapRef,
  overlayFeature,
  setOverlayFeature,
  referenceSystem,
  referenceSystemDefinition,
  ifShowCategories: standardSearch = false,
}) {
  const [options, setOptions] = useState([]);
  const [showCategories, setSfStandardSearch] = useState(standardSearch);
  const _gazetteerHitTrigger = undefined;
  const inputStyle = { width: 570, borderRadius: '2px', color: '#495057' };

  const internalGazetteerHitTrigger = (hit) => {
    builtInGazetteerHitTrigger(
      hit,
      mapRef.current.leafletMap.leafletElement,
      referenceSystem,
      referenceSystemDefinition,
      setGazetteerHit,
      setOverlayFeature,
      _gazetteerHitTrigger
    );
  };

  const [searchResult, setSearchResult] = useState([]);
  const [allGazeteerData, setAllGazeteerData] = useState([]);
  const [value, setValue] = useState('');

  const handleSearchAutoComplete = (value) => {
    if (allGazeteerData.length > 0) {
      const fuseAddressesOptions = {
        distance: 100,
        useExtendedSearch: true,
        threshold: 0.5,
        keys: ['xSearchData'],
      };
      const fuse = new Fuse(allGazeteerData, fuseAddressesOptions);
      const removeStopWords = removeStopwords(value, stopwords);
      const result = fuse.search(removeStopWords);
      if (!showCategories) {
        setOptions(generateOptions(result));
      } else {
        const groupedResults = mapDataToSearchResult(result);
        setSearchResult(groupedResults);
      }
    }
  };

  const handleOnSelect = (option) => {
    console.log('hhh', option);
    internalGazetteerHitTrigger([option.sData]);
    if (option.sData.type === 'bezirke' || option.sData.type === 'quartiere') {
      setGazetteerHit(null);
    } else {
      setGazetteerHit(option.sData);
    }
  };

  useEffect(() => {
    console.log('bbb', allData);

    if (allData) {
      const allModifiedData = prepareGazData(allData);
      setAllGazeteerData(allModifiedData);
    }
  }, [allData]);

  useEffect(() => {
    console.log('ccc', showCategories);
  }, [showCategories]);

  const handleShowCategories = (e) => {
    setSfStandardSearch(e.target.checked);
    setOptions([]);
    setSearchResult([]);
    setValue('');
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <div style={{ margin: '8px 0 12px' }}>
        <h5> Fuzzy search</h5>
      </div>
      <Button
        icon={<CloseOutlined />}
        style={{ borderRadius: '4px' }}
        onClick={() => {
          setGazetteerHit(null);
          setValue('');
          setOptions([]);
          setSearchResult([]);
          setOverlayFeature(null);
        }}
      />
      {!showCategories ? (
        <AutoComplete
          options={options}
          style={inputStyle}
          onSearch={(value) => handleSearchAutoComplete(value)}
          onChange={(value) => setValue(value)}
          placeholder="Stadtteil | Adresse | POI"
          value={value}
          onSelect={(value, option) => handleOnSelect(option)}
        />
      ) : (
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          popupMatchSelectWidth={500}
          style={inputStyle}
          onSearch={(value) => handleSearchAutoComplete(value)}
          placeholder="Stadtteil | Adresse | POI"
          options={searchResult}
          onSelect={(value, option) => handleOnSelect(option)}
          value={value}
          onChange={(value) => setValue(value)}
        >
          {/* <Input.Search size="large" placeholder="input here" /> */}
        </AutoComplete>
      )}
      <span style={{ marginLeft: '20px' }}>
        <Checkbox onChange={handleShowCategories} checked={showCategories}>
          <span style={{ fontSize: '14px' }}>Kategorien anzeigen</span>
        </Checkbox>
      </span>
      {/* <div style={{ marginTop: '8px' }}>
        <Checkbox onChange={handleSwowCategories} checked={showCategories}>
          <span style={{ fontSize: '14px' }}>Kategorien anzeigen</span>
        </Checkbox>
      </div> */}
    </div>
  );
}

export default SearchComponent;

function removeStopwords(text, stopwords) {
  const words = text.split(' ');
  const placeholderWords = words.map((word) => {
    // Check if the word is in the stopwords array (case insensitive)
    if (stopwords.includes(word.toLowerCase())) {
      // Replace each character in the word with an underscore
      return '_'.repeat(word.length);
    }
    return word;
  });
  return placeholderWords.join(' ');
}

function prepareGazData(data) {
  const modifiedData = data.map((item) => {
    const searchData = item?.string;
    const address = {
      ...item,
      xSearchData: removeStopwords(searchData, stopwords),
    };
    return address;
  });

  return modifiedData;
}
