import React from 'react';

import PolarCoordinates from './PolarCoordinates';
import RectangularCoordinates from './RectangularCoordinates';
import SwitchBlock from './SwitchBlock';

export default React.memo(function CoordinatsVariant({value, setValue}) {
  return (
    <>
      <SwitchBlock
        value={value.coordinateVariant}
        setValue={value => setValue('coordinateVariant', value)}
        textTrue="Полярные"
        textFalse="Прямоугольнные"
      />
      {/* Цель */}
      {value.coordinateVariant ? (
        <>
          <RectangularCoordinates value={value} setValue={setValue} />
        </>
      ) : (
        <>
          <PolarCoordinates value={value} setValue={setValue} />
        </>
      )}
    </>
  );
});
