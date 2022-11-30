import React from "react";
import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: isDark ? BLACK_COLOR : "white" }}
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        tabBarLabelStyle: { marginTop: -5, fontSize: 10, fontWeight: "600" },
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        headerTitleStyle: { color: isDark ? "white" : BLACK_COLOR },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"film-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"search-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
