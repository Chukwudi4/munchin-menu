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
          let temp = 0;
          categories.forEach(category =>
            item.categoryId == category.id ? (temp = category.name) : category
          );
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("Detail", { recipe: JSON.stringify(item) })
              }
            >
              <Card
                title={item.title}
                url={item.photo_url}
                subtitle={temp}
                cardStyle={{ width: w(41), height: h(30) }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  itemView: {
    width: w(41),
    height: h(30),
    borderRadius: w(2),
    borderColor: "#000",
    borderWidth: w(0),
    justifyContent: "flex-start",
    alignItems: "center",
    elevation: 1
  },
  itemImage: {
    width: "100%",
    height: "70%",
    borderRadius: w(2)
  },
  itemTitle: {
    fontSize: w(4),
    paddingTop: w(2),
    fontWeight: "bold",
    textAlign: "center",
    width: "90%"
  },
  itemSubtitle: {
    fontSize: w(3),
    textAlign: "center"
  }
});
