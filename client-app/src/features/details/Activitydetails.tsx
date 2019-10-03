import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activitystore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ActivitydetailsHeader from "./ActivitydetailsHeader";
import ActivitydetailsInfo from "./ActivitydetailsInfo";
import ActivitydetailChat from "./ActivitydetailChat";
import ActivitydetailsSidebar from "./ActivitydetailsSidebar";

interface DetailParams {
  id: string;
}

const Activitydetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  if (!activity) return <h2>Not Found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivitydetailsHeader activity={activity} />
        <ActivitydetailsInfo activity={activity} />
        <ActivitydetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivitydetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(Activitydetails);
