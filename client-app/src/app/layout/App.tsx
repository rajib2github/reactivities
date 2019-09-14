import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";

import NavBar from "../../features/nav/navbar";
import ActivityDashboard from "../../features/dashboard/ActivityDashboard";

import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activitystore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Activityform from "../../features/form/Activityform";
import Activitydetails from "../../features/details/Activitydetails";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/activities' component={ActivityDashboard} />
        <Route path='/activities/:id' component={Activitydetails} />
        <Route path='/createActivity' component={Activityform} />       
      </Container>
    </Fragment>
  );
};

export default observer(App);
