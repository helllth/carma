import { Doc, DocumentViewer } from '@cismet/document-viewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
import { loadAEVs, searchForAEVs } from '../store/slices/aenderungsverfahren';
import { useParams } from 'react-router-dom';
import { getDocsForAEVGazetteerEntry } from '../utils/DocsHelper';

export function App() {
  const dispatch = useDispatch();
  let { docPackageId } = useParams();
  const [docs, setDocs] = useState<Doc[]>([]);

  const getMeta = async (url: string) => {
    const extra = await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        return result;
      });
    return extra;
  };

  const getDocsWithUpdatedMetaData = async (tmpDocs: Doc[]) => {
    await Promise.all(
      tmpDocs.map(async (doc) => {
        // @ts-ignore
        const test2 = await getMeta(doc.meta);
        doc.meta = test2;
      })
    );

    return tmpDocs;
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(loadAEVs());

    const getUpdatedDocs = async (tmpDocs: Doc[]) => {
      const updatedDocs = await getDocsWithUpdatedMetaData(tmpDocs);

      setDocs(updatedDocs);
    };

    if (docPackageId) {
      let tmpDocs;
      tmpDocs = getDocsForAEVGazetteerEntry({
        gazHit: { type: 'aenderungsv', more: { v: docPackageId } },
        // @ts-ignore
        searchForAEVs: (aevs) => dispatch(searchForAEVs(aevs)),
      });

      if (tmpDocs) {
        getUpdatedDocs(tmpDocs);
      }
    }
  }, [docPackageId]);

  return (
    <>{docs.length > 0 && <DocumentViewer docs={docs} mode="aenderungsv" />}</>
  );
}

export default App;
