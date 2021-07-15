import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import View from './Component/pages/View'
import Create from './Component/pages/Create'
import Nav_bar from './Component/Nav_bar'
function App() {
  return (
    <div>
      <switch>
        <Route path="/" component={Nav_bar} />
        <Route path="/Create" component={Create} />
        <Route path="/View" component={View} />
      </switch>
      
    </div>

  );
}
export default App;
