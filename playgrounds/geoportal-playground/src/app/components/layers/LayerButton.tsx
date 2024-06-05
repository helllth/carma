import {
  faChevronLeft,
  faChevronRight,
  faInfo,
  faX,
  faCircle,
  faGlobe,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeOpacity,
  getSelectedLayerIndex,
  getShowInfo,
  removeLayer,
  setNextSelectedLayerIndex,
  setPreviousSelectedLayerIndex,
  setSelectedLayerIndex,
  setShowInfo,
} from '../../store/slices/mapping';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slider, Tabs } from 'antd';
import { useContext, useRef, useState } from 'react';
import { TopicMapContext } from 'react-cismap/contexts/TopicMapContextProvider';
import { cn } from '../../helper/helper';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import './tabs.css';
// import { faCircle } from '@fortawesome/free-regular-svg-icons';

interface LayerButtonProps {
  title: string;
  id: string;
  opacity: number;
  index: number;
  description?: string;
  icon?: string;
  layer: Layer;
}

const iconMap = {
  bäume: faCircle,
  gärten: faSquare,
  ortho: faGlobe,
};

const iconColorMap = {
  bäume: 'green',
  gärten: 'purple',
  ortho: 'black',
};

const LayerButton = ({
  title,
  id,
  opacity,
  index,
  description,
  icon,
  layer,
}: LayerButtonProps) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { routedMapRef } = useContext(TopicMapContext);
  const showInfo = useSelector(getShowInfo);
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const showSettings = index === selectedLayerIndex;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = { transform: CSS.Translate.toString(transform) };

  const parseDescription = (description: string) => {
    const result = { inhalt: '', sichtbarkeit: '', nutzung: '' };
    const keywords = ['Inhalt:', 'Sichtbarkeit:', 'Nutzung:'];

    function extractTextAfterKeyword(input, keyword) {
      const index = input.indexOf(keyword);
      if (index !== -1) {
        const startIndex = index + keyword.length;
        let endIndex = input.length;
        for (const nextKeyword of keywords) {
          const nextIndex = input.indexOf(nextKeyword, startIndex);
          if (nextIndex !== -1 && nextIndex < endIndex) {
            endIndex = nextIndex;
          }
        }
        return input.slice(startIndex, endIndex).trim();
      }
      return '';
    }

    result.inhalt = extractTextAfterKeyword(description, 'Inhalt:');
    result.sichtbarkeit = extractTextAfterKeyword(description, 'Sichtbarkeit:');
    result.nutzung = extractTextAfterKeyword(description, 'Nutzung:');

    return result;
  };

  const parsedDescription = parseDescription(description);

  const tabItems = [
    {
      label: 'Legende',
      key: '1',
      children: (
        <div className="h-full overflow-auto">
          {layer.legend?.map((legend, i) => (
            <img
              key={`legend_${i}`}
              src={legend.OnlineResource}
              alt="Legende"
              className="h-full"
            />
          ))}
        </div>
      ),
    },
    {
      label: 'Hintergrund',
      key: '2',
      children: (
        <p>
          Die Datenmodellierung lehnt sich an die ISO19112 an und beinhaltet u.
          a. die Mehrfachkategorisierung bei Auszeichnung einer Hauptkategorie,
          die optionale Zuordnung mehrerer alternativer Namen sowie die
          Zuordnung zu übergeordneten Themenfeldern (Lebenslagen). Die
          Koordinaten der POI bezogen sich ursprünglich auf die Amtliche
          Stadtkarte Wuppertal, eine leicht generalisierte Karte im Maßstab
          1:15.000. In 06/2018 wurden die POI-Koordinaten für die Nutzung der
          POI im Online-Stadtplan der Stadt Wuppertal, der mit dem Stadtplanwerk
          2.0 (SPW2.0) des Regionalverbandes Ruhr eine nicht generalisierte
          Kartengrundlage verwendet, überarbeitet. Dabei wurden vermittelnde
          Positionen bestimmt, die bei beiden Karten eine korrekte Lagezuordnung
          des POI zur Situationsdarstellung in der Hintergrundkarte ermöglichen.
          Die laufende Aktualisierung der Daten erfolgt im Zusammenhang mit den
          Kartenredaktionsarbeiten für die Fortführung des SPW2.0 im Bereich der
          Stadt Wuppertal. Der Datensatz ist unter einer Open-Data-Lizenz (CC BY
          4.0) verfügbar. Er umfasst jedoch Hyperlinks von Fotos, die u. U.
          nicht unter diese Lizenz fallen. Eine Weitergabe oder Veröffentlichung
          dieser Bilder ist mit dem jeweiligen Bildersteller zu vereinbaren.
        </p>
      ),
    },
    {
      label: 'Technische Informationen',
      key: '3',
    },
  ];
  return (
    <div>
      <div
        ref={setNodeRef}
        onClick={() =>
          dispatch(setSelectedLayerIndex(showSettings ? -1 : index))
        }
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          'w-fit min-w-max flex items-center gap-2 px-3 rounded-3xl h-8 z-[99999999] button-shadow',
          selectedLayerIndex === -1
            ? 'bg-white'
            : showSettings
            ? 'bg-white'
            : 'bg-neutral-200'
        )}
      >
        <FontAwesomeIcon
          icon={icon ? iconMap[icon] : faMap}
          className="text-base p-1"
          style={{ color: iconColorMap[icon] }}
        />
        <span className="text-sm font-medium">{title}</span>
        <FontAwesomeIcon
          icon={faX}
          className="p-1"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeLayer(id));
          }}
        />
      </div>
      {showSettings && (
        <div className="absolute top-12 w-[calc(100%-60px)] left-20 pr-72 z-[999] flex justify-center items-center">
          <div
            className={cn(
              `bg-white rounded-3xl 2xl:w-1/2 w-full flex flex-col relative px-10 gap-2 py-2`,
              showInfo ? 'h-[600px]' : 'h-12'
            )}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-base absolute top-4 left-2.5"
              role="button"
              onClick={() => dispatch(setPreviousSelectedLayerIndex())}
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-base absolute top-4 right-2.5"
              role="button"
              onClick={() => dispatch(setNextSelectedLayerIndex())}
            />
            <div className="flex items-center h-8 gap-6">
              <div className="w-1/4 min-w-max truncate flex items-center gap-2">
                <FontAwesomeIcon
                  icon={icon ? iconMap[icon] : faMap}
                  className="text-base"
                  style={{ color: iconColorMap[icon] }}
                  id="icon"
                />
                <label className="mb-0 text-sm font-medium pt-1" htmlFor="icon">
                  {title}
                </label>
              </div>
              <div className="w-full flex items-center gap-2">
                <label
                  className="mb-0 text-sm font-medium"
                  htmlFor="opacity-slider"
                >
                  Transparenz:
                </label>
                <Slider
                  onFocus={() => {
                    routedMapRef?.leafletMap?.leafletElement.dragging.disable();
                  }}
                  onChange={(value) => {
                    dispatch(changeOpacity({ id, opacity: value }));
                  }}
                  onChangeComplete={() => {
                    routedMapRef?.leafletMap?.leafletElement.dragging.enable();
                  }}
                  value={opacity}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-2/3"
                  id="opacity-slider"
                />
              </div>
              <FontAwesomeIcon
                icon={faInfo}
                className="text-base"
                onClick={() => dispatch(setShowInfo(!showInfo))}
              />
            </div>

            {showInfo && (
              <>
                <h4 className="font-semibold">Informationen</h4>
                {/* <hr className="h-px my-0 bg-gray-300 border-0 w-full" /> */}
                {parsedDescription && (
                  <div>
                    <h5 className="font-semibold">Inhalt</h5>
                    <p className="text-sm">{parsedDescription.inhalt}</p>
                    <h5 className="font-semibold">Sichtbarkeit</h5>
                    <p className="text-sm">
                      {parsedDescription.sichtbarkeit.slice(0, -1)}
                    </p>
                    <h5 className="font-semibold">Nutzung</h5>
                    <p className="text-sm">{parsedDescription.nutzung}</p>
                  </div>
                )}
                <hr className="h-px my-0 bg-gray-300 border-0 w-full" />
                <Tabs defaultActiveKey="1" items={tabItems} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LayerButton;
