import {
  faChevronLeft,
  faChevronRight,
  faInfo,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Slider } from 'antd';
import { forwardRef, useContext } from 'react';
import { TopicMapContext } from 'react-cismap/contexts/TopicMapContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '../../helper/helper';
import {
  changeOpacity,
  setNextSelectedLayerIndex,
  setPreviousSelectedLayerIndex,
} from '../../store/slices/mapping';
import {
  getShowInfo,
  getShowInfoText,
  setShowInfo,
  setShowInfoText,
} from '../../store/slices/ui';
import Info from './Info';
import { iconColorMap, iconMap } from './items';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';

interface SecondaryViewProps {
  icon: string;
  layer: Layer;
  background?: boolean;
}

type Ref = HTMLDivElement;

const SecondaryView = forwardRef<Ref, SecondaryViewProps>(
  ({ icon, layer, background }, ref) => {
    // @ts-ignore
    const { routedMapRef } = useContext(TopicMapContext);
    const dispatch = useDispatch();
    const showInfo = useSelector(getShowInfo);
    const showInfoText = useSelector(getShowInfoText);
    const urlPrefix = window.location.origin + window.location.pathname;

    return (
      <div className="absolute top-12 w-[calc(100%-60px)] left-20 pr-72 z-[999] flex justify-center items-center">
        <div
          ref={ref}
          className={cn(
            `bg-white rounded-[10px] 2xl:w-1/2 w-full flex flex-col relative px-10 gap-2 py-2 transition-all duration-300`,
            showInfo ? 'h-[600px]' : 'h-12'
          )}
          onMouseEnter={() => {
            routedMapRef?.leafletMap?.leafletElement.dragging.disable();
            routedMapRef?.leafletMap?.leafletElement.scrollWheelZoom.disable();
          }}
          onMouseLeave={() => {
            routedMapRef?.leafletMap?.leafletElement.dragging.enable();
            routedMapRef?.leafletMap?.leafletElement.scrollWheelZoom.enable();
          }}
        >
          <button
            className="text-base rounded-full flex items-center justify-center p-2 hover:text-neutral-600 absolute top-2 left-1"
            onClick={() => dispatch(setPreviousSelectedLayerIndex())}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="text-base rounded-full flex items-center justify-center p-2 hover:text-neutral-600 absolute top-2 right-1"
            onClick={() => dispatch(setNextSelectedLayerIndex())}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div className="flex items-center h-8 gap-6">
            <div className="w-1/4 min-w-max truncate flex items-center gap-2">
              {icon === 'ortho' ? (
                <div style={{ height: 14, width: 14 }}>
                  <img
                    src={urlPrefix + 'images/ortho.png'}
                    alt="Ortho"
                    className="h-full"
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  icon={icon ? iconMap[icon] : faLayerGroup}
                  className="text-base"
                  style={{ color: iconColorMap[icon] }}
                  id="icon"
                />
              )}
              <label className="mb-0 text-base font-medium pt-1" htmlFor="icon">
                {layer.title}
              </label>
            </div>
            <div className="w-full flex items-center gap-2">
              <label
                className="mb-0 text-base font-medium"
                htmlFor="opacity-slider"
              >
                Transparenz:
              </label>
              <Slider
                disabled={background}
                onFocus={() => {
                  routedMapRef?.leafletMap?.leafletElement.dragging.disable();
                }}
                onChange={(value) => {
                  dispatch(changeOpacity({ id: layer.id, opacity: value }));
                }}
                onChangeComplete={() => {
                  routedMapRef?.leafletMap?.leafletElement.dragging.enable();
                }}
                value={layer.opacity}
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
              onClick={() => {
                dispatch(setShowInfo(!showInfo));
                setTimeout(
                  () => dispatch(setShowInfoText(!showInfoText)),
                  showInfoText ? 0 : 80
                );
              }}
            />
          </div>

          {showInfoText && (
            <Info description={layer.description} legend={layer.legend} />
          )}
        </div>
      </div>
    );
  }
);

export default SecondaryView;
