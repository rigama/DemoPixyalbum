import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NewAlbum  from './components/NewAlbum';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <Header/>
            <main className="container mt-4">
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/new-album" component={NewAlbum} />
                </Switch>
            </main>
        </Router>
    );
}

export default App;