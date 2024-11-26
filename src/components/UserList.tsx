import { useAppSelector } from '@/app/hooks'
import { selectUsers } from '@/features/users/userSlice'
import React from 'react'
import { Link } from 'react-router-dom'

export const UserList = () => {
  const users = useAppSelector(selectUsers)

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))
  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  )
}
