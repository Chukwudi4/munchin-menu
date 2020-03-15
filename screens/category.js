import React from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { categories, recipes } from "../data";
import { Card } from "../component/card";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";

export function Category() {
  function fetchCategoryNum(num) {
    //recipes.forEach((item, index)=> )
  }

  fetchCategoryNum();

  return (
    <View style={styles.view}>
      <FlatList
        data={categories}
        keyExtractor={item => item.name}
        renderItem={({ item, index }) => {
          let num = 0;
          recipes.forEach((recipe, index) =>
            recipe.categoryId == item.id ? num++ : (num)
          );
          return (
            <Card
              title={item.name}
              url={item.photo_url}
              subtitle={`${num} recipes`}
              cardStyle={{
                width: w(90),
                height: h(25),
                marginVertical: w(3)
              }}
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
  }
});
