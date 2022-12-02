import {StatusBar, StyleSheet, View} from 'react-native';
import NavBar from './src/components/NavBar';
import BatteryCommander from './src/screens/BatteryCommander';

export default function App() {
  return (
    <>
      <NavBar />
      <StatusBar style="auto" />
      <View style={styles.container}>
        <BatteryCommander />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#78866b',
  },
});
