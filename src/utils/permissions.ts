import * as Permissions from 'expo-permissions';

export interface GetNecessaryPermission {
  isGranted: boolean;
  detail: {
    [key: string]: string;
  };
}

// eslint-disable-next-line
export const getNecessaryPermissions = async (): Promise<
  GetNecessaryPermission
> => {
  const { status, permissions } = await Permissions.getAsync(
    Permissions.LOCATION,
    Permissions.NOTIFICATIONS
  );
  const isGranted = status === 'granted';
  return {
    isGranted,
    detail: {
      [Permissions.LOCATION]: permissions[Permissions.LOCATION].status,
      [Permissions.NOTIFICATIONS]:
        permissions[Permissions.NOTIFICATIONS].status,
    },
  };
};
