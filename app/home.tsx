import React, { useState, useRef } from "react";
import { View, Image, FlatList, ScrollView } from "react-native";
import globalStyles from "../assets/styles/global";
import AddressBar from "@/components/ui/AddressBar";
import HeaderWithSearchBar from "@/components/headers/HeaderWithSearchBar";

const images = [
  { id: "0", src: require("../assets/images/bicicleta.jpeg") },
  { id: "1", src: require("../assets/images/bicicleta.jpeg") },
  { id: "2", src: require("../assets/images/bicicleta.jpeg") },
  { id: "3", src: require("../assets/images/bicicleta.jpeg") },
  { id: "4", src: require("../assets/images/bicicleta.jpeg") },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event:any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / globalStyles.carouselItem.width);
    setActiveIndex(index);
  };

  return (
    <ScrollView style={globalStyles.container}>
      <HeaderWithSearchBar headerBackVisible />
      <AddressBar />
      <View style={globalStyles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          renderItem={({ item }) => (
            <View style={globalStyles.carouselItem}>
              <Image source={item.src} style={globalStyles.carouselImage} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={globalStyles.paginationContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                globalStyles.paginationDot,
                activeIndex === index && globalStyles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
