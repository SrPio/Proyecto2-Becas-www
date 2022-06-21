import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Image } from "react-native-elements";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";

function CarouselNYT() {
  const [noticiasPopu, setNoticiasPopu] = useState([]);

  const obtenerNoticiasPopulares = () => {
    let url =
      "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=ECOGCnm7XTBSJXpU1vel4Qxv7iAFMQ5E";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setNoticiasPopu(data.results.slice(1, 5));
        console.log(data.results.slice(1, 5));
      })
      .catch((error) => {
        console.log(
          "algo salio mal con el API nocticias populares: " + error.message
        );
      });
  };

  useEffect(() => {
    obtenerNoticiasPopulares();
    // eslint-disable-next-line
  }, []);

  // - - - - - - - - - - - - - - - - - - - - - -

  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View>
      <Pagination
        dotsLength={noticiasPopu.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={noticiasPopu}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
    </View>
  );
}

export default CarouselNYT;
