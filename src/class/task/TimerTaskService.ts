import { Notifications } from 'expo';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import NotificationService from '@/class/NotificationService';

export default class TimerTaskService {
  private taskName = 'TIMER_TASK_NAME';

  defineTimerTask = (): void => {
    TaskManager.defineTask(
      this.taskName,
      // https://github.com/expo/expo/blob/sdk-37/packages/expo-task-manager/src/TaskManager.ts
      // Since taskExecutor is invoked with await in line 182, this should be return promise.
      // eslint-disable-next-line
      async ({ error }: TaskManager.TaskManagerTaskBody) => {
        if (error) {
          return BackgroundFetch.Result.Failed;
        }
        const result = await NotificationService.makeTimerNotification();
        return !result
          ? BackgroundFetch.Result.NoData
          : BackgroundFetch.Result.NewData;
      }
    );
  };

  // https://github.com/expo/expo/issues/3582#issuecomment-480820345
  initTimerTask = async (): Promise<void> => {
    const isBackPermitted = await BackgroundFetch.getStatusAsync();
    if (isBackPermitted === BackgroundFetch.Status.Available) {
      await BackgroundFetch.registerTaskAsync(this.taskName, {
        minimumInterval: 36000,
      });
    }
  };

  restartTimerTask = async (): Promise<void> => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await this.initTimerTask();
    await NotificationService.makeTimerNotification();
  };
}
