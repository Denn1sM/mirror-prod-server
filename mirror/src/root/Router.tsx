import React from 'react';
import {Route} from 'react-router-dom';
import ScreenContainer from './ScreenContainer';
import Aktien from "../components/Aktien/Aktien";
import NotesComponent from "../components/notes/NotesComponent";
// import NotesComponent from "../components/notes/NotesComponent";

const Router: React.FC = () =>
  (
    <div>
          <Route path="/" exact>
            <ScreenContainer />
          </Route>
          <Route path="/note" exact>
              <NotesComponent/>
          </Route>
          <Route path="/aktien">
              <Aktien percentageScala={false} />
          </Route>
    </div>
  );

export default Router;
