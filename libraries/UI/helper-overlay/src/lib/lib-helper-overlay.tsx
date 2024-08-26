import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setMode } from "../store/slices/ui";
import { OverlayHelperHightlighterProps, HighlightRect } from "..";
import {
  getContainerPosition,
  getElementPosition,
} from "./utils/helperOverlay";

export function LibHelperOverlay({
  configs,
  closeOverlay,
}: OverlayHelperHightlighterProps) {
  const [hightlightRects, setHightlightRects] = useState<HighlightRect[]>([]);
  // const dispatch = useDispatch();
  useEffect(() => {
    configs.forEach((currentItem) => {
      const { el, message, containerPos, contentPos } = currentItem;
      const rect = el.getBoundingClientRect();
      const pos = getContainerPosition(containerPos);
      const contPos = getElementPosition(contentPos);

      setHightlightRects((prev) => [
        ...prev,
        { rect, message, pos, contentPos, contPos },
      ]);
    });
  }, [configs]);

  const handleMessageClick = (e, message) => {
    e.stopPropagation();
    console.log("yyy click message", message);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1000,
        width: "100vw",
        height: "100vh",
        background: "black",
        opacity: 0.8,
      }}
      onClick={() => closeOverlay()}
    >
      {hightlightRects.map((config, idx) => {
        const { rect, message, pos, contPos } = config;

        return (
          <div
            key={idx}
            onClick={(e) => handleMessageClick(e, message)}
            style={{
              position: "absolute",
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              color: "white",
              ...pos,
            }}
          >
            <span
              style={{
                position: "absolute",
                ...contPos,
              }}
            >
              {message}
            </span>
          </div>
        );
      })}
    </div>
  );
}
