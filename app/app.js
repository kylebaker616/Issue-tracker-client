// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#sign-out').hide()
  $('#sign-up').hide()
  $('.no-account').on('click', authEvents.onCreateAccount)
  $('#show-issues').hide()
  $('#show-issues').on('click', authEvents.onShowIssues)
})
