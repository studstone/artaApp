export default WGS84inSK42 = ({latitude, longitude, accuracy}) => {
  //гелокация
  const B_WGS84 = latitude;
  const L_WGS84 = longitude;
  let H_WGS84 = accuracy;

  const pi = Math.PI;
  const ro = (3600 * 180) / pi;
  //Элипсоид Красовского
  const aP = 6378245; // большая полуось
  const alP = 1 / 298.3; // сжатие
  const e2P = 2 * alP - Math.pow(alP, 2); // Квадрат эксцентриситета
  //Эллипсоид WGS84
  const aW = 6378137; // большая полуось
  const alW = 1 / 298.257223563; // сжатие
  const e2W = 2 * alW - Math.pow(alW, 2); // Квадрат эксцентриситета
  //Вспомогательные значения для преобразования эллипсоидов
  const a = (aP + aW) / 2;
  const e2 = (e2P + e2W) / 2;
  const da = aW - aP;
  const de2 = e2W - e2P;
  //Линейные элементы трансформирования, в метрах
  const dx = 23.92;
  const dy = -141.27;
  const dz = -80.9;
  //Угловые элементы трансформирования, в секундах
  const wx = 0;
  const wy = 0.35;
  const wz = 0.82;
  //Дифференциальное различие масштабов
  const ms = -0.12 * Math.pow(10, -6);
  //Первичные расчеты
  const B_WGS84_Rad = (B_WGS84 * pi) / 180;
  const L_WGS84_Rad = (L_WGS84 * pi) / 180;
  const M =
    (a * (1 - e2)) / Math.pow(1 - e2 * Math.pow(Math.sin(B_WGS84_Rad), 2), 1.5);
  const N = a * Math.pow(1 - e2 * Math.pow(Math.sin(B_WGS84_Rad), 2), -0.5);

  const dB =
    (ro / (M + H_WGS84)) *
      ((N / a) * e2 * Math.sin(B_WGS84_Rad) * Math.cos(B_WGS84_Rad) * da +
        ((Math.pow(N, 2) / Math.pow(a, 2) + 1) *
          N *
          Math.sin(B_WGS84_Rad) *
          Math.cos(B_WGS84_Rad) *
          de2) /
          2 -
        (dx * Math.cos(L_WGS84_Rad) + dy * Math.sin(L_WGS84_Rad)) *
          Math.sin(B_WGS84_Rad) +
        dz * Math.cos(B_WGS84_Rad)) -
    wx * Math.sin(L_WGS84_Rad) * (1 + e2 * Math.cos(2 * B_WGS84_Rad)) +
    wy * Math.cos(L_WGS84_Rad) * (1 + e2 * Math.cos(2 * B_WGS84_Rad)) -
    ro * ms * e2 * Math.sin(B_WGS84_Rad) * Math.cos(B_WGS84_Rad);

  const dL =
    (ro / ((N + H_WGS84) * Math.cos(B_WGS84_Rad))) *
      (-dx * Math.sin(L_WGS84_Rad) + dy * Math.cos(L_WGS84_Rad)) +
    Math.tan(B_WGS84_Rad) *
      (1 - e2) *
      (wx * Math.cos(L_WGS84_Rad) + wy * Math.sin(L_WGS84_Rad)) -
    wz;

  const dH =
    (-a / N) * da +
    (N * Math.pow(Math.sin(B_WGS84_Rad), 2) * de2) / 2 +
    (dx * Math.cos(L_WGS84_Rad) - dy * Math.sin(L_WGS84_Rad)) *
      Math.cos(B_WGS84_Rad) +
    dz * Math.sin(B_WGS84_Rad) -
    N *
      e2 *
      Math.sin(B_WGS84_Rad) *
      Math.cos(B_WGS84_Rad) *
      ((wx / ro) * Math.sin(L_WGS84_Rad) - (wy / ro) * Math.cos(L_WGS84_Rad)) +
    (Math.pow(a, 2) / N + H_WGS84) * ms;

  const B_SK_42 = B_WGS84 - dB / 3600;
  const L_SK_42 = L_WGS84 - dL / 3600;
  const H_SK_42 = H_WGS84 + dH;

  const B_SK_42_Rad = (B_SK_42 * pi) / 180;
  const L_SK_42_Rad = (L_SK_42 * pi) / 180;

  const n = Math.trunc((6 + Math.round(L_SK_42)) / 6);

  const l = (L_SK_42 - (3 + 6 * (n - 1))) / 57.29577951;
  let X =
    6367558.4968 * B_SK_42_Rad -
    Math.sin(2 * B_SK_42_Rad) *
      (16002.89 +
        66.9607 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
        0.3515 * Math.pow(Math.sin(B_SK_42_Rad), 4) -
        Math.pow(l, 2) *
          (1594561.25 +
            5336.535 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
            26.79 * Math.pow(Math.sin(B_SK_42_Rad), 4) +
            0.149 * Math.pow(Math.sin(B_SK_42_Rad), 6) +
            Math.pow(l, 2) *
              (672483.4 -
                811219.9 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
                5420 * Math.pow(Math.sin(B_SK_42_Rad), 4) -
                10.6 * Math.pow(Math.sin(B_SK_42_Rad), 6) +
                Math.pow(l, 2) *
                  (278194 -
                    830174 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
                    572434 * Math.pow(Math.sin(B_SK_42_Rad), 4) -
                    16010 * Math.pow(Math.sin(B_SK_42_Rad), 6) +
                    Math.pow(l, 2) *
                      (109500 -
                        574700 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
                        863700 * Math.pow(Math.sin(B_SK_42_Rad), 4) -
                        398600 * Math.pow(Math.sin(B_SK_42_Rad), 6))))));

  let Y =
    (5 + 10 * n) * Math.pow(10, 5) +
    l *
      Math.cos(B_SK_42_Rad) *
      (6378245 +
        21346.1415 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
        107.159 * Math.pow(Math.sin(B_SK_42_Rad), 4) +
        0.5977 * Math.pow(Math.sin(B_SK_42_Rad), 6) +
        Math.pow(l, 2) *
          (1070204.16 -
            2136826.66 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
            17.98 * Math.pow(Math.sin(B_SK_42_Rad), 4) -
            11.99 * Math.pow(Math.sin(B_SK_42_Rad), 6) +
            Math.pow(l, 2) *
              (270806 -
                1523417 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
                1327645 * Math.pow(Math.sin(B_SK_42_Rad), 4) -
                21701 * Math.pow(Math.sin(B_SK_42_Rad), 6) +
                Math.pow(l, 2) *
                  (79690 -
                    866190 * Math.pow(Math.sin(B_SK_42_Rad), 2) +
                    1730360 * Math.pow(Math.sin(B_SK_42_Rad), 4) -
                    945460 * Math.pow(Math.sin(B_SK_42_Rad), 6)))));

  X = Math.round(X);
  Y = Math.round(Y);
  X = String(X).slice(2);
  Y = String(Y).slice(2);
  H_WGS84 = Math.round(H_WGS84);
  return {X, Y, H_WGS84};
};
