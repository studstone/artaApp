import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';

import shotingTables from '../DB/shotingTables';

import {
  temperatureCharge,
  componentsWind,
  windSpeedObj,
  verticalTemperatureObj,
} from '../DB/WeatherTables';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MeteoData from './MeteoData';

const initMeteoData = {
  pressure: '',
  airTemperature: '',
  directorateAngleWind: '',
  windSpeed: '',
  deviationInitialSpeed: '',
  chargeTemperature: '',
  heightWeatherPost: '',
};

export default React.memo(function ModalBlock({
  angle,
  heightFP,
  rangeСalculation,
  basicData,
  changeTargetData,
  targetData,
  replaceAngle,
}) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [meteoData, setMeteoData] = React.useState({...initMeteoData});

  const angleTarget = Math.round(angle);

  const changeMeteoData = React.useCallback(
    (key, value) => {
      setMeteoData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [meteoData],
  );

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    storeData();
  }, [meteoData]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('meteo');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        setMeteoData(data);
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(meteoData);
      await AsyncStorage.setItem('meteo', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const deviationInitialSpeedChargeCalculation = React.useMemo(() => {
    try {
      let nameCharge = basicData.nameCharge;

      if (nameCharge === 2) {
        nameCharge = 1;
      } else if (nameCharge === 4) {
        nameCharge = 3;
      }
      const supportTemperature = temperatureCharge
        .filter(el => el.name === nameCharge)
        .find(el => el.temperature >= +meteoData.chargeTemperature).temperature;
      const supportdV0 = temperatureCharge
        .filter(el => el.name === nameCharge)
        .find(el => el.temperature >= +meteoData.chargeTemperature).dV0;
      const step = temperatureCharge
        .filter(el => el.name === nameCharge)
        .find(el => el.temperature >= +meteoData.chargeTemperature).step;
      const dVoCharge =
        (+meteoData.chargeTemperature - supportTemperature) * step + supportdV0;

      return dVoCharge;
    } catch (error) {
      const dVoCharge = 0;

      return dVoCharge;
    }
  }, [basicData, meteoData]);
  /** рассчитываем dV0 суммарное */
  const totalDeviationInitialSpeedCalculation = () => {
    const totalDeviationInitialSpeed =
      +meteoData.deviationInitialSpeed + deviationInitialSpeedChargeCalculation;

    return totalDeviationInitialSpeed;
  };
  /**рассчитываем dH */
  const deviationGroundPressureCalculation = () => {
    const deviationGroundPressure =
      750 - +meteoData.pressure + (meteoData.heightWeatherPost - heightFP) / 10;
    return deviationGroundPressure;
  };
  /** вытаскиваем из массива высоту взода в бюллетень */
  const returnHighEntranceInBulletin = () => {
    try {
      let highEntranceInBulletin = 0;

      if (basicData.trajectory === 0) {
        highEntranceInBulletin = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= rangeСalculation).Yb;
      } else {
        highEntranceInBulletin = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= rangeСalculation).Yb;
      }

      if (highEntranceInBulletin > 0 && highEntranceInBulletin <= 200) {
        highEntranceInBulletin = 200;
      } else if (
        highEntranceInBulletin > 200 &&
        highEntranceInBulletin <= 400
      ) {
        highEntranceInBulletin = 400;
      } else if (
        highEntranceInBulletin > 400 &&
        highEntranceInBulletin <= 800
      ) {
        highEntranceInBulletin = 800;
      } else if (
        highEntranceInBulletin > 800 &&
        highEntranceInBulletin <= 1200
      ) {
        highEntranceInBulletin = 1200;
      } else if (
        highEntranceInBulletin > 1200 &&
        highEntranceInBulletin <= 1600
      ) {
        highEntranceInBulletin = 1600;
      } else if (
        highEntranceInBulletin > 1600 &&
        highEntranceInBulletin <= 2000
      ) {
        highEntranceInBulletin = 2000;
      } else if (
        highEntranceInBulletin > 2000 &&
        highEntranceInBulletin <= 2400
      ) {
        highEntranceInBulletin = 2400;
      } else if (
        highEntranceInBulletin > 2400 &&
        highEntranceInBulletin <= 3000
      ) {
        highEntranceInBulletin = 3000;
      } else if (
        highEntranceInBulletin > 3000 &&
        highEntranceInBulletin <= 4000
      ) {
        highEntranceInBulletin = 4000;
      } else if (highEntranceInBulletin > 4000) {
        highEntranceInBulletin = 4000;
      }

      return highEntranceInBulletin;
    } catch (error) {
      const highEntranceInBulletin = 0;
      return highEntranceInBulletin;
    }
  };
  /**отклонение температуры воздуха в слое атмосферы */
  const returnDeviationAirTemperature = () => {
    try {
      const deviationAirTemperature =
        verticalTemperatureObj[meteoData.airTemperature][
          returnHighEntranceInBulletin()
        ];
      return deviationAirTemperature;
    } catch (error) {
      const deviationAirTemperature = 0;
      return deviationAirTemperature;
    }
  };
  /**дирекционный угол направления ветра в слое атмосферы */
  const directiveAngleWindCalculation = () => {
    let angle = 0;

    if (returnHighEntranceInBulletin() === 200) {
      angle = +meteoData.directorateAngleWind + 1;
    } else if (returnHighEntranceInBulletin() === 400) {
      angle = +meteoData.directorateAngleWind + 2;
    } else if (returnHighEntranceInBulletin() === 800) {
      angle = +meteoData.directorateAngleWind + 3;
    } else if (returnHighEntranceInBulletin() === 1200) {
      angle = +meteoData.directorateAngleWind + 3;
    } else if (returnHighEntranceInBulletin() === 1600) {
      angle = +meteoData.directorateAngleWind + 4;
    } else if (returnHighEntranceInBulletin() === 2000) {
      angle = +meteoData.directorateAngleWind + 4;
    } else if (returnHighEntranceInBulletin() === 2400) {
      angle = +meteoData.directorateAngleWind + 4;
    } else if (returnHighEntranceInBulletin() === 3000) {
      angle = +meteoData.directorateAngleWind + 5;
    } else if (returnHighEntranceInBulletin() === 4000) {
      angle = +meteoData.directorateAngleWind + 5;
    }

    return angle;
  };
  /**скорость среднего ветра в слое атмосферы */
  const returnSpeedNediumWind = () => {
    try {
      const speedNediumWind =
        windSpeedObj[meteoData.windSpeed][returnHighEntranceInBulletin()];
      return speedNediumWind;
    } catch (error) {
      const speedNediumWind = 0;
      return speedNediumWind;
    }
  };
  /** вытаскивыем из таблицы стрельбы данные для расчетов*/
  const returnDataST = () => {
    try {
      let z = 0;
      let dZw = 0;
      let dXw = 0;
      let dXh = 0;
      let dXt = 0;
      let dXv0 = 0;

      if (basicData.trajectory === 0) {
        z = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= rangeСalculation).Z;
        dZw = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= rangeСalculation).dZw;
        dXw = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= rangeСalculation).dXw;
        dXh = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= rangeСalculation).dXh;
        dXt = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= rangeСalculation).dXt;
        dXv0 = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= rangeСalculation).dXv0;
      } else {
        z = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= rangeСalculation).Z;
        dZw = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= rangeСalculation).dZw;
        dXw = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= rangeСalculation).dXw;
        dXh = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= rangeСalculation).dXh;
        dXt = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= rangeСalculation).dXt;
        dXv0 = shotingTables
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= rangeСalculation).dXv0;
      }
      return {z, dZw, dXw, dXh, dXt, dXv0};
    } catch (err) {
      const z = 0;
      const dZw = 0;
      const dXw = 0;
      const dXh = 0;
      const dXt = 0;
      const dXv0 = 0;

      return {z, dZw, dXw, dXh, dXt, dXv0};
    }
  };
  /**рассчитываем угол ветра */
  const angleWindsCalculation = () => {
    let angleWinds = angleTarget - directiveAngleWindCalculation();

    if (angleWinds < 0) {
      angleWinds = angleWinds + 60;
    }

    return angleWinds;
  };
  /** преобразовываем угол ветра в угол ветра имеющийся в таблице */
  const angleTransformation = () => {
    let angleWinds = angleWindsCalculation();

    if (angleWinds === 60 || angleWinds === 30) {
      angleWinds = 0;
    } else if (angleWinds === 29 || angleWinds === 31 || angleWinds === 59) {
      angleWinds = 1;
    } else if (angleWinds === 28 || angleWinds === 32 || angleWinds === 58) {
      angleWinds = 2;
    } else if (angleWinds === 27 || angleWinds === 33 || angleWinds === 57) {
      angleWinds = 3;
    } else if (angleWinds === 26 || angleWinds === 34 || angleWinds === 56) {
      angleWinds = 4;
    } else if (angleWinds === 25 || angleWinds === 35 || angleWinds === 55) {
      angleWinds = 5;
    } else if (angleWinds === 24 || angleWinds === 36 || angleWinds === 54) {
      angleWinds = 6;
    } else if (angleWinds === 23 || angleWinds === 37 || angleWinds === 53) {
      angleWinds = 7;
    } else if (angleWinds === 22 || angleWinds === 38 || angleWinds === 52) {
      angleWinds = 8;
    } else if (angleWinds === 21 || angleWinds === 39 || angleWinds === 51) {
      angleWinds = 9;
    } else if (angleWinds === 20 || angleWinds === 40 || angleWinds === 50) {
      angleWinds = 10;
    } else if (angleWinds === 19 || angleWinds === 41 || angleWinds === 49) {
      angleWinds = 11;
    } else if (angleWinds === 18 || angleWinds === 42 || angleWinds === 48) {
      angleWinds = 12;
    } else if (angleWinds === 17 || angleWinds === 43 || angleWinds === 47) {
      angleWinds = 13;
    } else if (angleWinds === 16 || angleWinds === 44 || angleWinds === 46) {
      angleWinds = 14;
    } else if (angleWinds === 45) {
      angleWinds = 15;
    }
    return angleWinds;
  };
  /** рассчитываем Wx Wz */
  const returnLinkingWinds = () => {
    try {
      const angle = angleWindsCalculation();
      const angleTransform = angleTransformation();

      let Wx = 0;
      let Wz = 0;

      if (returnSpeedNediumWind() > 20) {
        let Wx1 = componentsWind
          .filter(el => el.Aw === angleTransform)
          .find(el => el.Vw === 20).Wx;
        let Wz1 = componentsWind
          .filter(el => el.Aw === angleTransform)
          .find(el => el.Vw === 20).Wz;
        let Wx2 = componentsWind
          .filter(el => el.Aw === angleTransform)
          .find(el => el.Vw === returnSpeedNediumWind() - 20).Wx;
        let Wz2 = componentsWind
          .filter(el => el.Aw === angleTransform)
          .find(el => el.Vw === returnSpeedNediumWind() - 20).Wz;

        if (angle >= 0 && angle <= 15) {
          Wx1 = Wx1 * -1;
          Wx2 = Wx2 * -1;
          Wz1 = Wz1 * +1;
          Wz2 = Wz2 * +1;
        } else if (angle >= 16 && angle <= 30) {
          Wx1 = Wx1 * +1;
          Wx2 = Wx2 * +1;
          Wz1 = Wz1 * +1;
          Wz2 = Wz2 * +1;
        } else if (angle >= 31 && angle <= 45) {
          Wx1 = Wx1 * +1;
          Wx2 = Wx2 * +1;
          Wz1 = Wz1 * -1;
          Wz2 = Wz2 * -1;
        } else if (angle >= 46 && angle <= 60) {
          Wx1 = Wx1 * -1;
          Wx2 = Wx2 * -1;
          Wz1 = Wz1 * -1;
          Wz2 = Wz2 * -1;
        }

        Wx = Wx1 + Wx2;
        Wz = Wz1 + Wz2;
      } else {
        Wx = componentsWind
          .filter(el => el.Aw === angleTransform)
          .find(el => el.Vw === returnSpeedNediumWind()).Wx;
        Wz = componentsWind
          .filter(el => el.Aw === angleTransform)
          .find(el => el.Vw === returnSpeedNediumWind()).Wz;

        if (angle >= 0 && angle <= 15) {
          Wx = Wx * -1;
          Wz = Wz * +1;
        } else if (angle >= 16 && angle <= 30) {
          Wx = Wx * +1;
          Wz = Wz * +1;
        } else if (angle >= 31 && angle <= 45) {
          Wx = Wx * +1;
          Wz = Wz * -1;
        } else if (angle >= 46 && angle <= 60) {
          Wx = Wx * -1;
          Wz = Wz * -1;
        }
      }

      return {Wx, Wz};
    } catch (error) {
      const Wx = 0;
      const Wz = 0;

      return {Wx, Wz};
    }
  };
  /**расчитываем суммарные поправки */
  const totalAmendmentsCalculation = React.useMemo(() => {
    let totalAmendmentInRange = 0;
    let totalAmendmentInDirection = 0;

    if (rangeСalculation !== 0) {
      if (
        meteoData.airTemperature !== '' &&
        meteoData.chargeTemperature !== '' &&
        meteoData.deviationInitialSpeed !== '' &&
        meteoData.directorateAngleWind !== '' &&
        meteoData.heightWeatherPost !== '' &&
        meteoData.pressure !== '' &&
        meteoData.windSpeed !== ''
      ) {
        totalAmendmentInRange = Math.round(
          0.1 * returnDataST().dXw * returnLinkingWinds().Wx +
            0.1 * returnDataST().dXh * deviationGroundPressureCalculation() +
            0.1 * returnDataST().dXt * returnDeviationAirTemperature() +
            returnDataST().dXv0 * totalDeviationInitialSpeedCalculation(),
        );
        totalAmendmentInDirection = (
          (returnDataST().z +
            0.1 * returnDataST().dZw * returnLinkingWinds().Wz) *
          0.01
        ).toFixed(2);
        return {totalAmendmentInRange, totalAmendmentInDirection};
      } else {
        return {totalAmendmentInRange, totalAmendmentInDirection};
      }
    } else {
      return {totalAmendmentInRange, totalAmendmentInDirection};
    }
  }, [meteoData]);

  const test = () => {
    if (rangeСalculation !== 0) {
      changeTargetData(
        'amendmentRange',
        totalAmendmentsCalculation.totalAmendmentInRange,
      );
      changeTargetData(
        'amendmentAngle',
        totalAmendmentsCalculation.totalAmendmentInDirection,
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MeteoData value={meteoData} setValue={changeMeteoData} />
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 15,
                }}>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginRight: 15,
                  }}>
                  {`ΔД: ${totalAmendmentsCalculation.totalAmendmentInRange}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                  }}>
                  {`Δδ: ${replaceAngle(
                    totalAmendmentsCalculation.totalAmendmentInDirection,
                  )}`}
                </Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  test();
                }}>
                <Text style={styles.textStyle}>Закрыть</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Метео</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#726631',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#83974b',
  },
  buttonClose: {
    backgroundColor: '#83974b',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 12,
    width: '100%',
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
  },
  input: {
    maxWidth: '100%',
    minWidth: 0,
    fontSize: 18,
    flex: 1,
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'transparent',
    color: '#000000',
  },
  buttonImg: {
    width: 40,
    height: 40,
  },
  image: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 18,
  },
});

// export default ModalBlock;
