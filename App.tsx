import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import { StoryListItem } from "./components/ListItems";
import { HackerNewsAPI, Title } from "./constants";
import IStory from "./interfaces/IStory";
import { fetchItem } from "./services/FetchService";
import { getRandomItemsFromArray } from "./utils/utils";

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

  const [topTenStories, setTopTenStories] = useState<IStory[]>([]);
  // const [topTenStoriesIDs, setTopTenStoriesIDs] = useState<number[]>([]);

  // componentdidmount
  useEffect(() => {
    getTopTenStoriesRandomized();
    // fetchItem<IStory>(`${HackerNewsAPI}/item/8863.json`)
    //   .then((item) => {
    //     console.log(item);
    //   })
    //   .catch((error) => {
    //     /* show error message */
    //     console.error(error);
    //   });

    // fetchItem<IStory>(`${HackerNewsAPI}/user/20.json`)
    //   .then((item) => {
    //     console.log(item);
    //   })
    //   .catch((error) => {
    //     /* show error message */
    //     console.error(error);
    //   });
  }, []);

  const getTopTenStoriesRandomized = () => {
    let randomizedIDs: number[];

    fetchItem<number[]>(`${HackerNewsAPI}/topstories.json`)
      .then((topTenStoriesIDsList) => {
        randomizedIDs = getRandomItemsFromArray(topTenStoriesIDsList, 10);
      })
      // .finally(() => console.log("ToptenstoriesIDs", topTenStoriesIDs))
      .catch((error) => {
        /* show error message */
        console.error(error);
      });

    // setTopTenStories();
  };

  return (
    <View style={styles.container}>
      <Header title={Title} />
      <FlatList
        data={topTenStories}
        renderItem={(story) => <StoryListItem story={story} />}
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
