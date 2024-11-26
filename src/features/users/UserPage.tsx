import { useAppSelector } from '@/app/hooks'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from './userSlice'
import { selectPostByUser } from '../posts/postSlice'

export const UserPage = () => {
  const { userId } = useParams()

  const user = useAppSelector((state) => selectUserById(state, userId!))

  const postsForUser = useAppSelector((state) => selectPostByUser(state, userId!))

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    )
  }

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
