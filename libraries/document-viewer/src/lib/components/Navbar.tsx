import { Navbar as BootstrapNavbar, Nav, NavItem } from 'react-bootstrap';
// @ts-ignore
import Icon from 'react-cismap/commons/Icon';
import { useNavigate, useParams } from 'react-router-dom';

interface NavProps {
  title?: string;
  maxIndex: number;
}

const Navbar = ({ title, maxIndex }: NavProps) => {
  const { docPackageId, file, page } = useParams();
  const navigate = useNavigate();

  return (
    <BootstrapNavbar
      style={{
        marginBottom: 0,
        width: '66%',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'grey',
      }}
      bg="gray-dark"
      expand="lg"
    >
      <BootstrapNavbar.Brand>
        <a style={{ color: 'grey' }}>{title}</a>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Collapse>
        <Nav className="mr-auto">
          <NavItem>
            <div
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                if (parseInt(page) > 1) {
                  navigate(
                    `/docs/${docPackageId}/${file}/${parseInt(page) - 1}`
                  );
                }
              }}
            >
              <Icon name="chevron-left" />
            </div>
          </NavItem>
          <NavItem>
            {page} | {maxIndex}
          </NavItem>
          <NavItem>
            <div
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                if (parseInt(page) < maxIndex) {
                  navigate(
                    `/docs/${docPackageId}/${file}/${parseInt(page) + 1}`
                  );
                }
              }}
            >
              <Icon name="chevron-right" />
            </div>
          </NavItem>
        </Nav>
        <BootstrapNavbar.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </BootstrapNavbar.Text>
        <Nav className="mr-auto">
          <NavItem>
            <Icon name="arrows-h" />
          </NavItem>
          <NavItem>
            <Icon name="arrows-v" />
          </NavItem>
        </Nav>
        <Nav>
          <NavItem>
            <Icon name="download" />
          </NavItem>
          <NavItem>
            <Icon name="file-archive-o" />
          </NavItem>
          <NavItem>
            <Icon name="question-circle" />
          </NavItem>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
