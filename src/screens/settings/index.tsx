import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Switch } from 'react-native-paper';
import {
  getLocationPermission,
  askPermitLocation,
} from '@utils/askPermitLocation';
import {
  getNotificationPermission,
  askPermitNotifications,
} from '@utils/askPermitNotifications';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SettingScreen: React.FC<{}> = () => {
  const [isLocationPermitted, setLocationPermitted] = useState<boolean>(false);
  const [isNotificationPermitted, setNotificationPermitted] = useState<boolean>(
    false
  );

  const getPermissionStatus = async (): Promise<void> => {
    const locationResult = await getLocationPermission();
    if (locationResult === 'granted') {
      setLocationPermitted(true);
    }
    const notificationResult = await getNotificationPermission();
    if (notificationResult === 'granted') {
      setNotificationPermitted(true);
    }
  };

  const setPermissions = async (whichPermission: string): Promise<void> => {
    if (whichPermission === 'location') {
      await askPermitLocation(true);
    } else {
      await askPermitNotifications(true);
    }
    await getPermissionStatus();
  };

  useEffect(() => {
    getPermissionStatus();
  }, []);

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Permission</List.Subheader>
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
      </List.Section>
    </View>
  );
};

export default SettingScreen;
