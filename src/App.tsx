import { HomeOutlined, AppstoreOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { TabBar } from 'antd-mobile'
import { type ReactNode, useMemo } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import CartPage from './pages/Cart'
import CategoriesPage from './pages/Categories'
import HomePage from './pages/Home'
import ProfilePage from './pages/Profile'

interface TabItem {
  key: string
  title: string
  icon: ReactNode
}

const tabs: TabItem[] = [
  {
    key: '/',
    title: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '/categories',
    title: '分类',
    icon: <AppstoreOutlined />,
  },
  {
    key: '/cart',
    title: '购物车',
    icon: <ShoppingCartOutlined />,
  },
  {
    key: '/profile',
    title: '我的',
    icon: <UserOutlined />,
  },
]

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const activeKey = useMemo(() => {
    const matched = tabs.find((tab) => (tab.key === '/' ? location.pathname === '/' : location.pathname.startsWith(tab.key)))
    return matched ? matched.key : '/'
  }, [location.pathname])

  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <nav className="sticky bottom-0 left-0 right-0 border-t border-slate-200 bg-white">
        <TabBar activeKey={activeKey} onChange={(value) => navigate(value)}>
          {tabs.map((tab) => (
            <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} />
          ))}
        </TabBar>
      </nav>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
