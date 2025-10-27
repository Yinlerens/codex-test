const categories = [
  { name: '数码电器', description: '手机、电脑、智能设备' },
  { name: '居家生活', description: '家具、装饰、家用电器' },
  { name: '美妆个护', description: '护肤彩妆、个护清洁' },
  { name: '运动户外', description: '运动装备、旅行用品' },
  { name: '母婴亲子', description: '母婴用品、玩具乐器' },
]

const CategoriesPage = () => {
  return (
    <div className="min-h-full px-4 pb-20 pt-4">
      <header className="mb-4">
        <h1 className="text-xl font-semibold text-slate-900">分类导航</h1>
        <p className="text-sm text-slate-500">探索更多商品类别，快速找到你的心头好</p>
      </header>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name} className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{category.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
