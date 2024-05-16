import Icon from 'react-cismap/commons/Icon';
import { getColor } from './styler';
import { constants as kitasConstants } from './constants';

const KitasProfileMapVisSymbol = ({ inklusion, visible = true }) => {
  if (visible) {
    return (
      <Icon
        style={{
          color: getColor(
            { plaetze_fuer_behinderte: inklusion },
            kitasConstants.FEATURE_RENDERING_BY_PROFIL
          ),
          width: '30px',
          textAlign: 'center',
        }}
        name={'circle'}
      />
    );
  } else {
    return null;
  }
};

export default KitasProfileMapVisSymbol;
