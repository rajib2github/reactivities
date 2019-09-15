import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import activitystore from "../../app/stores/activitystore";
import LoadingComponent from "../../app/layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(activitystore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities..." />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h1>Activity filter</h1>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
