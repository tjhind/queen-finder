import { Text, View } from 'react-native';

type ResultStatProps = {
  label: string;
  value: string;
};

export function ResultStat({ label, value }: ResultStatProps) {
  return (
    <View className="w-full flex-row items-center justify-between border-b border-border py-sm">
      <Text className="text-base text-text-secondary">{label}</Text>
      <Text className="text-lg font-semibold text-text-primary">{value}</Text>
    </View>
  );
}
