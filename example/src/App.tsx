import { StyleSheet, View } from 'react-native';
import Confetti from 'react-native-simple-confetti';

export default function App() {
  return (
    <View style={styles.container}>
      <Confetti />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
