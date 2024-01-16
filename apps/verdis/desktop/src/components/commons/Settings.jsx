import { useDispatch, useSelector } from "react-redux";
import {
  getSyncKassenzeichen,
  setSyncKassenzeichen,
} from "../../store/slices/settings";
import { Checkbox, Radio, Slider, Switch } from "antd";
import { useContext } from "react";
import {
  TopicMapStylingContext,
  TopicMapStylingDispatchContext,
} from "react-cismap/contexts/TopicMapStylingContextProvider";
import {
  getAdditionalLayerOpacities,
  setLayerOpacity,
} from "../../store/slices/mapping";

const SettingsRow = ({ onClick, title, children }) => {
  return (
    <div
      className="flex items-center justify-between hover:bg-zinc-100 p-1 cursor-pointer"
      onClick={onClick}
    >
      <span>{title}</span>
      {children}
    </div>
  );
};

const OptionalLayerRow = ({ title, value }) => {
  const { activeAdditionalLayerKeys, additionalLayerConfiguration } =
    useContext(TopicMapStylingContext);

  const { setActiveAdditionalLayerKeys } = useContext(
    TopicMapStylingDispatchContext
  );

  const dispatch = useDispatch();
  const opacity = useSelector(getAdditionalLayerOpacities)[value];

  const changeActiveAdditionalLayer = (value) => {
    if (activeAdditionalLayerKeys?.includes(value)) {
      // remove it from the array

      setActiveAdditionalLayerKeys(
        activeAdditionalLayerKeys.filter((item) => item !== value)
      );
    } else {
      setActiveAdditionalLayerKeys([
        ...(activeAdditionalLayerKeys || []),
        value,
      ]);
    }
  };

  return (
    <div className="flex items-center gap-2 hover:bg-zinc-100 p-1">
      <Checkbox
        checked={activeAdditionalLayerKeys?.includes(value)}
        onClick={() => changeActiveAdditionalLayer(value)}
      />
      <span
        className="w-1/4 cursor-pointer"
        onClick={() => changeActiveAdditionalLayer(value)}
      >
        {title}
      </span>
      <Slider
        defaultValue={opacity * 100}
        onAfterChange={(opacity) =>
          dispatch(setLayerOpacity({ layer: value, opacity: opacity / 100 }))
        }
        disabled={false}
        className="w-full"
      />
    </div>
  );
};

const Settings = () => {
  const dispatch = useDispatch();
  const syncKassenzeichen = useSelector(getSyncKassenzeichen);

  const { selectedBackground } = useContext(TopicMapStylingContext);

  const { setSelectedBackground } = useContext(TopicMapStylingDispatchContext);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h3>Allgemein</h3>
        <SettingsRow
          onClick={() => dispatch(setSyncKassenzeichen(!syncKassenzeichen))}
          title="Kassenzeichen mit Java Anwendung synchronisieren"
        >
          <Switch className="w-fit" checked={syncKassenzeichen} />
        </SettingsRow>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Karte</h3>
        <h4>Optionale Layer</h4>
        <OptionalLayerRow title="Gebäude" value="nrwAlkisGebaeude" />
        <OptionalLayerRow title="Flurstücke" value="nrwAlkisFstck" />
        <h4>Hintergrund</h4>
        <Radio.Group
          onChange={(e) => setSelectedBackground(e.target.value)}
          value={selectedBackground}
        >
          <div className="flex flex-col gap-2 p-1">
            <Radio value="default">Standard</Radio>
            <Radio value="stadtplan">Stadtplan</Radio>
            <Radio value="lbk">Lbk</Radio>
            <Radio value="ortho">Orthofoto</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Settings;
