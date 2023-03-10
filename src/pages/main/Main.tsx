import React from "react";
import "./Main.css";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import Nav from "pages/main/components/nav/Nav";
import BookList from "pages/bookList/BookList";
import BookDetails from "pages/bookDetails/BookDetails";
import PageNotFound from "pages/pageNotFound/PageNotFound";


function Main(): React.ReactElement {

    return (
        <main>
            <HashRouter>
                <Nav/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="list"/>
                    </Route>
                    <Route path="/book/:id" component={BookDetails}/>
                    <Route path="/list">
                        <BookList/>
                    </Route>
                    <Route>
                        <PageNotFound/>
                    </Route>
                </Switch>
            </HashRouter>
        </main>
    )
}

export default Main;