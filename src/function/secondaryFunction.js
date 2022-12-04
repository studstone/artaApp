/** расчет х,у цели*/
export const coordinateTargetСalculation = (
  coordinateOPX,
  coordinateOPY,
  rangeTarget,
  angleTarget,
) => {
  const targetX = Math.round(
    +coordinateOPX + rangeTarget * Math.cos(angleTarget * 6 * (Math.PI / 180)),
  );

  const targetY = Math.round(
    +coordinateOPY + rangeTarget * Math.sin(angleTarget * 6 * (Math.PI / 180)),
  );
  return {targetX, targetY};
};
/*расчет топо дальности*/
export const rangeСalculation = (
  isVisible,
  coordinateTargetX,
  coordinateFPX,
  coordinateTargetY,
  coordinateFPY,
) => {
  if (isVisible) {
    const topographicRange = Math.round(
      Math.sqrt(
        Math.pow(coordinateTargetX - coordinateFPX, 2) +
          Math.pow(coordinateTargetY - coordinateFPY, 2),
      ),
    );
    return topographicRange;
  } else {
  }
};
