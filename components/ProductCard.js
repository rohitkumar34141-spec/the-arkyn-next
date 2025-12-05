// components/ProductCard.js
import React from "react";

export default function ProductCard({ product }) {
  // choose the best image available
  const imageSrc =
    // support products that have an images array
    (product?.images && product.images.length > 0 && product.images[0]) ||
    // support products that use a single image_url field
    product?.image_url ||
    // fallback placeholder
    "/images/p1.jpg";

  const title = product?.name || product?.title || "Product";

  return (
    <a className="block group" href={`/products/${product?.slug || ""}`}>
      <img
        src={imageSrc}
        className="w-full h-44 object-cover rounded-md"
        alt={title}
      />
      <div className="mt-2">
        <h3 className="font-medium">{title}</h3>
        {typeof product?.price !== "undefined" && (
          <p className="text-sm mt-1">₹{(product.price / 100).toFixed(2)}</p>
        )}
      </div>
    </a>
  );
}
