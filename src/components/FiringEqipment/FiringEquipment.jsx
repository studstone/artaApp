import React from 'react';

import FiringEquipmentRGM from './FiringEquipmentRGM';
import FiringEquipmentT7 from './FiringEquipmentT7';

export default React.memo(function FiringEquipment(props) {
  const fuseName = props.basicData.fuseName;

  return (
    <>
      {fuseName === 0 && <FiringEquipmentRGM {...props} />}
      {fuseName === 2 && <FiringEquipmentT7 {...props} />}
    </>
  );
});
