import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
    Cartesian3,
    Cartographic,
} from "cesium";

import { useTweakpaneCtx } from "@carma-commons/debug";

import { useCesiumCustomViewer } from "../../../CustomViewerContextProvider";
import { getPositionWithHeightAsync } from '../../../utils/positions';
import "./elevation-control.css";

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
    const [cameraHeight, setCameraHeight] = useState<number>(0);
    const [cameraRelHeightFmt, setCameraRelHeightFmt] = useState<string>("-");
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
                getPositionWithHeightAsync(viewer.scene, cameraPositionCartographic, clamp).then((position) => {
                    setTerrainHeight(position.height);
                    setCameraRelHeightFmt(`${(currentCameraHeight - position.height).toFixed(0)}m`);
                    setTerrainHeightFmt(`${position.height.toFixed(0)}m`);

                    setCameraHeight(currentCameraHeight);
                    setEllipsoidHeight(localMinEllipsoidalHeight);

                    // Update maxDisplayHeight based on current heights
                    const maxHeight = Math.max(
                        currentCameraHeight,
                        position.height,
                        localMinEllipsoidalHeight + 500, // Ensure some extra space
                    );
                    setMaxDisplayHeight(Math.min(maxHeight * 1.1, 50000));
                    lastCameraPosition.current = viewer.camera.position.clone();
                });
            };
            updateHeights();
            viewer.scene.preUpdate.addEventListener(updateHeights);
            return () => {
                viewer.scene.preUpdate.removeEventListener(updateHeights);
            };
        }
    }, [viewer, alwaysShow, show, clamp]);

    const terrainHeightDisplayPosition =
        ((terrainHeight - ellipsoidHeight) / maxDisplayHeight) * displayHeight;
    const cameraHeightDisplayPosition =
        ((cameraHeight - ellipsoidHeight) / maxDisplayHeight) * displayHeight;

    const cameraRelHeightDisplayPosition = (terrainHeightDisplayPosition + cameraHeightDisplayPosition) / 2;

    console.info("RENDER: [CESIUM] ElevationControl", alwaysShow, show);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newValue = e.target.valueAsNumber;
        if (Math.abs(cameraHeight - newValue) > 0.1 && viewer) {
            const newPosition = getNewPosition(viewer.camera.positionCartographic, newValue);
            viewer.camera.setView({
                destination: newPosition,
                orientation: {
                    heading: viewer.camera.heading,
                    pitch: viewer.camera.pitch,
                    roll: viewer.camera.roll,
                },
            });
        }
    };

    return ((alwaysShow || show) && cameraHeightDisplayPosition) && <div // Backdrop
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
        }}
    >
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
                pointerEvents: "none",
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
                height: "100%",
                writingMode: "vertical-lr",
                direction: "rtl",
                verticalAlign: "middle",
                cursor: "ns-resize",
            }}
            title={`Camera Height: ${cameraHeight.toFixed(0)} m`}
        ></input>
        <label style={{
            position: "absolute",
            bottom: `${cameraHeightDisplayPosition}px`,
            fontVariantNumeric: "tabular-nums",
            left: "0.5rem",
            height: "1.5rem",
            overflow: "visible",
            textWrap: "nowrap",
            userSelect: "none",
        }} >{cameraHeightFmt}</label>
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
                pointerEvents: "none",
            }}
            title={`Terrain Höhe: ${terrainHeightFmt}`}
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
            userSelect: "none",
            pointerEvents: "none",
        }} >←{cameraRelHeightFmt}→</div>
        {/* Terrain Label */}
        <div style={{
            position: "absolute",
            bottom: `${terrainHeightDisplayPosition - 20}px`,
            color: "black",
            fontVariantNumeric: "tabular-nums",
            left: "0.25rem",
            height: "1.5rem",
            pointerEvents: "none",
            userSelect: "none",
        }} >{terrainHeightFmt}</div>
        <div style={{
            position: "absolute",
            bottom: "0",
            fontVariantNumeric: "tabular-nums",
            left: "0.25rem",
            height: "1.5rem",
            overflow: "visible",
            textWrap: "nowrap",
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
                userSelect: "none",
            }}
            title={`Camera Height: ${cameraHeightFmt}`}
        />
    </div>;
}

export default ElevationControl;
