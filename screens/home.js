import React, { useState, useEffect } from "react";
import { FlatGrid } from "react-native-super-grid";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import { Card } from "../component/card";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getFirebase } from "../firebase/firebase";
import { data } from "../util/dataState";
import Loader from 'react-native-loading-spinner-overlay'
import { observer } from "mobx-react";
import { Button, Icon, Fab } from "native-base";

export const Home = observer((props) => {
  const navigation = useNavigation();
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
      
      if (item.exists) {
        data.categories.length = 0;
        data.recipes.length = 0;
        data.ingredients.length = 0;
        data.categories.push(...item.data().categories)
        data.recipes.push(...item.data().recipes)
        data.ingredients.push(...item.data().ingredients) 
      }
      setLoading(false)
    }).catch(error=> {
      data.categories.length = 0;
      data.recipes.length = 0;
      data.ingredients.length = 0;
      setLoading(false)
    })
    
  }

  if(data.recipes.length== 0){
    return(
      <View style={{alignItems: "center", justifyContent:"center", flex: 1}} >
        <Loader
          visible={isLoading}
        />
        <Fab
          position='bottomLeft'
          onPress={()=> loadList()}
        >
          <Icon
            name='reload'
            type='MaterialCommunityIcons'
            onPress={()=> loadList()}
          />
        </Fab>
      </View>
    )
  }

  return (
    <View>
      <Loader
        visible={isLoading}
      />
      <FlatGrid
        items={data.recipes}
        itemDimension={w(35)}
        spacing={w(7)}
        keyExtractor={item => item.title}
        renderItem={({ item, index }) => {
          let temp = data.categories.find(category => // get the category name of the recipe and assign to temp
              item.categoryId == category.id
          ).name;
          return (
            <TouchableOpacity
              containerStyle={styles.toucher}
              onPress={() =>
                navigation.navigate("Detail", { recipeId: `${index}`, category: temp })
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
      width: w(41), 
      height: h(30),
      elevation: 2
    },
    toucher: {
      alignItems: "center", 
      width: w(42),
      borderRadius: w(2)
    }
});
