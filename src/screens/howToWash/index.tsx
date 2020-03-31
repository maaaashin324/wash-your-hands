import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import TRANSLATIONS from '@constants/translations';
import MyCard from '@components/myCard';
import { videoListsWithYoutubeURL } from './utils';

i18n.translations = TRANSLATIONS;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myCard: {
    marginBottom: 20,
    marginHorizontal: 0,
  },
});

const HowToWashScreen: React.FC<{ navigation }> = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      {videoListsWithYoutubeURL.map((eachVideo) => (
        <MyCard
          key={eachVideo.title}
          title={eachVideo.title}
          content={eachVideo.subTitle}
          thumbnail={eachVideo.thumbnailURL}
          buttonTitle={i18n.t('howToWash.watchButton')}
          callback={(): void => {
            navigation.navigate('YouTube', {
              uri: eachVideo.youtubeURL,
            });
          }}
          style={styles.myCard}
        />
      ))}
    </ScrollView>
  </SafeAreaView>
);

export default HowToWashScreen;
