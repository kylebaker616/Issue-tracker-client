'use strict'
const store = require('./store')
const onSignUpSuccess = function (response) {
  console.log('in then')
  $('#message').show()
  $('#message').text(`Thank you for signing up ${response.user.email}`)
  $('#sign-up').trigger('reset')
  $('#sign-up').delay(1000).hide(500)
  $('#sign-in').delay(1050).show(100)
}

const onSignUpFailure = function (response) {
  console.log('in catch')
  $('#message').text('Sign up failed')
  $('#sign-up').trigger('reset')
}
const onSignInSuccess = function (response) {
  console.log('in then')
  $('#message').text(`Now signed in as ${response.user.email}`)
  $('#message').show()
  store.token = response.user.token
  $('#sign-in').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out').show()
  $('#sign-in-title').hide()
  $('#sign-up-title').hide()
  $('.status').show()
  $('#show-issues').show()
  // $('#change-password').show()
  // &('.home-page-container').show
}

const onSignInFailure = function (response) {
  console.log('in catch')
  $('#message').text(
    'Sign in failed, please enter a valid Email and password.'
  )
  $('#sign-in').trigger('reset')
}

const onSignOutSuccess = function (response) {
  console.log('in then')
  $('#message').text('Signed Out')
  $('#sign-in').show()
  $('#sign-out').hide()
  $('#message').delay(3000).hide(500)
  // $('.status').delay(5000).fadeOut(500)
}

const onSignOutFailure = function (response) {
  console.log('in catch')
  $('#message').text('Sign Out Failed')
}

const onShowIssuesSuccess = function (response) {
  // console.log(issue.issues[0].title)
  console.log(response.issues)
  const issue = response.issues
  // for (let i = 0; i < issue.length; i++) {
  //   $('#issue-title').append(issue[i].title)
  //   $('#issue-description').append(issue[i].description)
  //   $('#issue-status').append(issue[i].status)
  // }
  let issuesHtml
  issue.forEach(issue => {
    console.log(issue)
    issuesHtml += `
   <h4>${issue.title}</h4>
   <p>Description: ${issue.description}</p>
   <p>Status: ${issue.status}</p>
   `
  })
  $('#issue-title').html(issuesHtml)
}
// issues.

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onShowIssuesSuccess
}
