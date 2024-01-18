// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import Explore from '../screens/Explore';
import SearchScreen from '../screens/SearchScreen';
import EditScreen from '../screens/Edit';
import MoreScreen from '../screens/moreScreen';
import SavedScreen from '../screens/savedScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const getIconName = (routeName) => {
    // Map each route name to a corresponding FontAwesome icon name
    const iconMap = {
      Explore: 'globe',
      saved: 'bookmark-o',
      Search: 'search',
      edit: 'edit',
      more: 'bars'
    };
    return iconMap[routeName] || 'question'; // 'question' is a placeholder if no match found
  };

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 0, paddingVertical: 10, marginTop: 20, justifyContent: 'space-around', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconName = getIconName(route.name); // Get the corresponding icon name

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
          >
            {/* Use FontAwesome icons instead of text labels */}
            <FontAwesome name={iconName} size={24} color={isFocused ? 'black' : 'gray'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="saved" component={SavedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="edit" component={EditScreen} />
      <Tab.Screen name="more" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
