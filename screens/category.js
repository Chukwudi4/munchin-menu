import React from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { categories, recipes } from "../data";
import { Card } from "../component/card";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import { data } from "../util/dataState";

export function Category() { //displays the list of categories in a grid

  return (
    <View style={styles.view}>
      <FlatList
        data={data.categories}
        keyExtractor={item => item.photo_url}
        renderItem={({ item, index }) => {
          let num = 0;
          data.recipes.forEach((recipe, index) =>
            recipe.categoryId == item.id ? num++ : (num)
          );
          return (
            <Card
              title={item.name}
              url={item.photo_url}
              subtitle={`${num} recipes`}
              cardStyle={styles.cardStyle}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center"
  },
  cardStyle: {
    width: w(90),
    height: h(30),
    marginVertical: w(3)
  }
});
