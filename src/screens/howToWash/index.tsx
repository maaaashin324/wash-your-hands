import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import MyCard from '@components/myCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myCard: {
    marginTop: 20,
    height: 200,
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
  <View style={styles.container}>
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
  </View>
);

export default HowToWashScreen;
