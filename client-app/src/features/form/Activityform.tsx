import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../app/stores/activitystore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface DetailParams {
  id: string;
}

const Activityform: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,    
    activity: initialActivity,
    loadActivity,
    clearActivity
  } = activityStore;

  

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    descrition: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length ===0) {
      loadActivity(match.params.id).then(
        () => initialActivity && setActivity(initialActivity)
      );
    }
    return ()=>{
      clearActivity()
    }
  },[loadActivity,match.params.id,clearActivity,initialActivity,activity.id.length]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`));
    } else {
      editActivity(activity).then(()=> history.push(`/activities/${activity.id}`));
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="title"
          onChange={handleInputChange}
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="descrition"
          rows={2}
          placeholder="Description"
          value={activity.descrition}
        />
        <Form.Input
          name="category"
          onChange={handleInputChange}
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          name="date"
          format=""
          onChange={handleInputChange}
          type="datetime-local"
          placeholder="Date"
        />
        <Form.Input
          name="city"
          onChange={handleInputChange}
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          name="venue"
          onChange={handleInputChange}
          placeholder="Venue"
          value={activity.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          type="submit"
          positive
          content="Submit"
        />
        <Button
          onClick={() => history.push("/activities")}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(Activityform);
