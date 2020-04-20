import React, { useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Title, Text, FAB } from 'react-native-paper';
import i18n from 'i18n-js';
import { AlertFrequencyType, WashFrequencyType } from '@types';
import MyPortal from '@components/myPortal';
import { Colors, StorageKeys } from '@/constants';
import { calcFrequency, setFrequency, getNecessaryPermissions } from '@/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  frequencyContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 50,
  },
  frequencyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  washView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  washFAB: {
    width: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  frequencyText: {
    alignSelf: 'center',
    fontSize: 150,
  },
  frequencyDescription: {
    alignSelf: 'center',
    fontSize: 20,
  },
});

const HomeScreen: React.FC<{}> = () => {
  let alertFrequency: AlertFrequencyType | null = null;
  let todayAlertTimes = 0;
  let washFrequency: WashFrequencyType | null = null;

  const [todayWashTimes, setTodayWashTimes] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const editWashFrequency = async (type: string): Promise<void> => {
    let dataTobeSet = todayWashTimes;
    if (type === 'plus') {
      dataTobeSet += 1;
    } else if (dataTobeSet > 0) {
      dataTobeSet -= 1;
    }
    setTodayWashTimes(dataTobeSet);
    await setFrequency({ frequency: washFrequency, dataTobeSet, type });
  };

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const judgePermissionWhenRendered = async (): Promise<void> => {
    const result = await getNecessaryPermissions();
    if (!result.granted) {
      setDialogOpen(true);
    }
  };

  const getFrequency = async (): Promise<void> => {
    const alertFrequencyJSON = await AsyncStorage.getItem(
      StorageKeys.AlertFrequency
    );
    const washFrequencyJSON = await AsyncStorage.getItem(
      StorageKeys.WashFrequency
    );
    if (alertFrequencyJSON) {
      alertFrequency = JSON.parse(alertFrequencyJSON);
      todayAlertTimes = calcFrequency(alertFrequency);
    }
    if (washFrequencyJSON) {
      washFrequency = JSON.parse(washFrequencyJSON);
      setTodayWashTimes(calcFrequency(washFrequency));
    }
  };

  useEffect(() => {
    judgePermissionWhenRendered();
    getFrequency();
    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title>{i18n.t('home.title')}</Title>
        <Text>{i18n.t('home.description')}</Text>
      </View>
      <View style={styles.frequencyContainer}>
        <View style={styles.frequencyView}>
          <Text style={styles.frequencyText}>{todayAlertTimes}</Text>
          <Text style={styles.frequencyDescription}>
            {i18n.t('home.warningTimes')}
          </Text>
        </View>
        <View style={styles.frequencyView}>
          <View style={styles.washView}>
            <Text style={styles.frequencyText}>{todayWashTimes}</Text>
            <Text style={styles.frequencyDescription}>
              {i18n.t('home.washTimes')}
            </Text>
          </View>
          <View style={styles.washFAB}>
            <FAB
              icon="minus"
              style={{ backgroundColor: Colors.themeColor }}
              // eslint-disable-next-line
              onPress={(): any => {
                editWashFrequency('minus');
              }}
            />
            <FAB
              icon="plus"
              style={{ backgroundColor: Colors.themeColor }}
              // eslint-disable-next-line
              onPress={(): any => {
                editWashFrequency('plus');
              }}
            />
          </View>
        </View>
      </View>
      <MyPortal
        title={i18n.t('home.dialogTitle')}
        content={i18n.t('home.dialogContent')}
        isDialogOpen={isDialogOpen}
        hideDialog={hideDialog}
      />
    </View>
  );
};

export default HomeScreen;
