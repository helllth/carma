import { SearchResultItem, SearchResult, Option, GruppedOptions } from "..";
export const renderTitle = (category: string) => {
  let title = "???";
  switch (category) {
    case "pois":
      title = "POIS";
      break;
    case "bpklimastandorte":
      title = "Klimastandorte";
      break;
    case "kitas":
      title = "Kitas";
      break;
    case "bezirke":
      title = "Bezirke";
      break;
    case "quartiere":
      title = "Quartiere";
      break;
    case "adressen":
      title = "Adressen";
      break;
    default:
      title = category;
      break;
  }
  return <span>{title}</span>;
};
export const joinNumberLetter = (name: string) =>
  name.replace(/(\d+)\s([a-zA-Z])/g, "$1$2");
export const renderItem = (address: SearchResultItem) => {
  const addressLabel = buildAddressWithIconUI(address, false);
  return {
    key: address.sorter,
    value: address.string,
    label: addressLabel,
    sData: address,
  };
};
export function buildAddressWithIconUI(
  addresObj: SearchResultItem,
  showScore = false,
  score?: number,
) {
  let icon;
  if (addresObj.glyph === "pie-chart") {
    icon = "chart-pie";
  } else {
    icon = addresObj.glyph;
  }
  const streetLabel = (
    <div style={{ paddingLeft: "0.3rem" }}>
      <span style={{ marginRight: "0.4rem" }}>
        <i className={icon && "fas " + "fa-" + icon}></i>
        {"  "}
      </span>
      <span>
        {showScore ? (
          <span>
            <span>{joinNumberLetter(addresObj.string)}</span>
            <span style={{ color: "gray" }}> ({score})</span>
          </span>
        ) : (
          joinNumberLetter(addresObj.string)
        )}
      </span>
    </div>
  );

  return streetLabel;
}
export const generateOptions = (
  results: SearchResult<SearchResultItem>[],
  showScore = false,
) => {
  return results.map((result, idx) => {
    const streetLabel = buildAddressWithIconUI(
      result.item,
      showScore,
      result.score,
    );
    return {
      key: result.item.sorter,
      label: <div>{streetLabel}</div>,
      value: result.item?.string,
      sData: result.item,
    };
  });
};
export const mapDataToSearchResult = (
  data: SearchResult<SearchResultItem>[],
) => {
  const splittedCategories: { [key: string]: Option[] } = {};

  data.forEach((item) => {
    const address = item.item;
    const catName = address.type;

    if (splittedCategories.hasOwnProperty(catName)) {
      splittedCategories[catName].push(renderItem(address));
    } else {
      splittedCategories[catName] = [renderItem(address)];
    }
  });

  const prepareOptions: GruppedOptions[] = [];

  Object.keys(splittedCategories).forEach((item) => {
    let optionItem: GruppedOptions = {};

    if (!optionItem.hasOwnProperty(item)) {
      optionItem.label = renderTitle(item);
      optionItem.options = splittedCategories[item];
    }

    prepareOptions.push(optionItem);
  });

  return prepareOptions;
};
const preps = [
  "an",
  "auf",
  "hinter",
  "neben",
  "über",
  "unter",
  "vor",
  "zwischen",
  "durch",
  "für",
  "gegen",
  "ohne",
  "um",
  "mit",
  "bei",
  "nach",
  "in",
  "von",
  "zu",
  "aus",
  "bis",
  "seit",
  "anstatt",
  "außerhalb",
  "innerhalb",
];
const articles = ["der", "die", "das", "den", "dem", "des"];
export const stopwords = [...preps, ...articles];
export function removeStopwords(text, stopwords) {
  const words = text.split(" ");
  const placeholderWords = words.map((word) => {
    if (stopwords.includes(word.toLowerCase())) {
      // Replace each character in the word with an underscore
      return "_".repeat(word.length);
    }
    return word;
  });
  return placeholderWords.join(" ");
}
export function prepareGazData(data) {
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
export function customSort(a, b) {
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
export function limitSearchResult(searchRes, limit, cut = 0.4) {
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
