import { useEffect, useState } from "react";
import { Cesium3DTileset as Resium3DTileset, useCesium } from "resium";
import {
  setShowPrimaryTileset,
  setShowSecondaryTileset,
  useShowPrimaryTileset,
  useShowSecondaryTileset,
  useTilesetOpacity,
  useViewerDataSources,
} from "../../CustomViewerContextProvider/slices/cesium";
import {
  Cesium3DTileset,
  CustomShader,
  ShadowMode,
  viewerCesium3DTilesInspectorMixin,
} from "cesium";
import { useSecondaryStyleTilesetClickHandler } from "../../hooks";
import { useTweakpaneCtx } from "@carma-commons/debug";
import {
  CUSTOM_SHADERS_DEFINITIONS,
  CustomShaderKeys as k,
} from "../../shaders";

import { create3DTileStyle } from "../../utils";
import { useCesiumCustomViewer } from "../../CustomViewerContextProvider";

const preloadWhenHidden = true;
let enableDebugWireframe = false;
const defaultMaximumScreenSpaceError = 8; // 16 is default but quite Low Quality

const customShaderKeys = {
  clay: k.CLAY,
  "unlit 2020": k.UNLIT_ENHANCED_2020,
  "unlit 2024": k.UNLIT_ENHANCED_2024,
  unlit: k.UNLIT,
  "unlit fog": k.UNLIT_FOG,
  monochrome: k.MONOCHROME,
  undefined: k.UNDEFINED,
};

const debugTilesetUrls = {
  wupp2020: "https://wupp-3d-data.cismet.de/mesh/tileset.json",
  wupp2024: "https://wupp-3d-data.cismet.de/mesh2024/tileset.json",
};

const DEFAULT_MESH_SHADER_KEY = k.UNLIT_ENHANCED_2024;
const DEFAULT_MESH_SHADER = new CustomShader(
  CUSTOM_SHADERS_DEFINITIONS[DEFAULT_MESH_SHADER_KEY],
);

