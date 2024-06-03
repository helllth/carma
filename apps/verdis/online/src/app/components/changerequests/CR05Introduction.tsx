import Toggle from 'react-bootstrap-toggle';
import { useDispatch, useSelector } from 'react-redux';
import { getUiState, setCREditMode } from '../../../store/slices/ui';
import './toggle.css';

const CR05Introduction = () => {
  const uiState = useSelector(getUiState);
  const dispatch = useDispatch();
  return (
    <>
      {' '}
      <p>
        Sollten Sie Änderungswünsche zu den angezeigten Flächen haben,
        aktivieren Sie hier bitte den Änderungsmodus. Im Änderungsmodus haben
        Sie die Möglichkeit, mit Ihrem Ansprechpartner in Kontakt zu treten,
        Flächen zu verändern oder anzulegen.
      </p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '20px' }}>
          <strong>Änderungsmodus: </strong>
          <Toggle
            onClick={() => {
              dispatch(setCREditMode(!uiState.changeRequestsEditMode));
            }}
            on={'Ein'}
            off={'Aus'}
            offstyle="danger"
            onstyle="success"
            active={uiState.changeRequestsEditMode}
            style={{ padding: 10 }}
          />
        </div>
      </div>
    </>
  );
};

export default CR05Introduction;
