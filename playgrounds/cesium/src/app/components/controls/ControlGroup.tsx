import { HTMLAttributes } from 'react';

type ControlGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const ControlContainer = (props: ControlGroupProps) => {
  const { children } = props;
  return (
    <div {...props} className="leaflet-bar leaflet-control">
      {children}
    </div>
  );
};
export default ControlContainer;
