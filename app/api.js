'use strict'
const store = require('./store')
const { apiUrl } = require('./config')
const signUp = function (data) {
  console.log(data)
  return $.ajax({
    url: apiUrl + '/sign-up',
    method: 'POST',
    data: data
  })
}

const signIn = function (data) {
  console.log(data)
  return $.ajax({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: data
  })
}

const signOut = function () {
  return $.ajax({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

const showIssues = function () {
  return $.ajax({
    url: apiUrl + '/issues',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  showIssues
}
