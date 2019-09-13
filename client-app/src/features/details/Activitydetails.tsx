import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import ActivityStore from "../../app/stores/activitystore";
import { observer } from "mobx-react-lite";


const Activitydetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {selectedActivity: activity,openEditForm,cancelEdit} = activityStore;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.descrition}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(activity!.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelEdit}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(Activitydetails);
