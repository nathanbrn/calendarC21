import { Dimensions, StyleSheet, Text, View } from 'react-native';

export function Logo() {
  const heightWindow = Dimensions.get('window').height;
  const heightScreen = Dimensions.get('screen').height;

  let styles;

  if (heightWindow !== heightScreen) {
    styles = StyleSheet.create({
      logo: {
        marginTop: 42,
      }
    });
  }

  return (
    <View
      className="w-32 h-14 items-center justify-center relative flex-row mt-10"
      style={styles?.logo}
    >
      <View className="flex-row gap-0">
        <Text className="text-4xl text-white mt-4">A</Text>
        <Text className="text-lg text-white right-1">void</Text>
      </View>
      <View className="flex-row absolute -bottom-1 ">
        <Text className="text-3xl text-white left-0">C</Text>
        <Text className="text-sm text-white mt-2 left-0">hild</Text>
      </View>
      <Text className="text-white text-xs right-1 top-0">Cycle</Text>
      <Text style={{ fontSize: 6 }} className="text-white right-1 bottom-1">21</Text>
    </View>
  );
}
