import { SearchGazetteer } from "../../components/SearchGazetteer";
import { useCesium } from "resium";
import { useCustomViewerContext } from "../../CustomViewerContextProvider";
import { FC, useState } from "react";
import { LibFuzzySearch } from "#/libraries/mapping/fuzzy-search/src";

interface SearchWrapperProps {
  viewer?: any; // Replace 'any' with the actual type of the viewer
}

const SearchWrapper: FC<SearchWrapperProps> = ({ viewer }) => {
  const resiumCtx = useCesium();
  const { models } = useCustomViewerContext();
  const ctx = viewer ?? resiumCtx.viewer;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hit, setHit] = useState<any | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSetOverlayFeature = (feature: any) => {
    // Replace 'any' with the actual type of the feature
    console.info("handleSetOverlayFeature is still to be implemented", feature);
  };
  return (
    // <SearchGazetteer
    //   //gazData={[]}
    //   gazetteerHit={hit ?? undefined}
    //   setGazetteerHit={(hit) => {
    //     console.info("gazatteer on hit not implented", hit);
    //   }}
    //   cesiumRef={ctx}
    //   setOverlayFeature={handleSetOverlayFeature}
    //   //referenceSystem={null}
    //   //referenceSystemDefinition={null}
    //   pixelwidth={300}
    //   marker3dStyle={models ? models["MarkerFacingFixed"] : undefined}
    //   //overlayFeature={null}
    // />
    <LibFuzzySearch
      // gazData={[]}
      gazetteerHit={hit ?? undefined}
      setGazetteerHit={(hit) => {
        console.info("gazatteer on hit not implented", hit);
      }}
      cesiumRef={ctx}
      setOverlayFeature={handleSetOverlayFeature}
      referenceSystem={null}
      referenceSystemDefinition={null}
      pixelwidth={300}
      marker3dStyle={models ? models["MarkerFacingFixed"] : undefined}
      //overlayFeature={null}
    />
  );
};

export default SearchWrapper;
