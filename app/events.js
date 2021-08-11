'use strict'
const getFormFields = require('../lib/get-form-fields')
const api = require('./api')
const store = require('./store')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  // get info from event and form
  const form = event.target
  const data = getFormFields(form)
  // make an API call using AJAX
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
  // Handle a successful or failed call
}

const onCreateAccount = function () {
  $('#sign-in').hide()
  $('#sign-up').show()
  $('.no-account').hide()
}

const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = function () {
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onShowIssues = function () {
  // event.preventDefault()
  api.showIssues()
    .then(ui.onShowIssuesSuccess)
    .catch(ui.onShowIssuesFailure)
}

const onNewIssue = function (event) {
  event.preventDefault()
  // get info from event and form
  const form = event.target
  const data = getFormFields(form)
  $('form').trigger('reset')
  // make an API call using AJAX
  api.newIssue(data)
    .then(ui.onNewIssueSuccess)
    .catch(ui.onNewIssueFailure)
  // Handle a successful or failed call
}

const onUpdateIssue = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  $('form').trigger('reset')
  api.updateIssue(data)
    .then(ui.onUpdateIssueSuccess)
    .catch(ui.onUpdateIssueFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  $('form').trigger('reset')
  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onSignInFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onCreateAccount,
  onShowIssues,
  onNewIssue,
  onUpdateIssue

}
