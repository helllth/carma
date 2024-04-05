import { Navbar as BootstrapNavbar, Nav, NavItem } from 'react-bootstrap';
// @ts-ignore
import Icon from 'react-cismap/commons/Icon';
import { useNavigate, useParams } from 'react-router-dom';
import { Doc } from '../document-viewer';
import './navItem.css';

interface NavProps {
  title?: string;
  maxIndex: number;
  downloadUrl: string;
  docs: Doc[];
}

const Navbar = ({ title, maxIndex, downloadUrl, docs }: NavProps) => {
  const { docPackageId, file, page } = useParams();
  const navigate = useNavigate();

  const ZIP_FILE_NAME_MAPPING = {
    bplaene: 'BPLAN_Plaene_und_Zusatzdokumente',
    aenderungsv: 'FNP_Aenderungsverfahren_und_Zusatzdokumente',
    static: '',
  };

  const DRPROCESSOR = 'https://doc-processor.cismet.de';

  const downloadSingleFile = (downloadOptions: any) => {
    try {
      console.log('downloadSingleFile:' + downloadOptions.url);
      console.log(downloadOptions);
      let link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('type', 'hidden');
      link.href = downloadOptions.url;
      link.target = '_blank';
      link.click();
    } catch (err) {
      window.alert(err);
    }
  };

  const prepareDownloadMultipleFiles = (mergeConf: any) => {
    fetch(DRPROCESSOR + '/api/zip/and/wait/for/status', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mergeConf),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          console.log(
            'Error:' + response.status + ' -> ' + response.statusText
          );
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .then((result) => {
        if (result && !result.error) {
          downloadSingleFile({
            file: mergeConf.name + '.zip',
            url:
              DRPROCESSOR +
              '/api/download/zip/' +
              result.id +
              '/' +
              mergeConf.name,
          });
        }
      });
  };

  const downloadEverything = (docs: Doc[]) => {
    let encoding = null;
    if (navigator.appVersion.indexOf('Win') !== -1) {
      encoding = 'CP850';
    }

    let zipnamePrefix = ZIP_FILE_NAME_MAPPING['aenderungsv'];
    if (zipnamePrefix === undefined) {
      zipnamePrefix = 'Archiv.';
    } else if (zipnamePrefix !== '') {
      zipnamePrefix = zipnamePrefix + '.';
    }

    let downloadConf = {
      name: zipnamePrefix + docPackageId,
      files: [],
      encoding: encoding,
    };
    for (const doc of docs) {
      // @ts-ignore
      downloadConf.files.push({
        uri: doc.url,
        folder: doc.group,
      });
    }
    prepareDownloadMultipleFiles(downloadConf);
  };

  return (
    <BootstrapNavbar
      style={{
        marginBottom: 0,
        width: '46%',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'grey',
      }}
      expand="lg"
    >
      <BootstrapNavbar.Brand>
        <a style={{ color: 'grey', marginRight: '10px' }}>{title}</a>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Collapse>
        <Nav style={{ marginRight: '20px' }}>
          <NavItem>
            <div
              style={{
                cursor: 'pointer',
                marginRight: '24px',
              }}
              onClick={() => {
                if (page)
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
            {page} / {maxIndex}
          </NavItem>
          <NavItem>
            <div
              style={{
                cursor: 'pointer',
                marginLeft: '20px',
              }}
              onClick={() => {
                if (page)
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
            <div style={{ marginRight: '20px' }}>
              <Icon name="arrows-h" />
            </div>
          </NavItem>
          <NavItem>
            <Icon name="arrows-v" />
          </NavItem>
        </Nav>
        <Nav
          style={{
            display: 'flex',
            gap: 20,
          }}
        >
          <NavItem>
            <a href={downloadUrl} download className="navItem" target="_blank">
              <Icon name="download" />
            </a>
          </NavItem>
          <NavItem>
            <button
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: docs.length < 2 ? 'auto' : 'pointer',
                outline: 'inherit',
              }}
              className="navItem"
              disabled={docs.length < 2}
              onClick={() => {
                downloadEverything(docs);
              }}
            >
              <Icon name="file-archive-o" />
            </button>
          </NavItem>
          <NavItem>
            <button
              style={{
                background: 'none',
                border: 'none',
                padding: 0,

                outline: 'inherit',
              }}
              className="navItem"
              disabled={true}
            >
              <Icon name="question-circle" />
            </button>
          </NavItem>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
