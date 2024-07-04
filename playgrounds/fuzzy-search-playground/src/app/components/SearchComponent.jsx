import { useEffect, useState, useRef } from 'react';
import Fuse from 'fuse.js';
import { AutoComplete, Button, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { builtInGazetteerHitTrigger } from 'react-cismap/tools/gazetteerHelper';
import './fuzzy-search.css';
import IconComp from 'react-cismap/commons/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { location-dot } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'antd';
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

const joinNumberLetter = (name) => name.replace(/(\d+)\s([a-zA-Z])/g, '$1$2');

const renderItem = (address) => {
  const addressLabel = buildAddressWithIconUI(address);
  return {
    key: address.sorter,
    value: address.string,
    label: joinNumberLetter(addressLabel),
    sData: address,
  };
};

function buildAddressWithIconUI(addresObj, showScore = false, score) {
  let icon;
  if (addresObj.glyph === 'pie-chart') {
    icon = 'chart-pie';
  } else {
    icon = addresObj.glyph;
  }
  const streetLabel = (
    <div style={{ paddingLeft: '0.3rem' }}>
      <span style={{ marginRight: '0.4rem' }}>
        <i className={icon && 'fas ' + 'fa-' + icon}></i>
        {'  '}
      </span>
      <span>
        {showScore ? (
          <span>
            <span>{joinNumberLetter(addresObj.string)}</span>
            <span style={{ color: 'gray' }}> ({score})</span>
          </span>
        ) : (
          joinNumberLetter(addresObj.string)
        )}
      </span>
    </div>
  );

  return streetLabel;
}

const generateOptions = (results, showScore = false) => {
  return results.map((result, idx) => {
    const streetLabel = buildAddressWithIconUI(
      result.item,
      showScore,
      result.score
    );
    return {
      key: result.item.sorter,
      label: <div>{streetLabel}</div>,
      value: result.item?.string,
      sData: result.item,
    };
  });
};

const mapDataToSearchResult = (data) => {
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
  gazData,
  setGazetteerHit,
  gazetteerHit,
  mapRef,
  overlayFeature,
  setOverlayFeature,
  referenceSystem,
  referenceSystemDefinition,
  pixelwidth = 300,
  ifShowCategories: standardSearch = false,
}) {
  const [options, setOptions] = useState([]);
  const [showCategories, setSfStandardSearch] = useState(standardSearch);
  const _gazetteerHitTrigger = undefined;
  const inputStyle = {
    width: 'calc(100% - 32px)',
    borderTopLeftRadius: 0,
  };
  const autoCompleteRef = useRef(null);
  const dropdownContainerRef = useRef(null);
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
  const [fuseInstance, setFuseInstance] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [allGazeteerData, setAllGazeteerData] = useState([]);
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useState(null);
  const [cleanBtnDisable, setCleanBtnDisable] = useState(true);
  const [showScore, setShowScore] = useState(false);

  const handleSearchAutoComplete = (value) => {
    let ifShowScore = null;
    let showSortedResults = null;
    let defaultLimit = 0;
    let defaultCut = 0.4;
    if (allGazeteerData.length > 0 && fuseInstance) {
      const hash = window.location.hash;
      const queryString = hash.includes('?') ? hash.split('?')[1] : '';
      const searchParams = new URLSearchParams(queryString);
      const distance = searchParams.get('distance');
      const threshold = searchParams.get('threshold');
      const score = searchParams.get('score');
      const sort = searchParams.get('sort');
      const limit = searchParams.get('limit');
      const cut = searchParams.get('cut');

      if (sort && sort === 'true') {
        showSortedResults = true;
      } else {
        showSortedResults = false;
      }
      if (score && score === 'true') {
        ifShowScore = true;
      } else {
        ifShowScore = false;
      }
      if (limit && parseFloat(limit) !== defaultLimit) {
        defaultLimit = parseFloat(limit);
      }
      if (distance !== fuseInstance.options.distance && distance) {
        fuseInstance.options.distance = parseFloat(distance);
      }

      if (threshold && threshold !== fuseInstance.options.threshold) {
        fuseInstance.options.threshold = parseFloat(threshold);
      }
      if (cut) {
        defaultCut = parseFloat(cut);
      }

      const removeStopWords = removeStopwords(value, stopwords);
      const result = fuseInstance.search(removeStopWords);

      let resultWithRoundScore = result.map((r) => {
        return {
          ...r,
          score: r.score.toFixed(1),
        };
      });
      if (showSortedResults) {
        resultWithRoundScore.sort(customSort);
      }

      if (defaultLimit !== 0) {
        resultWithRoundScore = limitSearchResult(
          resultWithRoundScore,
          defaultLimit,
          defaultCut
        );
      }

      if (!showCategories) {
        setOptions(generateOptions(resultWithRoundScore, ifShowScore));
      } else {
        const groupedResults = mapDataToSearchResult(result);
        setSearchResult(groupedResults);
      }
    }
  };

  useEffect(() => {
    if (autoCompleteRef.current) {
      const childNodes = autoCompleteRef.current;
      autoCompleteRef.current.scrollTo(0);
    }
  }, [options]);

  const handleOnSelect = (option) => {
    setCleanBtnDisable(false);
    internalGazetteerHitTrigger([option.sData]);
    if (option.sData.type === 'bezirke' || option.sData.type === 'quartiere') {
      setGazetteerHit(null);
    } else {
      setGazetteerHit(option.sData);
    }
  };

  useEffect(() => {
    if (gazData) {
      const allModifiedData = prepareGazData(gazData);
      setAllGazeteerData(allModifiedData);
    }
  }, [gazData]);

  useEffect(() => {
    if (!fuseInstance && allGazeteerData.length > 0) {
      const hash = window.location.hash;
      const queryString = hash.includes('?') ? hash.split('?')[1] : '';
      const searchParams = new URLSearchParams(queryString);
      const distance = searchParams.get('distance');
      const threshold = searchParams.get('threshold');

      const fuseAddressesOptions = {
        distance: !isNaN(parseInt(distance)) ? parseInt(distance) : 100,
        threshold: !isNaN(parseFloat(threshold)) ? parseFloat(threshold) : 0.5,
        useExtendedSearch: true,
        keys: ['xSearchData'],
        includeScore: true,
      };

      const fuse = new Fuse(allGazeteerData, fuseAddressesOptions);

      setFuseInstance(fuse);
    }
  }, [allGazeteerData, fuseInstance]);

  const handleShowCategories = (e) => {
    setSfStandardSearch(e.target.checked);
    setOptions([]);
    setSearchResult([]);
    setValue('');
  };

  useEffect(() => {
    console.log('xxx custom dropdown');
    if (dropdownContainerRef.current) {
      const container = dropdownContainerRef.current;
      const items = container.querySelectorAll(
        '.ant-select-item-option-content'
      );
      let maxWidth = 0;

      items.forEach((item) => {
        const itemWidth = item.offsetWidth;
        if (itemWidth > maxWidth) {
          maxWidth = itemWidth;
        }
      });

      console.log('xxx maxWidth', maxWidth);

      const dropdown = document.querySelector('.ant-select-dropdown');

      if (
        dropdown &&
        !dropdown.classList.contains('ant-select-dropdown-hidden')
      ) {
        console.log('xxx list holder', maxWidth);
        const listHolder = dropdown.querySelector(
          '.rc-virtual-list-holder > div:first-child'
        );

        // listHolder.style.width = `${maxWidth}px`;
      }
    }
  }, [dropdownContainerRef, options]);

  return (
    <div
      style={{
        marginTop: '20px',
        width: pixelwidth,
        display: 'flex',
      }}
      className="fuzzy-search-container"
    >
      <Button
        icon={
          cleanBtnDisable ? (
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{
                fontSize: '16px',
                // color: '#1d93d4',
              }}
            />
          ) : (
            <IconComp name="close" />
          )
        }
        className={
          cleanBtnDisable
            ? 'clear-fuzzy-button clear-fuzzy-button__active'
            : 'clear-fuzzy-button clear-fuzzy-button__active'
        }
        onClick={() => {
          setGazetteerHit(null);
          setValue('');
          setOptions([]);
          setSearchResult([]);
          setOverlayFeature(null);
          setCleanBtnDisable(true);
        }}
        disabled={cleanBtnDisable}
      />
      {!showCategories ? (
        <AutoComplete
          ref={autoCompleteRef}
          options={options}
          style={inputStyle}
          onSearch={(value) => handleSearchAutoComplete(value)}
          onChange={(value) => setValue(value)}
          placeholder="Wohin?"
          value={value}
          onSelect={(value, option) => handleOnSelect(option)}
          defaultActiveFirstOption={true}
          popupClassName="custom-autocomplete-dropdown"
          dropdownRender={(item) => {
            // console.log('xxx dropdown render', item);
            return (
              <div className="fuzzy-dropdownwrapper" ref={dropdownContainerRef}>
                {item}
              </div>
            );
          }}
        />
      ) : (
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          popupMatchSelectWidth={500}
          style={inputStyle}
          onSearch={(value) => handleSearchAutoComplete(value)}
          placeholder="Wohin?"
          options={searchResult}
          onSelect={(value, option) => handleOnSelect(option)}
          value={value}
          onChange={(value) => setValue(value)}
        >
          {/* <Input.Search size="large" placeholder="input here" /> */}
        </AutoComplete>
      )}
      {/* <div style={{ marginLeft: '20px', flexShrink: 0 }}>
    <Checkbox onChange={handleShowCategories} checked={showCategories}>
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
    const stringWithoutStopWords = removeStopwords(searchData, stopwords);
    const address = {
      ...item,
      xSearchData: joinNumberLetter(stringWithoutStopWords),
    };
    return address;
  });

  return modifiedData;
}

function customSort(a, b) {
  // const newA = a.item.xSearchData;
  // const newB = b.item.xSearchData;

  if (a.score !== b.score) {
    return a.score - b.score;
  }
  if (a.item.type !== b.item.type) {
    return a.item.type.localeCompare(b.item.type);
  }

  if (!a.item.sorter || !a.item.sorter) {
    return a.item.xSearchData.localeCompare(a.item.xSearchData);
  } else {
    return a.item.sorter - b.item.sorter;
  }
}

function limitSearchResult(searchRes, limit, cut = 0.4) {
  let limitedScore = searchRes[0].score < cut ? searchRes[0].score : cut;
  let countOfCategories = 1;
  searchRes.forEach((r) => {
    if (r.score <= cut && r.score > limitedScore && countOfCategories < limit) {
      limitedScore = r.score;
      countOfCategories += 1;
    }
  });

  const limitedresults = searchRes.filter((r) => r.score <= limitedScore);

  return limitedresults;
}

function customSortDigit(a, b) {
  const newA = a.item.xSearchData;
  const newB = b.item.xSearchData;

  const numA = newA.match(/\d+/) ? parseInt(newA.match(/\d+/)[0]) : null;
  const numB = newB.match(/\d+/) ? parseInt(newB.match(/\d+/)[0]) : null;

  if (numA !== null && numB !== null) {
    if (numA !== numB) {
      return numA - numB;
    } else {
      return newA.localeCompare(newB);
    }
  } else if (numA !== null) {
    return 1;
  } else if (numB !== null) {
    return -1;
  } else {
    return newA.localeCompare(newB);
  }
}
