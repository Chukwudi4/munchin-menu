import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/home";
import { Category } from "../screens/category";
import { Detail } from "../screens/detail";
import { Tailor } from '../screens/tailored';
import { Icon } from "native-base";
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h
  } from "react-native-responsive-screen";
import { data } from "../util/dataState";

const Stack = createStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="Home"
        options={({ route, navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon
              ios="ios-menu"
              onPress={() => data.recipes.length==0? alert("No data,Click on the refresh button") : navigation.navigate("Category")}
              style={{marginLeft: w(3)}}
              android="md-menu"
              type="Ionicons"
            />
          )
        })}
      />
      <Stack.Screen
        component={Category}
        name="Category"
        options={()=>({
          headerBackTitle: "Home",
          headerTintColor: "blue",
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        component={Detail}
        name="Detail"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Tailor}
        name="Tailor"
      />
    </Stack.Navigator>
  );
}
