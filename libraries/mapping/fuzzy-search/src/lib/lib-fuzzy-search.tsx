import { useEffect, useState, useRef } from "react";
import type { IFuseOptions } from "fuse.js";
import Fuse from "fuse.js";
import { AutoComplete, Button } from "antd";
import { builtInGazetteerHitTrigger } from "react-cismap/tools/gazetteerHelper";
import "./fuzzy-search.css";
import IconComp from "react-cismap/commons/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import type { BaseSelectRef } from "rc-select";
import {
  customSort,
  generateOptions,
  getGazData,
  limitSearchResult,
  mapDataToSearchResult,
  prepareGazData,
  removeStopwords,
  stopwords,
  builtInGazetteerHitTrigger as carmaGazetteerHitTrigger,
} from "./utils/fuzzySearchHelper";
import {
  SearchResultItem,
  SearchGazetteerProps,
  Option,
  GruppedOptions,
  MapConsumer,
} from "..";
import { gazDataPrefix, sourcesConfig } from "./config";

interface FuseWithOption<T> extends Fuse<T> {
  options?: IFuseOptions<T>;
}

export function LibFuzzySearch({
  gazData,
  setGazetteerHit,
  // gazetteerHit,
  // overlayFeature,
  mapRef,
  setOverlayFeature,
  referenceSystem,
  referenceSystemDefinition,
  pixelwidth = 300,
  ifShowCategories: standardSearch = false,
  placeholder = "Wohin?",
}: SearchGazetteerProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [showCategories, setSfStandardSearch] = useState(standardSearch);
  const _gazetteerHitTrigger = undefined;
  const inputStyle = {
    width: "calc(100% - 32px)",
    borderTopLeftRadius: 0,
  };
  const autoCompleteRef = useRef<BaseSelectRef | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const mapConsumers: MapConsumer[] = [];
  mapRef && mapConsumers.push(mapRef);

  // const internalGazetteerHitTrigger = (hit) => {
  //   carmaGazetteerHitTrigger(
  //     hit,
  //     mapConsumers,
  //     {
  //       setGazetteerHit,
  //     },
  //     // referenceSystem,
  //     // referenceSystemDefinition,
  //     // setGazetteerHit,
  //     // setOverlayFeature,
  //     // _gazetteerHitTrigger,
  //   );
  // };
  const internalGazetteerHitTrigger = (hit) => {
    builtInGazetteerHitTrigger(
      hit,
      mapRef.current
        ? mapRef.current.leafletMap.leafletElement
        : mapRef.leafletMap.leafletElement,
      referenceSystem,
      referenceSystemDefinition,
      setGazetteerHit,
      setOverlayFeature,
      // _gazetteerHitTrigger,
    );
  };
  const [fuseInstance, setFuseInstance] =
    useState<FuseWithOption<SearchResultItem> | null>(null);
  const [searchResult, setSearchResult] = useState<GruppedOptions[]>([]);
  const [allGazeteerData, setAllGazeteerData] = useState([]);
  const [value, setValue] = useState("");
  const [cleanBtnDisable, setCleanBtnDisable] = useState(true);
  const [fireScrollEvent, setFireScrollEvent] = useState(null);

  const handleSearchAutoComplete = (value) => {
    let ifShowScore = false;
    let showSortedResults = false;
    let defaultLimit = 3;
    let defaultCut = 0.4;
    if (allGazeteerData.length > 0 && fuseInstance) {
      const hash = window.location.hash;
      const queryString = hash.includes("?") ? hash.split("?")[1] : "";
      const searchParams = new URLSearchParams(queryString);

      const score = searchParams.get("score");
      const sort = searchParams.get("sort");
      const limit = searchParams.get("limit");
      const cut = searchParams.get("cut");
      if (sort && sort === "true") {
        showSortedResults = true;
      } else {
        showSortedResults = false;
      }
      if (score && score === "true") {
        ifShowScore = true;
      } else {
        ifShowScore = false;
      }
      if (limit && parseFloat(limit) !== defaultLimit) {
        defaultLimit = parseFloat(limit);
      }

      if (cut) {
        defaultCut = parseFloat(cut);
      }

      const removeStopWords = removeStopwords(value, stopwords);
      const result = fuseInstance.search(removeStopWords);

      let resultWithRoundScore = result.map((r) => {
        if (r.score) {
          return {
            ...r,
            score: Number(r.score.toFixed(1)),
          };
        } else {
          return r;
        }
      });

      if (showSortedResults) {
        resultWithRoundScore.sort(customSort);
      }

      if (defaultLimit !== 0) {
        resultWithRoundScore = limitSearchResult(
          resultWithRoundScore,
          defaultLimit,
          defaultCut,
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
    if (option.sData.type === "bezirke" || option.sData.type === "quartiere") {
      setGazetteerHit(null);
    } else {
      setGazetteerHit(option.sData);
    }
  };

  useEffect(() => {
    if (gazData.leafletElement > 0) {
      const allModifiedData = prepareGazData(gazData);
      setAllGazeteerData(allModifiedData);
    } else {
      console.info("no gazeteerdata defined, fetching gazData", sourcesConfig);
      const setDataCallback = (data) => {
        // setData(data);
        setAllGazeteerData(prepareGazData(data));
      };
      Array.isArray(sourcesConfig) &&
        getGazData(sourcesConfig, gazDataPrefix, setDataCallback);
    }
  }, [gazData]);

  useEffect(() => {
    if (!fuseInstance && allGazeteerData.length > 0) {
      const fuseAddressesOptions = {
        distance: 100,
        threshold: 0.5,
        useExtendedSearch: true,
        keys: ["xSearchData"],
        includeScore: true,
      };

      const fuse = new Fuse(allGazeteerData, fuseAddressesOptions);

      setFuseInstance(fuse);
    }
  }, [allGazeteerData, fuseInstance]);

  useEffect(() => {
    if (dropdownContainerRef.current) {
      const allItems = dropdownContainerRef.current.querySelectorAll(
        ".ant-select-item-option-content",
      );

      const holderInner = dropdownContainerRef.current.querySelector(
        ".rc-virtual-list-holder-inner",
      );
      const listHolder = dropdownContainerRef.current.querySelector(
        ".rc-virtual-list-holder > div:first-child",
      );

      const antdDrapdownSelect = dropdownContainerRef.current.querySelector(
        ".rc-virtual-list-holder",
      );
      const inputElement = document.querySelector(
        ".ant-select-selection-search-input",
      );

      if (
        inputElement &&
        antdDrapdownSelect &&
        listHolder instanceof HTMLElement
      ) {
        const inputWidth = inputElement.scrollWidth;

        if (holderInner instanceof HTMLElement) {
          holderInner.style.width = inputWidth + 10 + "px";

          const handleScroll = (event) => {
            setFireScrollEvent(event.target.scrollTop);
          };
          antdDrapdownSelect.addEventListener("scroll", handleScroll);

          let biggestItem = inputWidth;

          allItems.forEach((item) => {
            const itemWidth = item.scrollWidth;
            if (itemWidth > biggestItem) biggestItem = itemWidth;
          });

          const isOverflowing = biggestItem > inputWidth;
          if (isOverflowing) {
            listHolder.style.width = holderInner.scrollWidth + "px";
            holderInner.style.width = holderInner.scrollWidth + 10 + "px";
          } else {
            listHolder.style.removeProperty("width");
          }
        }
      }
    }
  }, [dropdownContainerRef, options, fireScrollEvent, value]);

  return (
    <div
      style={{
        width: pixelwidth,
        display: "flex",
      }}
      className="fuzzy-search-container"
    >
      <Button
        icon={
          cleanBtnDisable ? (
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{
                fontSize: "16px",
                // color: '#1d93d4',
              }}
            />
          ) : (
            <IconComp name="close" />
          )
        }
        className={
          cleanBtnDisable
            ? "clear-fuzzy-button clear-fuzzy-button__active"
            : "clear-fuzzy-button clear-fuzzy-button__active"
        }
        onClick={() => {
          setGazetteerHit(null);
          setValue("");
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
          placeholder={placeholder}
          value={value}
          onSelect={(value, option) => handleOnSelect(option)}
          defaultActiveFirstOption={true}
          dropdownRender={(item) => {
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
          placeholder={placeholder}
          options={searchResult}
          onSelect={(value, option) => handleOnSelect(option)}
          value={value}
          onChange={(value) => setValue(value)}
        ></AutoComplete>
      )}
    </div>
  );
}
