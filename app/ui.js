'use strict'
const store = require('./store')

// may remove LATER
const getFormFields = require('../lib/get-form-fields')
const api = require('./api')

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
  $('#message').delay(3000).hide(500)
  store.token = response.user.token
  $('#sign-in').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out').show()
  $('#sign-in-title').hide()
  $('#sign-up-title').hide()
  $('.status').show()
  $('#show-issues').show()
  $('#new-issue-div').show()
  $('#new-issue-header').show()
  $('#change-password').show()
  $('#create-issue-button').show()

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
  $('#update-issue-div').hide()
  $('#new-issue-div').hide()
  $('#show-issues').hide()
  $('.issue').hide()
  $('#create-issue-button').hide()

  // $('.status').delay(5000).fadeOut(500)
}

const onSignOutFailure = function (response) {
  console.log('in catch')
  $('#message').text('Sign Out Failed')
}

const onChangePasswordSuccess = function (response) {
  $('#change-pw-message').text('Password changed, please sign in using your new password')
  $('#change-pw-message').delay(5000).hide(500)
  $('#change-password-form').hide()
  $('#change-password').hide()
  api.signOut()
    .then(onSignOutSuccess)
}

const onShowIssuesSuccess = function (response) {
  // console.log(issue.issues[0].title)
  $('#new-issue-div').hide()
  $('#update-issue-div').hide()
  $('#create-issue-button').show()
  $('#show-issues').hide()
  $('#get-issue-title').hide()
  console.log(response.issues)
  const issue = response.issues
  issue.forEach(issue => {
    store.id = issue._id
    console.log(store.id)
  })

  let issuesHtml = ''
  issue.forEach(issue => {
    issuesHtml += `<h4 class="issue">Title: ${issue.title}</h4>
   <p class="issue">Description: ${issue.description}</p>
   <p class="issue">Status: ${issue.status}</p>
   <p class="issue">ID: ${issue._id}</p>
   <button class="update-issue issue" data-id=${issue._id} data-title=${issue.title}>Update</button>
   <button class="delete-issue issue" data-id=${issue._id} data-title=${issue.title}>Delete</button>
   <hr class="issue">
   `
  })
  $('#issue-title').html(issuesHtml)

  // //  bugs.forEach(bug => {
  //   console.log(bug)
  //   bugsHtml += `
  //     <h4>Name: ${bug.name}</h4>
  //     <p>Age: ${bug.age}</p>
  //     <p>Favorite Error Code: ${bug.favErrorCode}</p>
  //     <p>Bug Id: ${bug._id}</p>
  //     <button class='dynamic-delete-bug' data-id=${bug._id}>Delete</button>
  //   `
  // })

  $('.update-issue').on('click', function (event) {
    $('#update-issue-div').show()
    $('#show-issues').show()
    $('#get-issue-title').show()
    console.log('hello')
    $('#update-issue').show()
    console.log($(event.target).data('id'))
    store.id = $(event.target).data('id')
    console.log(store.id)
    api.getIssue(store.id)
      .then((response) => {
        return response
      })
      .then(onGetIssueSuccess)
      .then(() => $('.issue').hide())

    // const title = $(event.target).data('title')
  })
  $('.delete-issue').on('click', function (event) {
    store.id = $(event.target).data('id')
    api.deleteIssue()
      .then(onDeleteIssueSuccess)
      .catch(onDeleteIssueFailure)
  })
}

const onNewIssueSuccess = function (response) {
  console.log(response)
  store.id = response.issue._id
  $('#message').text('Issue Created')
  api.getIssue()
    .then(onGetIssueSuccess)
    .then(() => {
      $('#new-issue-div').hide()
      $('#show-issues').show()
    })
}

const onNewIssueFailure = function () {
  $('#message').text('Sorry, there was a problem creating the issue.')
}

const onUpdateIssueSuccess = function () {
  $('#message').text('issue has been updated')
  api.getIssue()
    .then(onGetIssueSuccess)
    .then(() => {
      $('#update-issue-div').hide()
      $('#show-issues').show()
    })
}

const onUpdateIssueFailure = function () {
  $('#message').text('Failed to update issue')
}

const onDeleteIssueSuccess = function () {
  $('#message').text('Issue has been deleted')
  api.showIssues()
    .then(onShowIssuesSuccess)
}

const onDeleteIssueFailure = function () {
  $('#message').text('You are not authorized to delete this issue')
  $('#message').show()
}

const onGetIssueSuccess = function (response) {
  console.log(response.issue)
  const issue = response.issue
  $('#get-issue-title').html(`<h4 class="issue1">Title: ${issue.title}</h4>
   <p class="issue1">Description: ${issue.description}</p>
   <p class="issue1">Status: ${issue.status}</p>
   <p class="issue1">ID: ${issue._id}</p>
   <button class="delete-issue issue1" data-id=${issue._id} data-title=${issue.title}>Delete</button>
   <hr class="issue1">
   `)
  $('.delete-issue').on('click', function (event) {
    store.id = $(event.target).data('id')
    api.deleteIssue()
      .then(onDeleteIssueSuccess)
      .catch(onDeleteIssueFailure)
  })
}
module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  // onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onShowIssuesSuccess,
  onNewIssueSuccess,
  onNewIssueFailure,
  onUpdateIssueSuccess,
  onUpdateIssueFailure,
  onDeleteIssueSuccess,
  onDeleteIssueFailure
}
