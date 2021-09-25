import "./Main.css";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import Nav from "./components/nav/Nav";
import BookList from "../bookList/BookList";
import BookDetails from "../bookDetails/BookDetails";
import PageNotFound from "../pageNotFound/PageNotFound";

function Main() {

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