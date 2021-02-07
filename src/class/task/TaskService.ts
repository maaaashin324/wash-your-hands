import * as BackgroundFetch from 'expo-background-fetch';
import LocationTaskService from './LocationTaskService';
import TimerTaskService from './TimerTaskService';

class TaskService {
  private locationTaskService: LocationTaskService;

  private timerTaskService: TimerTaskService;

  constructor() {
    this.locationTaskService = new LocationTaskService();
    this.timerTaskService = new TimerTaskService();
  }

  public defineTask(): void {
    this.locationTaskService.defineTask();
    this.timerTaskService.defineTimerTask();
  }

  public async initTask(): Promise<void> {
    await this.locationTaskService.initLocationTask();
    await this.timerTaskService.initTimerTask();
    await BackgroundFetch.setMinimumIntervalAsync(36000);
  }

  public async resetTimerTask(): Promise<void> {
    await this.timerTaskService.restartTimerTask();
  }
}

const taskService = new TaskService();
export default taskService;
