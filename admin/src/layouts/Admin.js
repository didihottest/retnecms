import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// children components
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

// action creator
import readWhois from '../components/Header/_redux/whoisAction';

// context
import { WhoisContext } from '../components/Context/WhoisContext';

function Admin() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(readWhois())
    }, [dispatch])

    const whoisState = useSelector(state => state.whois);
    const { currentUser } = whoisState;

    return (
        <WhoisContext.Provider value={currentUser}>
            <Router>
                <div id="App">
                    <Header />
                    <Main />
                </div>
            </Router>
        </WhoisContext.Provider>

    )
};

export default Admin;