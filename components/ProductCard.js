import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <div className="card p-3">
      <Link href={`/products/${product.slug}`} legacyBehavior>
        <a>
          <img
            src={product.images[0]}
            className="w-full h-44 object-cover rounded-md"
            alt={product.title}
          />

          <h3 className="mt-3 text-base font-medium">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.tags.join(" • ")}</p>
        </a>
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full">
          {product.in_stock ? "In stock" : "Coming Soon"}
        </span>

        <Link href={`/products/${product.slug}`} legacyBehavior>
          <a className="px-3 py-2 bg-arkyn-500 text-white rounded-md text-sm">
            View
          </a>
        </Link>
      </div>
    </div>
  )
}
