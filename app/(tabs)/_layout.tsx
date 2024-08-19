import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../assets/colors";

export default function TabLayout() {




  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { color: colors.primary, fontSize: 12 }
      }}

    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Anasayfa",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={36}
              color={focused ? "#DE3459" : "#8E8E8E"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Kategoriler",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons

              name="window"
              size={36}
              color={focused ? "#DE3459" : "#8E8E8E"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Sepetim",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="shopping-cart"
              size={24}
              color={focused ? "#DE3459" : "#8E8E8E"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Hesabım",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={30}
              color={focused ? "#DE3459" : "#8E8E8E"}
            />
          ),
        }}
      />

    </Tabs>
  );
}
