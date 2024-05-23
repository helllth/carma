import React, { HTMLAttributes } from 'react';
type ControlContainerProps = HTMLAttributes<HTMLDivElement> & {
  position: string;
  children: React.ReactNode;
};

const getPosClass = (pos: string) => {
  switch (pos) {
    case 'topleft':
      return 'leaflet-top leaflet-left';
    case 'topright':
      return 'leaflet-top leaflet-right';
    case 'bottomleft':
      return 'leaflet-bottom leaflet-left';
    case 'bottomright':
      return 'leaflet-bottom leaflet-right';
    default:
      return 'leaflet-control';
  }
};

const ControlContainer = (props: ControlContainerProps) => {
  const { position, children, ...otherProps } = props;
  const positionClassname = getPosClass(position);
  return (
    <div {...otherProps} className={` ${positionClassname}`}>
      {children}
    </div>
  );
};
export default ControlContainer;
