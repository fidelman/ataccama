import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchAllUsers,
  getUsersSelector,
  isErrorSelector,
  isLoadedSelector
} from '../../ducks/users'
import Error from '../common/Error'
import Loader from '../common/Loader'
import UsersTable from '../users/UsersTable'

function UsersPage({ isError, isLoaded, users, fetchAllUsers }) {
  useEffect(() => {
    fetchAllUsers()
  }, [])

  if (isError) return <Error />
  if (!isLoaded) return <Loader />

  return <UsersTable data={users} />
}

UsersPage.propTypes = {
  isError: PropTypes.object,
  isLoaded: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllUsers: PropTypes.func.isRequired
}

export default connect(
  (state) => ({
    users: getUsersSelector(state),
    isError: isErrorSelector(state),
    isLoaded: isLoadedSelector(state)
  }),
  { fetchAllUsers }
)(UsersPage)
