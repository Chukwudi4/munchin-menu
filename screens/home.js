import React, { useState, useEffect } from "react";
import { FlatGrid } from "react-native-super-grid";
//import { recipes, categories } from "../data";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import { Card } from "../component/card";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getFirebase } from "../firebase/firebase";
export function Home(props) {
  const navigation = useNavigation();
  const [recipeList,updateRecipeList] = useState([])
  const [categories, updateCategories] = useState([])
  const [isLoading, setLoading] = useState(false)

  console.ignoredYellowBox = [
    'Setting a timer'
    ];

  useEffect(()=>{
    loadList()
  }, [navigation])

  function loadList(){
    setLoading(true)
    let db = getFirebase().firestore();
    let ref = db.collection('data').doc('data')

    ref.get().then(item => {
      updateCategories(item.data().categories)
      updateRecipeList(item.data().recipes)
      setLoading(false)
    })
    
  }

  return (
    <View>
      <FlatGrid
        items={recipeList}
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