export const BaseTilesets = () => {
  const tilesets = useViewerDataSources().tilesets;
  const showPrimary = useShowPrimaryTileset();
  //const { viewer } = useCesium();
  const { viewer } = useCesiumCustomViewer();
  const showSecondary = useShowSecondaryTileset();
  const [tsA, setTsA] = useState<Cesium3DTileset | null>(null);
  const [tsB, setTsB] = useState<Cesium3DTileset | null>(null);
  const [showTileInspector, setShowTileInspector] = useState(false);
  const [customShaderKey, setCustomShaderKey] = useState(
    DEFAULT_MESH_SHADER_KEY,
  );
  const [customMeshShader, setCustomMeshShader] = useState<
    undefined | CustomShader
  >(DEFAULT_MESH_SHADER);
  const [maximumScreenSpaceErrorPrimary, setMaximumScreenSpaceErrorPrimary] = useState(
    tilesets.primary?.maximumScreenSpaceError ?? defaultMaximumScreenSpaceError
  );
  const [maximumScreenSpaceErrorSecondary, setMaximumScreenSpaceErrorSecondary] = useState(
    tilesets.secondary?.maximumScreenSpaceError ?? defaultMaximumScreenSpaceError
  );

  const [primaryTilesetUrl, setPrimaryTilesetUrl] = useState(
    tilesets.primary?.url ?? ""
  );

  const tilesetOpacity = useTilesetOpacity();

  const style = create3DTileStyle({
    color: `vec4(1.0, 1.0, 1.0, ${tilesetOpacity.toFixed(2)})`,
    show: true,
  });

  // SAMPLE for 3DTilesStyles
  /*
  const styleThematicLod2 = create3DTileStyle({
    //color: `vec4(0.5, 1.0, 1.0, ${tilesetOpacity.toFixed(2)})`,
    // eslint-disable-next-line no-template-curly-in-string
    color:
      '(${building_id} === "DENW29AL1000AzKQ")? color("orange") : color("grey")',
    show: true,
  });
  */

  const { folderCallback } = useTweakpaneCtx(
    {
      title: "Base Tilesets",
    },
    {
      get customShaderKey() {
        return customShaderKey;
      },
      set customShaderKey(v) {
        setCustomShaderKey(v);
        if (tsA) {
          const def = CUSTOM_SHADERS_DEFINITIONS[customShaderKeys[v]];
          if (def === k.UNDEFINED) {
            setCustomMeshShader(undefined);
            tsA.customShader = undefined;
          } else {
            const shader = new CustomShader(CUSTOM_SHADERS_DEFINITIONS[v]);
            tsA.customShader = shader;
            setCustomMeshShader(shader);
          }
        }
      },
      get primaryTilesetUrl() {
        return primaryTilesetUrl;
      },
      set primaryTilesetUrl(v: string) {
        setPrimaryTilesetUrl(v);
      },
      get enableDebugWireframe() {
        return enableDebugWireframe;
      },
      set enableDebugWireframe(v: boolean) {
        enableDebugWireframe = v;
        if (tsA) {
          tsA.debugWireframe = v;
        }
        if (tsB) {
          tsB.debugWireframe = v;
        }
      },
      get showPrimary() {
        return tsA?.show ?? false;
      },
      set showPrimary(v: boolean) {
        setShowPrimaryTileset(v);
        if (tsA) {
          tsA.show = v;
        }
      },
      get showSecondary() {
        return tsB?.show ?? false;
      },
      set showSecondary(v: boolean) {
        setShowSecondaryTileset(v);
        if (tsB) {
          tsB.show = v;
        }
      },
      get maximumScreenSpaceErrorPrimary() {
        return maximumScreenSpaceErrorPrimary;
      },
      set maximumScreenSpaceErrorPrimary(v: number) {
        setMaximumScreenSpaceErrorPrimary(v);
        if (tsA) {
          tsA.maximumScreenSpaceError = v;
        }
      },
      get maximumScreenSpaceErrorSecondary() {
        return maximumScreenSpaceErrorSecondary;
      },
      set maximumScreenSpaceErrorSecondary(v: number) {
        setMaximumScreenSpaceErrorSecondary(v);
        if (tsB) {
          tsB.maximumScreenSpaceError = v;
        }
      },
    },

    [
      { name: "customShaderKey", options: customShaderKeys },
      { name: "primaryTilesetUrl", options: { default: tilesets.primary?.url ?? "", ...debugTilesetUrls } },
      { name: "enableDebugWireframe" },
      { name: "showPrimary" },
      { name: "showSecondary" },
      { name: "maximumScreenSpaceErrorPrimary", min: 1, max: 16, step: 1 },
      { name: "maximumScreenSpaceErrorSecondary", min: 1, max: 16, step: 1 },
    ],
  );

  useEffect(() => {
    console.log("HOOK BaseTilesets: showPrimary", showPrimary);
    if (tsA) {
      // workaround to toggle tileset visibility,
      // resium does not seem to forward the show prop after first initialization
      tsA.show = showPrimary;
    }
    if (tsB) {
      // workaround to toggle tileset visibility,
      // resium does not seem to forward the show prop after first initialization
      tsB.show = showSecondary;
    }
  }, [showPrimary, tsA, showSecondary, tsB]);

  useSecondaryStyleTilesetClickHandler();

  useEffect(() => {
    folderCallback &&
      folderCallback((folder) => {
        if (!showTileInspector) {
          // TILE INSPECTOR MIXIN cant be removed once added

          const button = folder.addButton({
            title: "Show Tile Inspector",
          });
          button.on("click", () => {
            if (viewer) {
              viewer.extend(viewerCesium3DTilesInspectorMixin);
              setShowTileInspector(true);
            }
          });
        }
      });
  }, [folderCallback, viewer, showTileInspector]);

  useEffect(() => {
    if (viewer) {
      viewer.scene.light.intensity = 2.0;
      viewer.scene.fog.enabled = false;
    }
  }, [viewer]);

  return (
    <>
      <Resium3DTileset
        key={primaryTilesetUrl}
        show={showPrimary}
        customShader={customMeshShader}
        enableDebugWireframe={enableDebugWireframe}
        // quality
        //cacheBytes={536870912 * 2}
        shadows={ShadowMode.DISABLED}
        dynamicScreenSpaceError={false}
        //baseScreenSpaceError={256}
        maximumScreenSpaceError={maximumScreenSpaceErrorPrimary}
        foveatedScreenSpaceError={false}
        //skipScreenSpaceErrorFactor={8}
        //skipLevelOfDetail={true}
        //immediatelyLoadDesiredLevelOfDetail={true}
        url={primaryTilesetUrl}
        style={style}
        enableCollision={false}
        preloadWhenHidden={preloadWhenHidden}
        onReady={(tileset) => setTsA(tileset)}
      />
      <Resium3DTileset
        show={showSecondary}
        enableDebugWireframe={enableDebugWireframe}
        // quality
        dynamicScreenSpaceError={false}
        maximumScreenSpaceError={maximumScreenSpaceErrorSecondary}
        foveatedScreenSpaceError={false}
        //skipScreenSpaceErrorFactor={4}
        skipLevelOfDetail={true}
        //immediatelyLoadDesiredLevelOfDetail={true}

        url={tilesets.secondary?.url ?? ""}
        style={style}
        //style={styleThematicLod2}

        enableCollision={false}
        preloadWhenHidden={preloadWhenHidden}
        onReady={(tileset) => setTsB(tileset)}
      />
    </>
  );
};
