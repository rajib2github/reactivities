import { IActivity } from "./../models/activity";
import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target ="";

  @computed get activityByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
      })
      .finally(() => (this.loadingInitial = false));
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.editMode = false;
      this.activityRegistry.set(activity.id, activity);
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id,activity);
      this.selectedActivity = activity;
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      console.log(error);
      this.submitting = false;
    }
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  } 

  @action cancelEdit =()=>{
    this.selectedActivity = undefined;
    this.editMode = false;
  }

  
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action deleteActivity = async (e: SyntheticEvent<HTMLButtonElement>,id:string) =>{
    this.submitting = true;
    this.target = e.currentTarget.name;
    try{
      await agent.Activities.delete(id);
      this.activityRegistry.delete(id);      
      this.submitting = false;
      this.target = "";
    }catch(error){
      this.submitting = false; 
      console.log(error);
    }
  }

  @action setSelectedActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
