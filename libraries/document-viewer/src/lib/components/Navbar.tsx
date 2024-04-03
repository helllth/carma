import { Navbar as BootstrapNavbar, Nav, NavItem } from 'react-bootstrap';
// @ts-ignore
import Icon from 'react-cismap/commons/Icon';

interface NavProps {
  title?: string;
  currentIndex: number;
  maxIndex: number;
}

const Navbar = ({ title, currentIndex, maxIndex }: NavProps) => {
  return (
    <BootstrapNavbar
      style={{
        marginBottom: 0,
        width: '66%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      bg="gray-dark"
      expand="lg"
    >
      <BootstrapNavbar.Brand>
        <a>{title}</a>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Collapse>
        <Nav className="mr-auto">
          <NavItem>
            <Icon name="chevron-left" />
          </NavItem>
          <NavItem>
            {currentIndex} | {maxIndex}
          </NavItem>
          <NavItem>
            <Icon name="chevron-right" />
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
