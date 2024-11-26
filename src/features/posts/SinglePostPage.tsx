import { useAppSelector } from '@/app/hooks'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postSlice'
import { ReactionButtons } from './ReactionButtons'
import { selectCurrentUsername } from '../auth/authSlice'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, postId!))
  const currentUsername = useAppSelector(selectCurrentUsername)!

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit = currentUsername === post.user

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editpost/${post.id}`}>Edit</Link>
      </article>
      <ReactionButtons post={post} />
      {canEdit && <Link to={`/editPost/${post.id}`}>Edit Post</Link>}
    </section>
  )
}