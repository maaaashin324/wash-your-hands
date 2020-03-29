import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

const askPermitNotifications = async (
  canAsk: boolean,
  status?: string
): Promise<void> => {
  let currentStatus = '';
  if (!status) {
    const { status: statusGot } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    currentStatus = statusGot;
  }
  if (currentStatus !== 'granted' && canAsk) {
    const { status: statusGot } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    await askPermitNotifications(false, statusGot);
  }
  if (currentStatus !== 'granted' && !canAsk) {
    Alert.alert(
      'Notifications not granted',
      'Please let this app make a notification to have you wash your hands',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (): Promise<void> => askPermitNotifications(true),
        },
      ]
    );
  }
};

export default askPermitNotifications;
