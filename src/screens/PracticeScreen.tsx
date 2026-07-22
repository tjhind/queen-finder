import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function PracticeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center px-lg">
        <Text className="text-center text-2xl font-bold text-text-primary">
          Practice
        </Text>
        <Text className="mt-sm text-center text-base text-text-secondary">
          Puzzle gameplay is coming soon.
        </Text>
      </View>
    </SafeAreaView>
  );
}
