import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
    Cartesian3,
    Cartographic,
} from "cesium";

import { useTweakpaneCtx } from "@carma-commons/debug";

import { useCesiumCustomViewer } from "../../../CustomViewerContextProvider";
import { getPositionWithHeightAsync } from '../../../utils/positions';
import "./elevation-control.css";
import { wrap } from "module";

const getNewPosition = (posCarto: Cartographic, newHeight: number): Cartesian3 => {
    return Cartesian3.fromRadians(
        posCarto.longitude,
        posCarto.latitude,
        newHeight,
    );
}

interface ElevationControlProps {
    displayHeight: number;
    show: boolean;
    useClampedHeight: boolean;
}

const defaultOptions: ElevationControlProps = {
    displayHeight: 600,
    show: false,
    useClampedHeight: false,
};

function ElevationControl(options: Partial<ElevationControlProps> = {}) {

    const { displayHeight, show, useClampedHeight } = { ...defaultOptions, ...options };

    const localMinEllipsoidalHeight = 100; // Sea level reference

    const [ellipsoidHeight, setEllipsoidHeight] = useState<number>(localMinEllipsoidalHeight);
    const [terrainHeight, setTerrainHeight] = useState<number>(0);
    const [clampedHeight, setClampedHeight] = useState<number>(0);
    const [clampedRelHeightFmt, setClampedRelHeightFmt] = useState<string>("-");
    const [cameraHeight, setCameraHeight] = useState<number>(0);
    const [cameraRelHeightFmt, setCameraRelHeightFmt] = useState<string>("-");
    const [cameraRelClampedHeightFmt, setCameraRelClampedHeightFmt] = useState<string>("-");
    const [cameraHeightFmt, setCameraHeightFmt] = useState<string>("-");
    const [terrainHeightFmt, setTerrainHeightFmt] = useState<string>("-");

    const [maxDisplayHeight, setMaxDisplayHeight] = useState<number>(10000); // Adjust as needed
    const controlRef = useRef<HTMLDivElement>(null);
    const { viewer } = useCesiumCustomViewer();
    const [alwaysShow, setAlwaysShow] = useState(false);
    const [clamp, setClamp] = useState(useClampedHeight);

    const lastCameraPosition = useRef<Cartesian3 | null>(null);

    useTweakpaneCtx({ title: "Elevation UI" }, {
        get alwaysShow() {
            return alwaysShow;
        },
        set alwaysShow(value: boolean) {
            setAlwaysShow(value);
        },
        get clamp() {
            return clamp;
        },
        set clamp(value: boolean) {
            setClamp(value);
        }
    }, [
        {
            name: "alwaysShow",
            label: "Always Show",
            type: "boolean",
        },
        {
            name: "clamp",
            label: "Clamp Tileset Height",
            type: "boolean",
        }
    ]);


    useEffect(() => {
        if (viewer && (alwaysShow || show)) {
            // todo provide these heights and position somewhere centralized state, 
            // don't recompute for every new use in update loop
            const updateHeights = () => {
                if (lastCameraPosition.current !== null && viewer.camera.position.equals(lastCameraPosition.current)) {
                    return;
                }
                const cameraPositionCartographic = viewer.camera.positionCartographic;
                const currentCameraHeight = cameraPositionCartographic.height;
                setCameraHeightFmt(`${cameraPositionCartographic.height.toFixed(0)}m`);
                getPositionWithHeightAsync(viewer.scene, cameraPositionCartographic, false).then((position) => {
                    setTerrainHeight(position.height);
                    setCameraRelHeightFmt(`${(currentCameraHeight - position.height).toFixed(0)}m`);
                    setTerrainHeightFmt(`${position.height.toFixed(0)}m`);
                    setCameraHeight(currentCameraHeight);
                    setEllipsoidHeight(localMinEllipsoidalHeight);

                    // Update maxDisplayHeight based on current heights
                    const maxHeight = Math.max(
                        currentCameraHeight,
                        position.height,
                        localMinEllipsoidalHeight + 400, // Ensure some extra space
                    );
                    setMaxDisplayHeight(Math.min(maxHeight * 1.1, 50000));
                    lastCameraPosition.current = viewer.camera.position.clone();

                    if (clamp) {
                        getPositionWithHeightAsync(viewer.scene, cameraPositionCartographic, true).then((clampedPosition) => {
                            setClampedHeight(clampedPosition.height);
                            setCameraRelClampedHeightFmt(`${(currentCameraHeight - clampedPosition.height).toFixed(0)}m`);
                            setClampedRelHeightFmt(`${(clampedPosition.height - position.height).toFixed(1)}m`);
                        });
                    }
                });
            };
            updateHeights();
            viewer.scene.preRender.addEventListener(updateHeights);
            return () => {
                viewer.scene.preRender.removeEventListener(updateHeights);
            };
        }
    }, [viewer, alwaysShow, show, clamp]);

    const clampedHeightDisplayPosition =
        ((clampedHeight - ellipsoidHeight) / maxDisplayHeight) * displayHeight;
    const terrainHeightDisplayPosition =
        ((terrainHeight - ellipsoidHeight) / maxDisplayHeight) * displayHeight;
    const cameraHeightDisplayPosition =
        ((cameraHeight - ellipsoidHeight) / maxDisplayHeight) * displayHeight;

    const cameraRelHeightDisplayPosition = (terrainHeightDisplayPosition + cameraHeightDisplayPosition) / 2;
    const cameraRelClampedHeightDisplayPosition = clamp ? (clampedHeightDisplayPosition + cameraHeightDisplayPosition) / 2 : cameraRelHeightDisplayPosition;

    console.info("RENDER: [CESIUM] ElevationControl", alwaysShow, show);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newValue = e.target.valueAsNumber;
        if (Math.abs(cameraHeight - newValue) > 0.1 && viewer) {

            window.requestAnimationFrame(() => {
                const newPosition = getNewPosition(viewer.camera.positionCartographic, newValue);
                viewer.camera.setView({
                    destination: newPosition,
                    orientation: {
                        heading: viewer.camera.heading,
                        pitch: viewer.camera.pitch,
                        roll: viewer.camera.roll,
                    },
                });
                viewer.scene.requestRender();
            });
        }
    };

    return ((alwaysShow || show) && cameraHeightDisplayPosition) &&

        <div // Backdrop
            ref={controlRef}
            style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "100px",
                height: `${displayHeight}px`,
                border: "1px solid black",
                backgroundColor: "rgba(255,255,255,0.8)",
                zIndex: 10,
                padding: "0",
                boxSizing: "border-box",
                pointerEvents: "none",
            }}
        >
            <caption style={{
                position: "relative",
                marginTop: "-1.75rem",
                padding: "0.25rem",
                lineHeight: "1rem",
                float: "right",
                textWrap: "nowrap",
                color: "black",
                backgroundColor: "rgba(255,255,255,0.8)",
            }}>
                Höhe der Kamera
            </caption>

            {/* Axis */}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "0",
                    bottom: "0",
                    width: "1px",
                    backgroundColor: "black",
                    opacity: "0.5",
                    transform: "translateX(-50%)",
                }}
            />
            {/* Camera Height input */}
            <input
                type="range"
                min={Math.floor(ellipsoidHeight)}
                max={Math.floor(maxDisplayHeight)}
                value={cameraHeight}
                onChange={onChangeHandler}
                step={1}
                style={{
                    pointerEvents: "auto",
                    height: "100%",
                    writingMode: "vertical-lr",
                    direction: "rtl",
                    verticalAlign: "middle",
                    cursor: "ns-resize",
                }}
                title={`Kamera Höhe`}
            ></input>
            <label style={{
                position: "absolute",
                bottom: `${cameraHeightDisplayPosition}px`,
                fontVariantNumeric: "tabular-nums",
                left: "0.5rem",
                height: "1.5rem",
                overflow: "visible",
                textWrap: "nowrap",
            }} >{cameraHeightFmt}</label>
            {/* Surface marker */}
            {clamp && <div
                style={{
                    position: "absolute",
                    bottom: `${terrainHeightDisplayPosition}px`,
                    left: "50%",
                    right: "0",
                    height: `${clampedHeightDisplayPosition - terrainHeightDisplayPosition}px`,
                    backgroundColor: "fuchsia",
                    opacity: 0.4,
                    transform: "translateX(0%)",
                }}
                title={`Normalisierte Gelände Höhe`}
            />}
            {/* Terrain marker */}
            <div
                style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    height: `${terrainHeightDisplayPosition}px`,
                    backgroundColor: "grey",
                    opacity: 0.8,
                    transform: "translateX(0%)",
                }}
                title={`Terrain Höhe`}
            />
            <div style={{
                position: "absolute",
                bottom: `${cameraRelHeightDisplayPosition}px`,
                fontVariantNumeric: "tabular-nums",
                left: "0",
                right: "0",
                textAlign: "center",
                overflow: "visible",
                textWrap: "nowrap",
                transform: "translate(-25%,50%) rotate(-90deg)",
            }} >←{cameraRelHeightFmt}→</div>
            {clamp && <div style={{
                position: "absolute",
                bottom: `${cameraRelClampedHeightDisplayPosition}px`,
                fontVariantNumeric: "tabular-nums",
                left: "0",
                right: "0",
                textAlign: "center",
                overflow: "visible",
                textWrap: "nowrap",
                transform: "translate(25%,50%) rotate(-90deg)",
            }} >←{cameraRelClampedHeightFmt}→</div>}
            {/* Terrain Label */}
            <div style={{
                position: "absolute",
                bottom: `${terrainHeightDisplayPosition - 20}px`,
                color: "black",
                fontVariantNumeric: "tabular-nums",
                left: "0.25rem",
                height: "1.5rem",
            }} >{terrainHeightFmt}</div>
            {clamp && <div style={{
                position: "absolute",
                bottom: `${terrainHeightDisplayPosition}px`,
                color: "black",
                fontVariantNumeric: "tabular-nums",
                right: "0.25rem",
                height: "1.5rem",
            }} >{clampedRelHeightFmt}</div>}
            <div style={{
                position: "absolute",
                bottom: "0",
                fontVariantNumeric: "tabular-nums",
                left: "0.25rem",
                height: "1.5rem",
                overflow: "visible",
                textWrap: "nowrap",
                pointerEvents: "auto",
                userSelect: "none",
            }} >{ellipsoidHeight}m <abbr title="Höhe über Ellipsoid">H.ü.E.</abbr></div>

            {/* Cam marker */}
            <div
                style={{
                    position: "absolute",
                    bottom: `${cameraHeightDisplayPosition}px`,
                    left: "0px",
                    right: "0px",
                    height: "1px",
                    backgroundColor: "black",
                    transform: "translateX(0%)",

                }}
                title={`Kamera Höhe`}
            />
        </div>
        ;
}

export default ElevationControl;
