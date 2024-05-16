import Icon from 'react-cismap/commons/Icon';
import { getColor } from './styler';
import { constants as kitasConstants } from './constants';

const KitasTraegertypMapVisSymbol = ({ traegertyp, visible = true }) => {
  if (visible) {
    return (
      <Icon
        style={{
          color: getColor(
            { traegertyp },
            kitasConstants.FEATURE_RENDERING_BY_TRAEGERTYP
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

export default KitasTraegertypMapVisSymbol;
