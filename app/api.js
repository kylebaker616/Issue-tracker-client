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

const changePassword = function (data) {
  console.log(data)
  return $.ajax({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.token
    },
    data: data
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

const newIssue = function (data) {
  console.log(data)
  return $.ajax({
    url: apiUrl + '/issues',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.token
    },
    data: data
  })
}

const getIssue = function () {
  return $.ajax({
    url: apiUrl + '/issues/' + store.id,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

const updateIssue = function (data) {
  console.log(data)
  return $.ajax({
    url: apiUrl + '/issues/' + store.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.token
    },
    data: data
  })
}

const deleteIssue = function () {
  return $.ajax({
    url: apiUrl + '/issues/' + store.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}
module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  showIssues,
  newIssue,
  getIssue,
  updateIssue,
  deleteIssue
}
