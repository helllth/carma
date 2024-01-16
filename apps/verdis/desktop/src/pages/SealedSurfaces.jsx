import Map from "../components/commons/Map";
import ChangeRequests from "../components/sealedSurfaces/ChangeRequests";
import Sums from "../components/sealedSurfaces/Sums";
import Chat from "../components/commons/Chat";
import {
  areasDetailsExtractor,
  mappingExtractor,
  sumsExtractor,
} from "../tools/extractors";
import TableCard from "../components/ui/TableCard";
import { compare } from "../tools/helper";
import SubNav from "../components/sealedSurfaces/SubNav";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlaechenId,
  getKassenzeichen,
  storeFlaeche,
  storeFlaechenId,
} from "../store/slices/search";
import {
  getFlaechenCollection,
  setFlaechenSelected,
} from "../store/slices/mapping";
import FeatureMapLayer from "../components/commons/FeatureMapLayer";

const Page = ({
  width = "100%",
  height = "100%",
  inStory = false,
  showChat = false,
}) => {
  const dispatch = useDispatch();
  const kassenzeichen = useSelector(getKassenzeichen);
  const flaechenArray = useSelector(getFlaechenCollection);
  const flaechenId = useSelector(getFlaechenId);

  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

  const cardStyleArea = { width: "100%", height: "50%", minHeight: 0 };
  const cardStyleSum = { width: "100%", height: "50%", minHeight: 0 };
  const cardStyleChangeReq = {
    width: "100%",
    height: "20%",
    minHeight: 0,
  };

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <SubNav />
        <div className="flex gap-2 h-full max-h-[calc(100%-40px)]">
          <div className="flex flex-col gap-2 h-full w-[30%]">
            <TableCard
              width={cardStyleArea.width}
              height={cardStyleArea.height}
              style={cardStyleArea}
              title="Flächen"
              columns={[
                {
                  title: "Bez.",
                  dataIndex: "name",
                  key: "name",
                  sorter: (a, b) => compare(a.name, b.name),
                  defaultSortOrder: "ascend",
                },
                {
                  title: "Typ",
                  dataIndex: "type",
                  key: "type",
                  sorter: (a, b) => compare(a.type, b.type),
                },
                {
                  title: "Größe",
                  dataIndex: "groesseKorrektor",
                  key: "groesseKorrektor",
                  sorter: (a, b) =>
                    compare(a.groesseKorrektor, b.groesseKorrektor),
                  render: (area) => <div>{area} m²</div>,
                },
              ]}
              id={flaechenId}
              onRowClick={(record) => (
                dispatch(storeFlaeche(record)),
                dispatch(storeFlaechenId(record.id)),
                dispatch(setFlaechenSelected({ id: record.id }))
              )}
              extractor={areasDetailsExtractor}
            />
            <Sums
              width={cardStyleSum.width}
              height={cardStyleSum.height}
              style={cardStyleSum}
              extractor={sumsExtractor}
            />

            {/* <ChangeRequests
              width={cardStyleChangeReq.width}
              height={cardStyleChangeReq.height}
              style={cardStyleChangeReq}
            /> */}
          </div>

          <Map
            key="sealedSurfaces.map"
            width={"80%"}
            height={"100%"}
            dataIn={{
              kassenzeichen,
              flaechenArray,
              shownFeatureTypes: ["flaeche"],
            }}
            extractor={mappingExtractor}
          >
            <FeatureMapLayer featureTypes={["flaeche"]} />
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
