import React, { SyntheticEvent, useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/stores/activitystore";

interface IProps {
  
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target:string
}

const ActivityList: React.FC<IProps> = ({  
  deleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const{activityByDate,setSelectedActivity} = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activityByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.descrition}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => setSelectedActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  loading={target===activity.id && submitting}
                  onClick={(e) => deleteActivity(e,activity.id)}
                  color="red"
                  floated="right"
                  content="Delete"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
