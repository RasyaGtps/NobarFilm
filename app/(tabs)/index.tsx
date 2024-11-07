// app/(tabs)/index.tsx
import { useRef, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, Easing } from "react-native";
import { Link } from "expo-router";

const movies = [
  {
    id: "1",
    title: "War of the Worlds",
    description:
      "Cerita War of the Worlds umumnya menggambarkan tema tentang ketidakberdayaan manusia menghadapi kekuatan yang jauh lebih maju dan seringkali menjadi refleksi tentang ketakutan kolektif yang muncul di era masing-masing, seperti ketakutan akan perang atau bencana besar.",
    image: "https://upload.wikimedia.org/wikipedia/en/8/83/War_of_the_Worlds_2005_poster.jpg",
  },
  {
    id: "2",
    title: "The Long Road Home",
    description:
      "The Long Road Home adalah serial TV yang mengisahkan tentang peristiwa nyata dari Perang Irak, khususnya insiden yang dikenal sebagai Black Sunday Serial ini diproduksi oleh National Geographic pada tahun 2017 dan didasarkan pada buku karya Martha Raddatz yang berjudul sama.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdee8WrEcKP_gGWSh2MukucSz3C2JDSgHzRA&s",
  },
  {
    id: "3",
    title: "1917",
    description:
      "1917 adalah film perang yang disutradarai oleh Sam Mendes dan dirilis pada tahun 2019. Berlatar belakang Perang Dunia I, film ini mengikuti dua prajurit Inggris muda, Lance Corporals Schofield dan Blake, yang diberikan misi berbahaya untuk menghentikan serangan besar.",
    image: "https://fr.web.img5.acsta.net/pictures/20/01/10/14/49/5340816.jpg",
  },
];

const ITEM_HEIGHT = 400;
const windowHeight = Dimensions.get("window").height;

export default function TabOneScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(movies.map(() => new Animated.Value(0))).current;

  // Animasi muncul saat pertama kali load
  useEffect(() => {
    movies.forEach((_, index) => {
      Animated.timing(fadeAnim[index], {
        toValue: 1,
        duration: 1000,
        delay: index * 300, // Delay berbeda untuk setiap item
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    });
  }, []);

  // Ubah bagian renderItem
  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 1)];

    // Sederhanakan opacity animation
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0], // Ubah nilai ini
      extrapolate: "clamp",
    });

    // Hapus scale animation karena membuat efek blur
    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, 0, 50], // Sesuaikan nilai ini
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity: Animated.multiply(fadeAnim[index], opacity),
            transform: [{ translateY }], // Hapus scale
          },
        ]}>
        <Link
          href={{
            pathname: "/film/[film]",
            params: {
              id: item.id,
              title: item.title,
              description: item.description,
              image: item.image,
            },
          }}
          asChild>
          <TouchableOpacity style={styles.cardTouchable}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={3} style={styles.description}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nobar Film</Text>
      <Animated.FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTouchable: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
