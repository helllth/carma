import { LibModal } from "../components/LibModal";
import type { LibModalProps } from "../components/LibModal";

/* eslint-disable-next-line */

export function LayerLib({
  open,
  setOpen,
  setAdditionalLayers,
  thumbnails,
  setThumbnail,
  activeLayers,
  customCategories,
  addFavorite,
  removeFavorite,
  favorites,
  updateActiveLayer,
}: LibModalProps) {
  return (
    <LibModal
      open={open}
      setOpen={setOpen}
      setAdditionalLayers={setAdditionalLayers}
      thumbnails={thumbnails}
      setThumbnail={setThumbnail}
      activeLayers={activeLayers}
      customCategories={customCategories}
      addFavorite={addFavorite}
      removeFavorite={removeFavorite}
      favorites={favorites}
      updateActiveLayer={updateActiveLayer}
    />
  );
}

export default LayerLib;
