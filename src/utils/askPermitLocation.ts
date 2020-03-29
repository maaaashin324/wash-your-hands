import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

export const getLocationPermission = async (): Promise<string> => {
  const { status } = await Permissions.getAsync(Permissions.LOCATION);
  return status;
};

export const askPermitLocation = async (
  canAsk: boolean,
  status?: string
): Promise<void> => {
  let currentStatus = '';
  if (!status) {
    currentStatus = await getLocationPermission();
  }
  if (currentStatus !== 'granted' && canAsk) {
    const { status: statusGot } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    await askPermitLocation(false, statusGot);
  }
  if (currentStatus !== 'granted' && !canAsk) {
    Alert.alert(
      'Location not granted',
      'Please let this app make a notification to have you wash your hands',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (): Promise<void> => askPermitLocation(true),
        },
      ]
    );
  }
};
