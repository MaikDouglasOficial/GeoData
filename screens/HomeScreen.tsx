import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Country = {
  name: { common: string };
  cca3: string;
  currencies?: { [key: string]: { name: string } };
  languages?: { [key: string]: string };
  flags: { png: string };
  translations?: { [key: string]: { official: string; common: string } };
};

const Home = ({ navigation }: any) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data: Country[]) => setCountries(data))
      .catch((error) => console.error("Erro:", error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.translations?.por?.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image source={require("../assets/GeoData-Logo3.png")} style={styles.logo} />

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar país..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        </View>

        {search.length > 0 && (
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.cca3}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => navigation.navigate("CountryDetails", { country: item })}
              >
                <Image source={{ uri: item.flags.png }} style={styles.flag} />
                <Text style={styles.countryName}>
                  {Object.values(item.translations || {})[16]?.common || "N/A"}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    padding: 16,
  },
  logo: {
    width: 450,
    height: 395,
    alignSelf: "center",
    marginBottom: -40,
    marginTop: -80,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 5,
  },
  input: {
    height: 45,
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 15,
    borderRadius: 5,
  },
  countryName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});

export default Home;
