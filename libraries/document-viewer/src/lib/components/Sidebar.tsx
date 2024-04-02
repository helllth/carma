import { useRef } from 'react';
// @ts-ignore
import Icon from 'react-cismap/commons/Icon';

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const iconName = 'file-o';
  const selected = false;
  const progressBar = undefined;

  return (
    <div ref={sidebarRef}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ background: '#777777', height: '100%', padding: 6 }}>
          <div>
            <Icon name="file-pdf-o" />
            <p
              style={{
                marginTop: 2,
                marginBottom: 5,
                fontSize: 11,
                wordWrap: 'break-word',
              }}
            >
              Hier steht der Titel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
