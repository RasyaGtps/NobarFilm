// app/(tabs)/film/[film].js
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

export default function FilmScreen() {
  const params = useLocalSearchParams();
  const { title, description, image } = params;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: title,
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 400,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
});
