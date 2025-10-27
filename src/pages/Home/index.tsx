import { Button, DotLoading, ErrorBlock } from 'antd-mobile'
import { ReloadOutlined } from '@ant-design/icons'
import { useMemo } from 'react'

import { useCart } from '../../state/cart/CartContext'
import { useProducts } from './useProducts'
import type { Product } from './types'

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => {
  return (
    <article className="mb-4 break-inside-avoid rounded-2xl bg-white shadow-card">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-500">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">¥{product.price.toFixed(2)}</span>
          <Button color="primary" size="mini" onClick={() => onAddToCart(product)}>
            加入购物车
          </Button>
        </div>
      </div>
    </article>
  )
}

const HomePage = () => {
  const { products, isLoading, error, refresh } = useProducts()
  const { addItem } = useCart()

  const columnsClass = useMemo(() => 'columns-1 gap-4 sm:columns-2', [])

  return (
    <div className="min-h-full px-4 pb-20 pt-4">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">热卖商品</h1>
          <p className="text-sm text-slate-500">精选新品，每日更新</p>
        </div>
        <Button fill="outline" size="mini" onClick={() => refresh()} icon={<ReloadOutlined />}>
          刷新
        </Button>
      </header>

      {isLoading && (
        <div className="flex items-center justify-center py-10 text-slate-500">
          <DotLoading color="var(--adm-color-primary)" />
          <span className="ml-2 text-sm">商品加载中…</span>
        </div>
      )}

      {error && !isLoading && (
        <ErrorBlock
          status="default"
          description="稍后再试或点击刷新"
          title="商品加载失败"
          style={{ background: 'transparent' }}
        />
      )}

      {!isLoading && !error && (
        <div className={columnsClass}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addItem} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
