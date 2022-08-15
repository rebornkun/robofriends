import React from "react";
import CardList from '../Components/CardList';
// import { robots } from '../robots';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css'
import ErrorBoundry from "../Components/ErrorBoundry";

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ""
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
            return response.json();
        }).then(users => {
            this.setState({ 
                robots: users
            })
        })
        
    }

    onSearchChange = (e) => {
        this.setState({searchfield: e.target.value})
    }

    render(){
        const { robots , searchfield } = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })

        return !robots.length ?
             <h1>Loading...</h1> :

        (
            <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filterRobots}/>
                </ErrorBoundry>
            </Scroll>
            </div>
        );
        
        }
}

export default App;