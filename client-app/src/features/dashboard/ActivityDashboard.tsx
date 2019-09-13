import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import Activitydetails from "../details/Activitydetails";
import Activityform from "../form/Activityform";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/stores/activitystore";

const ActivityDashboard: React.FC= () => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <Activitydetails />}
        {editMode && (
          <Activityform
            key={(selectedActivity && selectedActivity.id) || 0}            
            activity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
