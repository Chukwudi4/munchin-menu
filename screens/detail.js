import React, { useState } from "react";
import { recipes, ingredients } from "../data";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import Pager from "@react-native-community/viewpager";
import { Button } from "native-base";
export function Detail() {
  let recipe = recipes[1];

  const [ingr, toggleIngr] = useState(true);
  let btnText = ingr ? "Hide Ingredients" : "View Ingredients";
  return (
    <ScrollView>
      <View style={styles.view}>
        <Pager style={styles.pagerStyle}>
          {recipe.photosArray.map((item, index) => {
            return (
              <Image
                key={index}
                source={{ uri: item }}
                style={styles.pagerStyle}
              />
            );
          })}
        </Pager>

        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.category}>SMOOTHIE</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/timer.png")}
            style={{ width: w(5), height: w(5) }}
          />
          <Text style={styles.time}>{recipe.time} minutes</Text>
        </View>

        <Button
          style={{ padding: w(10), marginVertical: w(5) }}
          onPress={() => toggleIngr(!ingr)}
          light
        >
          <Text>{btnText}</Text>
        </Button>

        <Text style={styles.desc}>{recipe.description}</Text>

        {ingr
          ? recipe.ingredients.map((item, i) => {
              return (
                <Text key={i}>
                  {ingredients[item[0]].name} {item[1]}
                </Text>
              );
            })
          : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center"
  },
  pagerStyle: {
    width: w(100),
    height: h(35)
  },
  title: {
    fontSize: w(7),
    fontWeight: "bold",
    marginTop: w(4)
  },
  category: {
    fontSize: w(4),
    color: "green",
    marginVertical: w(3)
  },
  time: {
    fontSize: w(4),
    fontWeight: "bold",
    marginHorizontal: w(2)
  },
  desc: {
    width: w(90),
    marginVertical: w(5)
  }
});
