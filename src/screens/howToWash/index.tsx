import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import MyCard from '@components/myCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    marginHorizontal: 5,
  },
  myCard: {
    marginTop: 20,
  },
});

const createYoutubeURL = (youtubeVideoID: string): string =>
  `https://www.youtube.com/watch?v=${youtubeVideoID}`;

const createThumbnailURL = (youtubeVideoID: string): string =>
  `https://img.youtube.com/vi/${youtubeVideoID}/default.jpg`;

const videoLists = [
  {
    title: 'Coronavirus | How to wash your hands',
    subTitle: 'Babylon Health',
    videoID: 'seA1wbXUQTs',
  },
  {
    title: 'Hand-washing Steps Using the WHO Technique',
    subTitle: 'Johns Hopkins Medicine',
    videoID: 'IisgnbMfKvI',
  },
];

const videoListsWithYoutubeURL = videoLists.map((eachVideoItem) => ({
  title: eachVideoItem.title,
  subTitle: eachVideoItem.subTitle,
  youtubeURL: createYoutubeURL(eachVideoItem.videoID),
  thumbnailURL: createThumbnailURL(eachVideoItem.videoID),
}));

const HowToWashScreen: React.FC<{}> = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scroll}>
      {videoListsWithYoutubeURL.map((eachVideo) => (
        <MyCard
          key={eachVideo.title}
          title={eachVideo.title}
          content={eachVideo.subTitle}
          thumbnail={eachVideo.thumbnailURL}
          buttonTitle="Watch"
          callback={() => console.log('Hello!')}
          style={styles.myCard}
        />
      ))}
    </ScrollView>
  </SafeAreaView>
);

export default HowToWashScreen;
