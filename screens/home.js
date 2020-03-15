import React from "react";
import { FlatGrid } from "react-native-super-grid";
import { recipes, categories } from "../data";
import { View, Image, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import { Card } from "../component/card";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
export function Home(props) {
  const navigation = useNavigation();

  return (
    <View>
      <FlatGrid
        items={recipes}
        itemDimension={w(35)}
        spacing={w(7)}
        keyExtractor={item => item.title}
        renderItem={({ item, index }) => {
          let temp = categories.find(category => // get the category name of the recipe and assign to temp
            item.categoryId == category.id
          ).name;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Detail", { recipe: JSON.stringify(item), category: temp })
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
}

export const styles = StyleSheet.create({
    cardStyle: { 
      width: w(41), 
      height: h(30) 
    }
});
