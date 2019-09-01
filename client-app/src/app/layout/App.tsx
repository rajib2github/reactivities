import React, {Component} from 'react';
import { Header, List, Button} from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/activity';

interface IState {
  activities: IActivity[]
}

class App extends Component<{},IState> {

  readonly state: IState = {
    activities: []
  }

  componentDidMount()
  {
    axios.get<IActivity[]>("http://localhost:5000/api/activities")
          .then((res)=>{
            console.log(res);
            this.setState({
              activities: res.data
            });

          });
    
  }

  render() {
    return(
    <div>
      <Header as='h2' icon='plug' content='Uptime Guarantee' />
        
        <List>
          {this.state.activities.map((activity)=>(
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      
    </div>    
    );
  }
}

export default App;
