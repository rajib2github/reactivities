import React, {Component} from 'react';
import { Header, List, Button} from 'semantic-ui-react'
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    values: []
  }

  componentDidMount()
  {
    axios.get("http://localhost:5000/api/values")
          .then((res)=>{
            console.log(res);
            this.setState({
              values: res.data
            });

          });
    
  }

  render() {
    return(
    <div>
      <Header as='h2' icon='plug' content='Uptime Guarantee' />
        
        <List>
          {this.state.values.map((value:any)=>(
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      
    </div>    
    );
  }
}

export default App;
