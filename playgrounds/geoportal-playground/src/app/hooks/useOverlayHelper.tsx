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
  placement: string;
  contentPlacement: string;
}

const useOverlayHelper = (
  content: string,
  container: string = 'center',
  contentPlacement: string = 'center',
) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { addConfig, removeConfig } = useContext(OverlayTourContext);
  useLayoutEffect(() => {
    if (!ref) return;

    const config: OverlayHelperConfig = {
      el: ref,
      message: content,
      placement: container,
      contentPlacement,
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
