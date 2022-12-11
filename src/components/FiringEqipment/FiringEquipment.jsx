import React from 'react';

import FiringEquipmentRGM from './FiringEquipmentRGM';

export default React.memo(function FiringEquipment(props) {
  const fuseName = props.basicData.fuseName;

  return <>{fuseName === 0 && <FiringEquipmentRGM {...props} />}</>;
});
