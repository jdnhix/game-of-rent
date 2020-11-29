import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from "./store/index";
import * as serviceWorker from './serviceWorker';
import './index.css';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import * as RealmWeb from "realm-web";

export const APP_ID = "game-of-rent-drxfs";

const app = new RealmWeb.App({
  id: APP_ID,
  baseUrl: "https://realm.mongodb.com"
});

const authorizationHeaderLink = setContext(async (_, { headers }) => {
  if (app.currentUser) {
    // Refreshing custom data also refreshes the access token
    // await app.currentUser.refreshCustomData();
  } else {
    // If no user is logged in, log in an anonymous user
    await app.logIn(RealmWeb.Credentials.anonymous());
  }

  const { accessToken } = app.currentUser;
//   console.log("currentUser", accessToken, app.currentUser);

  // Set the Authorization header, preserving any other headers
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    }
  };
});

const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
const httpLink = new HttpLink({ uri: graphql_url });

const client = new ApolloClient({
  link: authorizationHeaderLink.concat(httpLink),
  cache: new InMemoryCache()
});


render(
    <ApolloProvider client={client}>
        <App store={store} />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


