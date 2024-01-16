import React from "react";
import Map from "../components/commons/Map";
import SewerConnection from "../components/seepagePermits/SewerConnection";
import FileNumber from "../components/seepagePermits/FileNumber";
import Chat from "../components/commons/Chat";
import {
  fileNumberExtractor,
  mappingExtractor,
  sewerConnectionExtractor,
} from "../tools/extractors";
import SubNav from "../components/seepagePermits/SubNav";
import { getKassenzeichen } from "../store/slices/search";
import { useSelector } from "react-redux";
import { getBefreiungErlaubnisCollection } from "../store/slices/mapping";
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

  const cardStyleConnection = { width: "100%", height: "65%", minHeight: 0 };
  const cardStyleFileNumber = { width: "100%", height: "100%", minHeight: 0 };

  const kassenzeichen = useSelector(getKassenzeichen);
  const befreiungErlaubnisseArray = useSelector(
    getBefreiungErlaubnisCollection
  );

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <SubNav />
        <div className="flex gap-2 h-full max-h-[calc(100%-40px)]">
          <div className="flex flex-col gap-2 h-full w-[30%]">
            <SewerConnection
              width={cardStyleConnection.width}
              height={cardStyleConnection.height}
              style={cardStyleConnection}
              extractor={sewerConnectionExtractor}
            />
            <FileNumber
              width={cardStyleFileNumber.width}
              height={cardStyleFileNumber.height}
              style={cardStyleFileNumber}
              extractor={fileNumberExtractor}
            />
          </div>
          <Map
            key={"seepagePermits.map"}
            width={"80%"}
            height={"100%"}
            dataIn={{
              kassenzeichen,
              befreiungErlaubnisseArray,
              shownFeatureTypes: ["befreiung"],
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
