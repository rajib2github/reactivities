import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import ActivityList from "./ActivityList";
import Activitydetails from "../details/Activitydetails";
import Activityform from "../form/Activityform";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}          
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <Activitydetails
            activity={selectedActivity}
            setEditMode={setEditMode}
          />
        )}
        {editMode && <Activityform />}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
