import { Avatar, Button, Divider, List } from 'antd-mobile'
import { UserOutlined } from '@ant-design/icons'

const ProfilePage = () => {
  return (
    <div className="min-h-full px-4 pb-20 pt-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar icon={<UserOutlined />} size={56} style={{ '--adm-color-light': '#e0edff' }} />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">欢迎回来</h1>
            <p className="text-sm text-slate-500">登录后可同步订单、积分与优惠券</p>
          </div>
        </div>
        <Button color="primary" className="mt-4 w-full">
          立即登录 / 注册
        </Button>
      </div>

      <Divider style={{ borderColor: 'transparent' }} />

      <List header="快捷入口" className="rounded-2xl bg-white shadow-sm">
        <List.Item>我的订单</List.Item>
        <List.Item>优惠券</List.Item>
        <List.Item>地址管理</List.Item>
        <List.Item>帮助与客服</List.Item>
      </List>
    </div>
  )
}

export default ProfilePage
