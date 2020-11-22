import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import { HackerNewsAPI, Title } from "./constants";
import IStory from "./interfaces/IStory";

const App: FC = () => {
  const [news, setNews] = useState([
    { id: "1", news: "news1" },
    { id: "2", news: "news2" },
    { id: "3", news: "news3" },
    { id: "4", news: "news4" },
    { id: "5", news: "news5" },
    { id: "6", news: "news6" },
    { id: "7", news: "news7" },
  ]);

  async function fetchItem<T>(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as T;
  }

  useEffect(() => {
    fetchItem<IStory>("https://hacker-news.firebaseio.com/v0/item/8863.json")
      .then((item) => {
        console.log(item);
      })
      .catch((error) => {
        /* show error message */
      });

    fetchItem<IStory>("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((item) => {
        console.log(item);
      })
      .catch((error) => {
        /* show error message */
      });

    fetchItem<IStory>("https://hacker-news.firebaseio.com/v0/user/20.json")
      .then((item) => {
        console.log(item);
      })
      .catch((error) => {
        /* show error message */
      });

    // fetch("https://hacker-news.firebaseio.com/v0/item/8863.json")
    // .then((response) => response.json())
    // .then((result) => {
    //   console.log(result);
    // });
  }, []);

  return (
    <View style={styles.container}>
      <Header title={Title} />
      <FlatList
        data={news}
        renderItem={(story) => <Text>{story.item.news}</Text>}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
