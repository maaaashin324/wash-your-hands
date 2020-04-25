import React, { useEffect, useState } from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import { Title, Text, FAB } from 'react-native-paper';
import i18n from 'i18n-js';
import MyPortal from '@components/myPortal';
import { COLORS } from '@/constants';
import {
  initTask,
  getFrequency,
  storeWashFrequency,
  getNecessaryPermissions,
  makeTimerNotification,
  addNotificationEvent,
} from '@/utils';

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
  const [todayAlertTimes, setTodayAlertTimes] = useState<number>(0);
  const [todayWashTimes, setTodayWashTimes] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const editWashFrequency = async (operator: string): Promise<void> => {
    let dataTobeSet = todayWashTimes;
    if (operator === 'plus') {
      dataTobeSet += 1;
    } else if (dataTobeSet > 0) {
      dataTobeSet -= 1;
    }
    setTodayWashTimes(dataTobeSet);
    await storeWashFrequency({ dataTobeSet });
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

  const initCurrentFrequency = async (): Promise<void> => {
    const result = await getFrequency();
    setTodayWashTimes(result.washTimes);
    setTodayAlertTimes(result.alertTimes);
    // eslint-disable-next-line
    AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        const currentResult = await getFrequency();
        setTodayAlertTimes(currentResult.alertTimes);
      }
    });
  };

  const makeTimerNotificationWhenForeGround = (): void => {
    // eslint-disable-next-line
    AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        await makeTimerNotification();
      }
    });
  };

  useEffect(() => {
    initTask();
    judgePermissionWhenRendered();
    initCurrentFrequency();
    makeTimerNotificationWhenForeGround();
    addNotificationEvent();
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
              style={{ backgroundColor: COLORS.themeColor }}
              // eslint-disable-next-line
              onPress={(): any => {
                editWashFrequency('minus');
              }}
            />
            <FAB
              icon="plus"
              style={{ backgroundColor: COLORS.themeColor }}
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
