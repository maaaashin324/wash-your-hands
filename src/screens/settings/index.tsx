import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  List,
  Switch,
} from 'react-native-paper';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import TRANSLATIONS from '@constants/translations';
import { askLocationPermission } from '@utils/permissionLocation';
import { askNotificationPermission } from '@utils/permissionNotification';
import { getNecessaryPermissions } from '@utils/permissions';

i18n.translations = TRANSLATIONS;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

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
  };

  const setPermissions = async (whichPermission: string): Promise<void> => {
    let result = false;
    if (whichPermission === 'location') {
      result = await askLocationPermission();
      setLocationPermitted(result);
    } else {
      result = await askNotificationPermission();
      setNotificationPermitted(result);
    }
    if (!result) {
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    getPermissionStatus();
  }, []);

  return (
    <View style={styles.container}>
      <List.Section style={styles.listSection} title="Permission">
        <List.Item
          title="Location"
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
          title="Notification"
          right={(): React.ReactNode => (
            <Switch
              value={isNotificationPermitted}
              onValueChange={async (): Promise<void> => {
                await setPermissions('notification');
              }}
            />
          )}
        />
      </List.Section>
      <Portal>
        <Dialog visible={isDialogOpen} onDismiss={hideDialog}>
          <Dialog.Title>{i18n.t('settings.dialogTitle')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{i18n.t('settings.dialogContent')}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default SettingScreen;
