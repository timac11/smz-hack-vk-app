import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Problems from "./panels/Problems";
import CreateProblem from "./panels/CreateProblem";
import {connect} from "react-redux";
import {changeActivePanel, userFetched} from "./actions/actions";

const App = (props) => {
  const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

  useEffect(() => {
    bridge.subscribe(({detail: {type, data}}) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      props.dispatch(userFetched(user));
      setPopout(null);
    }

    fetchData();
  }, []);

  const go = e => {
    props.dispatch(changeActivePanel(e))
  };

  return (
    <View activePanel={props.activePanel} popout={popout}>
      <Home id='home' fetchedUser={props.user} go={go}/>
      <CreateProblem id='createProblem' go={go}/>
      <Problems id='problems' fetchedUser={props.user} go={go}/>
    </View>
  );
};

function mapStateToProps(state) {
  const activePanel = state.user.activePanel;
  const user = state.user.user;
  return {activePanel, user};
}

export default connect(mapStateToProps)(App);

