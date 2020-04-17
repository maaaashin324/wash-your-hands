import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { List, Switch, TextInput } from 'react-native-paper';
import i18n from 'i18n-js';
import {
  askLocationPermission,
  askNotificationPermission,
  getNecessaryPermissions,
  getTimerPermission,
  setTimerPermission,
} from '@utils/permissions';
import {
  setTimerDuration,
  makeNotificationForTest,
} from '@utils/notifications';
import MyPortal from '@components/myPortal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  listSection: {
    alignSelf: 'stretch',
  },
});

const SettingScreen: React.FC<{}> = () => {
  const [isLocationPermitted, setLocationPermitted] = useState<boolean>(false);
  const [isNotificationPermitted, setNotificationPermitted] = useState<boolean>(
    false
  );
  const [isTimerPermitted, setTimerPermitted] = useState<boolean>(false);
  const [timerDuration, setTimerDurationState] = useState<number>(30);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const getPermissionStatus = async (): Promise<void> => {
    const result = await getNecessaryPermissions();
    if (result.detail[Permissions.LOCATION]) {
      setLocationPermitted(true);
    }
    if (result.detail[Permissions.NOTIFICATIONS]) {
      setNotificationPermitted(true);
    }
    const timerResult = await getTimerPermission();
    setTimerPermitted(timerResult);
  };

  const setPermissions = async (whichPermission: string): Promise<void> => {
    let result = false;
    if (whichPermission === 'location') {
      result = await askLocationPermission();
      setLocationPermitted(result);
    } else if (whichPermission === 'notification') {
      result = await askNotificationPermission();
      setNotificationPermitted(result);
    } else {
      await setTimerPermission(!isTimerPermitted);
      if (!isTimerPermitted) {
        await makeNotificationForTest();
      }
      setTimerPermitted(!isTimerPermitted);
      return;
    }
    if (!result) {
      setDialogOpen(true);
    }
  };

  const setTimer = async (newDuration): Promise<void> => {
    await setTimerDuration(newDuration);
  };

  useEffect(() => {
    getPermissionStatus();
  }, []);

  return (
    <View style={styles.container}>
      <List.Section style={styles.listSection} title={i18n.t('settings.title')}>
        <List.Item
          title={i18n.t('settings.location')}
          right={(): React.ReactNode => (
            <Switch
              value={isLocationPermitted}
              onValueChange={async (): Promise<void> => {
                await setPermissions('location');
              }}
            />
          )}
        />
        <List.Item
          title={i18n.t('settings.notification')}
          right={(): React.ReactNode => (
            <Switch
              value={isNotificationPermitted}
              onValueChange={async (): Promise<void> => {
                await setPermissions('notification');
              }}
            />
          )}
        />
        <List.Item
          title={i18n.t('settings.timer')}
          right={(): React.ReactNode => (
            <Switch
              value={isTimerPermitted}
              onValueChange={async (): Promise<void> => {
                await setPermissions('timer');
              }}
            />
          )}
        />
        <TextInput
          label="Timer"
          disabled={!isTimerPermitted}
          keyboardType="numeric"
          onChangeText={(text): void => setTimerDurationState(+text)}
          onBlur={(): void => {
            if (timerDuration < 30) {
              setTimer(30);
              setTimerDurationState(30);
            } else {
              setTimer(timerDuration);
            }
          }}
          returnKeyType="done"
          value={String(timerDuration)}
        />
      </List.Section>
      <MyPortal
        title={i18n.t('settings.dialogTitle')}
        content={i18n.t('settings.dialogContent')}
        isDialogOpen={isDialogOpen}
        hideDialog={hideDialog}
      />
    </View>
  );
};

export default SettingScreen;
