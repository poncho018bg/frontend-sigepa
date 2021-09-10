import Keycloak from "keycloak-js";
import React from "react";

const _kc = new Keycloak(process.env.REACT_APP_KEYCLOAK_CONFIG);

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    onLoad: 'login-required',
    checkLoginIframeInterval: 1,
    enableLogging: true
  }
  ).then((authenticated) => {
    console.log("keycloak", _kc);
      onAuthenticatedCallback();
    })
  
};

const doLogin = _kc.login;
const doLogout = _kc.logout;
const getToken = () => _kc.token;
const isLoggedIn = () => !!_kc.token;
const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;
const getFirstName = () => _kc.tokenParsed?.given_name;
const getLastName = () => _kc.tokenParsed?.family_name;
const getIdUSuario = () => _kc.tokenParsed?.sub;

const getRoles = () => _kc.tokenParsed?.realm_access;

const getGroups = () => _kc.tokenParsed?.groups;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  getFirstName,
  getLastName,
  getRoles,
  getIdUSuario,
  getGroups,
};

export default UserService;