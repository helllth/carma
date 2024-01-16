import React from "react";
import Map from "../components/commons/Map";
import InfoTable from "../components/info/InfoTable";
import Chat from "../components/commons/Chat";
import InfoBar from "../components/commons/InfoBar";
import { useSelector } from "react-redux";
import { getAlkisLandparcel, getKassenzeichen } from "../store/slices/search";
import { getGeneralGeometryCollection } from "../store/slices/mapping";
import {
  alkisLandparcelExtractor,
  geometryExtractor,
  mappingExtractor,
} from "../tools/extractors";
import FeatureMapLayer from "../components/commons/FeatureMapLayer";

const Page = ({
  width = "100%",
  height = "100%",
  inStory = false,
  showChat = false,
}) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

  const cardStyle = { width: "100%", height: "100%", minHeight: 0 };
  const kassenzeichen = useSelector(getKassenzeichen);
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  const generalGeomArray = useSelector(getGeneralGeometryCollection);

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <InfoBar title="Info" className="py-1" />
        <div className="flex flex-col gap-2 h-full max-h-[calc(100%-40px)] overflow-clip">
          <div className="flex gap-2 h-[50%]">
            <InfoTable
              width={cardStyle.width}
              height={cardStyle.height}
              style={cardStyle}
              extractor={geometryExtractor}
            />
            <InfoTable
              width={cardStyle.width}
              height={cardStyle.height}
              style={cardStyle}
              title="Alkis Flurstücke"
              extractor={alkisLandparcelExtractor}
              dataIn={alkisLandparcel}
            />
          </div>

          <Map
            width="100%"
            height="50%"
            dataIn={{
              kassenzeichen,
              generalGeomArray,
              shownFeatureTypes: ["general"],
            }}
            extractor={mappingExtractor}
          >
            <FeatureMapLayer featureTypes={["general"]} />
          </Map>
        </div>
      </div>
      {showChat && (
        <Chat
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 99999,
          }}
          height={height * 0.45}
          width={width * 0.2}
        />
      )}
    </div>
  );
};

export default Page;
