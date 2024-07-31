import { Animated, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "./providers/Material3ThemeProvider";

export const TabBar = ({ state, descriptors, navigation, position }: any) => {
  const { colors } = useAppTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 8,
        backgroundColor: colors.surface,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const icon = options.tabBarIcon !== undefined && options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, padding: 4, borderRadius: 16 }}
            key={index}
          >
            <Animated.View
              style={{
                opacity,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IonIcon name={icon} size={24} color={colors.onSurfaceVariant} />
              <Text style={{ color: colors.onSurfaceVariant }}>{label}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
