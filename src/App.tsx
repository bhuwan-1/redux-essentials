import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostsList } from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { LoginPage } from './features/auth/LoginPage'
import { useAppSelector } from './app/hooks'
import { selectCurrentUsername } from './features/auth/authSlice'
import { UserList } from './components/UserList'
import { UserPage } from './features/users/UserPage'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route
                    path="/posts"
                    element={
                      <>
                        <AddPostForm />
                        <PostsList />
                      </>
                    }
                  ></Route>
                  <Route path="/posts/:postId" element={<SinglePostPage />}></Route>
                  <Route path="/editpost/:postId" element={<EditPostForm />}></Route>
                  <Route path="/users" element={<UserList />}></Route>
                  <Route path="/users/:userId" element={<UserPage />}></Route>
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
