import React, { useState, useEffect } from "react";
import { FlatGrid } from "react-native-super-grid";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import { Card } from "../component/card";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirebase } from "../firebase/firebase";
import { data } from "../util/dataState";
import Loader from 'react-native-loading-spinner-overlay'
import { observer } from "mobx-react";
import { Button, Icon, Fab } from "native-base";

export const Tailor = observer((props) => {
  const navigation = useNavigation();
  const route = useRoute();

  let category = route.params?.category ?? "Smoothie"
  let catId = route.params?.categoryId ?? "1"  //get the category name
  navigation.setOptions({
    headerTitle: `${category}`
  })
  
  const newData = data.recipes.filter(rec=> rec.categoryId == catId)

  console.ignoredYellowBox = [
    'Setting a timer'
  ];

  return (
    <View>
      <FlatGrid
        items={newData}
        itemDimension={w(40)}
        spacing={w(2)}
        keyExtractor={item => item.title}
        renderItem={({ item, index }) => {
          let temp = data.categories.find(category => // get the category name of the recipe and assign to temp
            item.categoryId == category.id
          ).name;

          return (
            <TouchableOpacity
              containerStyle={styles.toucher}
              onPress={() =>
                {   console.warn(item.recipeId)
                    navigation.navigate("Detail", { recipeId: `${data.recipes.indexOf(item)}`, category: temp })
                }
              }
            >
              <Card
                title={item.title}
                url={item.photo_url}
                subtitle={temp}
                cardStyle={styles.cardStyle}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
})

export const styles = StyleSheet.create({
    cardStyle: { 
      width: w(40), 
      height: h(30),
      elevation: 2
    },
    toucher: {
      alignItems: "center", 
      width: w(40),
      borderRadius: w(2)
    }
});
