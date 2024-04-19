import LibModal, { LibModalProps } from '../components/LibModal';

/* eslint-disable-next-line */

export function LayerLib({
  open,
  setOpen,
  setAdditionalLayers,
}: LibModalProps) {
  return (
    <LibModal
      open={open}
      setOpen={setOpen}
      setAdditionalLayers={setAdditionalLayers}
    />
  );
}

export default LayerLib;
