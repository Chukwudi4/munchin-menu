import React, { useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import Pager from "@react-native-community/viewpager";
import { Button, Fab, Icon } from "native-base";
import { useRoute, useNavigation } from "@react-navigation/native";
import { data } from "../util/dataState";
export function Detail() {
  const route = useRoute();
  const navigation = useNavigation();

  const recipeId = route.params?.recipe ?? "0";// get id of recipe
  const id = parseInt(recipeId)
  const recipe = data.recipes[id]; // fettch recipe using the recipeId

  const ingredients = data.ingredients

  let category = route.params?.category ?? "SMOOTHIE"  //get the category name 

  const [ingr, toggleIngr] = useState(false); // state to manage hiding and viewing of ingredients
  let btnText = ingr ? "Hide Ingredients" : "View Ingredients";
  return (
    <ScrollView>
      <Fab
          position="topLeft"
          onPress={() => navigation.goBack()}
          style={{backgroundColor: '#000'}}
          containerStyle={styles.fabStyle}
        >
          <Icon ios="ios-arrow-back" android="md-arrow-back" type="Ionicons" />
        </Fab>
      <View style={styles.view}>
        <Pager style={styles.pagerStyle}>
          {recipe.photosArray.map((item, index) => {//display child images of viewpager
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
        <Text style={styles.category}>{category.toUpperCase()}</Text>
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

        {ingr
          ? recipe.ingredients.map((item, i) => {// visibility of the ingredients controlled by toggle state
              return (
                <Text key={i}>
                  {data.ingredients[item.id].name} {item.qty}
                </Text>
              );
            })
          : null}

        <Text style={styles.desc}>{recipe.description}</Text>

        
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
  },
  fabStyle: {
    color: "#fff",
    zIndex: 111,
    top: w(15),
    padding: w(1)
  }
});
