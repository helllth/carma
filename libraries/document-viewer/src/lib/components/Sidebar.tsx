import { useRef } from 'react';
// @ts-ignore
import Icon from 'react-cismap/commons/Icon';
import { Doc } from '../document-viewer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface SidebarProps {
  docs?: Doc[];
  index: number;
}

const Sidebar = ({ docs, index }: SidebarProps) => {
  const { docPackageId, file, page } = useParams();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const iconName = 'file-o';
  const selected = false;
  const progressBar = undefined;

  return (
    <div ref={sidebarRef}>
      <div style={{ marginBottom: 8 }}>
        {docs?.length > 0 &&
          docs?.map((doc, i) => (
            <div
              style={{
                background: `${index - 1 === i ? '#777777' : 'white'}`,
                height: '100%',
                padding: 6,
                marginBottom: 8,
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/docs/${docPackageId}/${i + 1}/1`)}
            >
              <div
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  gap: '6px',
                }}
              >
                <Icon name="file-pdf-o" size="4x" />

                <p
                  style={{
                    marginTop: 2,
                    marginBottom: 5,
                    fontSize: 11,
                    wordWrap: 'break-word',
                  }}
                >
                  {doc.title || doc.file}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
