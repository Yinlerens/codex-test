import { useCallback, useEffect, useState } from 'react'

import type { Product } from './types'

const mockProducts: Product[] = [
  {
    id: '1',
    name: '无线降噪蓝牙耳机 Pro Max',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1518444028785-8e334a0b24e6?auto=format&fit=crop&w=800&q=80',
    description: '支持主动降噪与通透模式，全天候续航',
    tags: ['耳机', '音频'],
  },
  {
    id: '2',
    name: '轻薄便携触控笔记本 13"',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'OLED 全面屏，支持触控与多场景办公',
    tags: ['电脑'],
  },
  {
    id: '3',
    name: '城市通勤电动折叠车',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    description: '轻量车身，智能仪表盘，适合城市骑行',
    tags: ['出行'],
  },
  {
    id: '4',
    name: '多功能破壁料理机',
    price: 469,
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&q=80',
    description: '冷热双模式，八叶刀头，营养一键释放',
    tags: ['厨房'],
  },
  {
    id: '5',
    name: '智能家用投影仪 4K HDR',
    price: 3899,
    image: 'https://images.unsplash.com/photo-1526178610421-1e9f1c79af3f?auto=format&fit=crop&w=800&q=80',
    description: '4K 超清画质，AI 自动校正，内置音响',
    tags: ['家居'],
  },
  {
    id: '6',
    name: '北欧风格实木懒人沙发',
    price: 1688,
    image: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?auto=format&fit=crop&w=800&q=80',
    description: '人体工学设计，亲肤面料，可拆洗',
    tags: ['家具'],
  },
  {
    id: '7',
    name: '户外保温咖啡杯 500ml',
    price: 168,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    description: '12 小时保温，防漏杯盖，随行必备',
    tags: ['生活'],
  },
  {
    id: '8',
    name: '专业级无反光学相机',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    description: '全像素对焦，适合旅行与街拍',
    tags: ['摄影'],
  },
]

export interface UseProductsResult {
  products: Product[]
  isLoading: boolean
  error: Error | null
  refresh: () => Promise<void>
}

const fetchProducts = async (): Promise<Product[]> => {
  // 未来可以在这里切换为真实接口请求
  return Promise.resolve(mockProducts)
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return {
    products,
    isLoading,
    error,
    refresh: load,
  }
}
