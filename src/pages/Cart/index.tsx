import { Button, Empty, List, Space, Tag } from 'antd-mobile'
import { DeleteOutlined } from '@ant-design/icons'

import { useCart } from '../../state/cart/CartContext'

const CartPage = () => {
  const { items, totalItems, clear } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-4 pb-20 pt-4">
        <Empty description="购物车还是空的，去逛逛吧" />
      </div>
    )
  }

  const totalAmount = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <div className="min-h-full px-4 pb-20 pt-4">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">购物车</h1>
          <p className="text-sm text-slate-500">共 {totalItems} 件商品</p>
        </div>
        <Button size="mini" color="danger" fill="outline" onClick={clear} icon={<DeleteOutlined />}>
          清空
        </Button>
      </header>

      <List className="rounded-2xl bg-white shadow-sm">
        {items.map(({ product, quantity }) => (
          <List.Item key={product.id} extra={<span className="font-semibold text-slate-900">¥{product.price.toFixed(2)}</span>}>
            <Space direction="vertical" block>
              <span className="text-base font-medium text-slate-900">{product.name}</span>
              <Space align="center">
                <Tag color="primary">数量 × {quantity}</Tag>
                {product.tags?.slice(0, 2).map((tag) => (
                  <Tag key={tag} color="default">
                    {tag}
                  </Tag>
                ))}
              </Space>
            </Space>
          </List.Item>
        ))}
      </List>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
        <div>
          <p className="text-sm text-slate-500">预计合计</p>
          <p className="text-2xl font-bold text-primary">¥{totalAmount.toFixed(2)}</p>
        </div>
        <Button color="primary" className="px-6" size="middle">
          去结算
        </Button>
      </div>
    </div>
  )
}

export default CartPage
