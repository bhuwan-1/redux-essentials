import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { Link } from 'react-router-dom'
import { fetchPosts, Post, selectPosts, selectPostsError, selectPostsStatus } from './postSlice'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from '@/components/TimeAgo'
import React, { useEffect } from 'react'
import { PostAuthor } from './PostAuthor'
import { Spinner } from '@/components/Spinner'

interface PostExcerptProps {
  post: Post
}

function PostExcerpt({ post }: PostExcerptProps) {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectPosts)
  const postStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') dispatch(fetchPosts())
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'completed') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostExcerpt post={post} key={post.id} />)
  } else if (postStatus === 'failed') {
    content = <div>{postsError}</div>
  }
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
