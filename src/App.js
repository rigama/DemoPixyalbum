import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import NewAlbum  from './components/NewAlbum';
import Home from './components/Home';
import EditClient from './components/EditClient';
import NewClient from './components/NewClient';

function App() {

    const[ clients, saveClients ] = useState([]);
    const[ reloadClients, saveReloadClients] = useState(true);

    useEffect(()=> {
        if(reloadClients){
            const queryApi = async () => {
                // consultar la api de json-server 
                const result = await axios.get('http://localhost:4000/clients');
                saveClients(result.data);
            }
            queryApi();
            saveReloadClients(false);
        }

    }, [reloadClients]);


    return (
        <Router>
            <Header/>
            <main className="container mt-4">
                <Switch>
                    <Route exact path="/home"
                        render={()=>(
                            <Home 
                                clients={clients}
                                saveReloadClients={saveReloadClients}
                            />
                        )}
                    />
                    <Route exact path="/new-album" component={NewAlbum} />
                    <Route exact path="/clientsEdit/editClient/:id" 
                        render={ props => {
                            console.log(props.match.params.id);
                            const idSelect = props.match.params.id;

                            const client = clients.filter( client => client.id ===idSelect );

                            return(
                                <EditClient 
                                    client={client[0]}
                                    saveReloadClients={saveReloadClients}
                                />
                            )
                        } }
                    />
                    <Route exact path="/client-new" 
                        render={() => (
                            <NewClient
                                saveReloadClients={saveReloadClients}
                            />
                        )}
                    />
                </Switch>
            </main>
        </Router>
    );
}

export default App;