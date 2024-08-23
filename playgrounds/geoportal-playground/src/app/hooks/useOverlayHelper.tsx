import {
  useEffect,
  useState,
  createContext,
  useContext,
  useLayoutEffect,
} from 'react';
import OverlayHelperHightlighter from '../components/OverlayHelperHightlighter';
import { useSelector } from 'react-redux';
import { getMode } from '../store/slices/ui';
const OverlayTourContext = createContext({
  configs: [],
  addConfig: (arg) => {},
  removeConfig: (arg) => {},
});

export interface OverlayHelperConfig {
  el: HTMLElement;
  message: string;
  containerPos: string;
  contentPos: string;
}

export type PlacementOverlayHelper = {
  containerPos: string;
  contentPos: string;
};

const useOverlayHelper = (
  content: string,
  placementSettings: PlacementOverlayHelper = {
    containerPos: 'center',
    contentPos: 'center',
  },
) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { addConfig, removeConfig } = useContext(OverlayTourContext);
  const { containerPos, contentPos } = placementSettings;
  useLayoutEffect(() => {
    if (!ref) return;

    const config: OverlayHelperConfig = {
      el: ref,
      message: content,
      containerPos,
      contentPos,
    };
    console.log('yyy hook ref');
    addConfig(config);

    return () => {
      removeConfig(config);
    };
  }, [ref, content]);

  return setRef;
};

export default useOverlayHelper;

export const OverlayTourProvider = ({ children }) => {
  const [configs, setConfigs] = useState<OverlayHelperConfig[]>([]);
  const mode = useSelector(getMode);

  useEffect(() => {}, [configs]);

  const addConfig = (config) => {
    setConfigs((prevConfigs) => [...prevConfigs, config]);
  };

  const removeConfig = (config) => {
    setConfigs((prevConfigs) => prevConfigs.filter((c) => c !== config));
  };

  return (
    <OverlayTourContext.Provider value={{ configs, addConfig, removeConfig }}>
      {children}
      {mode === 'tour' && <OverlayHelperHightlighter configs={configs} />}
    </OverlayTourContext.Provider>
  );
};
