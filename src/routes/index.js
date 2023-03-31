import React, {Component} from "react"
import {Switch} from "react-router-dom"
import {PublicRoute} from './PublicRoute'
import {PrivateRoute} from './PrivateRoute'
import {ExceptionRoute} from './ExceptionRoute'
import * as Auth from '@features/Auth'
import * as Home from '@features/Home'
import * as Recipe from '@features/Recipe'
import * as ListRecipe from '@features/ListRecipe'
import * as User from '@features/User'
import {ErrorPage} from "@features/Exceptions";

class AllRoutes extends Component {
    render() {
        return (
            <Switch>
                <PublicRoute path="/login" layout='Auth'><Auth.Login/></PublicRoute>
                <PublicRoute path="/register" layout='Auth'>
                    <Auth.Register/>
                </PublicRoute>

                <PrivateRoute path="/" layout='App' exact={true}>
                    <Home.HomePage/>
                </PrivateRoute>
                <PrivateRoute path="/homepage" layout='App' exact={true}>
                    <Home.HomePage/>
                </PrivateRoute>
                <PrivateRoute path="/food-blog-web" layout='App' exact={true}>
                    <Home.HomePage/>
                </PrivateRoute>
                <PrivateRoute path="/recipe" layout='App' exact={true}>
                    <Recipe.Management/>
                </PrivateRoute>
                <PrivateRoute path="/recipe/add" layout='App' exact={true}>
                    <Recipe.Add/>
                </PrivateRoute>
                <PrivateRoute path="/recipe/:id/edit" layout='App' exact={true}>
                    <Recipe.Edit/>
                </PrivateRoute>
                <PrivateRoute path="/recipe/:id/detail/" layout='App' exact={true}>
                    <Recipe.Detail/>
                </PrivateRoute>

                <PrivateRoute path="/list-recipe/add" layout='App' exact={true}>
                    <ListRecipe.Add/>
                </PrivateRoute>
                <PrivateRoute path="/list-recipe/:id/edit" layout='App' exact={true}>
                    <ListRecipe.Edit/>
                </PrivateRoute>

                <PrivateRoute path="/account" layout='App'>
                    <User.Account/>
                </PrivateRoute>
                <PrivateRoute path="/profile" layout='App'>
                    <User.SelfProfile/>
                </PrivateRoute>
                <PrivateRoute path="/user/:id" layout='App'>
                    <User.PublicProfile/>
                </PrivateRoute>

                <ExceptionRoute path="*"><ErrorPage code={404}/></ExceptionRoute>
            </Switch>
        );
    }
}

export default AllRoutes
