import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { List, Switch, TextInput } from 'react-native-paper';
import i18n from 'i18n-js';
import { NotificationService, PermissionService, TaskService } from '@/class';
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

const defaultTimerInterval = NotificationService.getDefaultTimeInterval();

const SettingScreen: React.FC<{}> = () => {
  let initTimerDurationByHours = 0;
  const [isLocationPermitted, setLocationPermitted] = useState<boolean>(false);
  const [isNotificationPermitted, setNotificationPermitted] = useState<boolean>(
    false
  );
  const [isTimerPermitted, setTimerPermitted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(defaultTimerInterval);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const getPermissionStatus = async (): Promise<void> => {
    const result = await PermissionService.getNecessaryPermissions();
    if (result.detail[Permissions.LOCATION]) {
      setLocationPermitted(true);
    }
    if (result.detail[Permissions.NOTIFICATIONS]) {
      setNotificationPermitted(true);
    }
    const timerResult = await PermissionService.getTimerPermission();
    setTimerPermitted(timerResult);
  };

  const setPermissions = async (whichPermission: string): Promise<void> => {
    let result = false;
    if (whichPermission === 'location') {
      result = await PermissionService.askLocationPermission();
      setLocationPermitted(result);
    } else if (whichPermission === 'notification') {
      result = await PermissionService.askNotificationPermission();
      setNotificationPermitted(result);
    } else {
      await PermissionService.setTimerPermission(!isTimerPermitted);
      setTimerPermitted(!isTimerPermitted);
      result = true;
    }
    await TaskService.initTask();
    if (!result) {
      setDialogOpen(true);
    }
  };

  const setTimer = async (newDuration: number): Promise<void> => {
    if (initTimerDurationByHours === newDuration) {
      return;
    }
    await NotificationService.setTimerDurationByHours(newDuration);
    await TaskService.resetTimerTask();
  };

  const setInitTimerDuration = async (): Promise<void> => {
    const initDuration = await NotificationService.getTimerDurationByHours();
    initTimerDurationByHours = initDuration;
    setDuration(initDuration);
  };

  useEffect(() => {
    getPermissionStatus();
    setInitTimerDuration();
    // eslint-disable-next-line
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
          defaultValue={String(defaultTimerInterval)}
          disabled={!isTimerPermitted}
          label={i18n.t('settings.timerPlaceHolder')}
          keyboardType="numeric"
          onChangeText={(text): void => setDuration(+text)}
          onBlur={async (): Promise<void> => {
            if (duration <= 0) {
              await setTimer(defaultTimerInterval);
              setDuration(defaultTimerInterval);
            } else {
              await setTimer(duration);
            }
          }}
          returnKeyType="done"
          value={String(duration)}
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
