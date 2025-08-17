'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import productsData from '../data/products_detailed.json';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState([]);

  const categories = [
    'Elverktyg',
    'Handverktyg',
    'Byggmaterial',
    'Färg',
    'Trädgård',
    'VVS',
    'Belysning',
    'Vitvaror',
    'Kök',
    'Kakel & Klinker'
  ];

  const popularProducts = productsData.slice(0, 6);

  useEffect(() => {
    const filtered = productsData.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setResults(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900">FindMyShelf</h1>
          <span className="text-sm text-gray-500">Demo för butiker</span>
        </div>

        {/* Kategorirad */}
        <nav className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className={`w-full px-3 py-2 rounded-md text-sm font-medium text-center transition
                  ${selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-900 border border-gray-400 hover:bg-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Sökfält */}
      <section className="max-w-4xl mx-auto px-4 mb-8">
        <input
          type="text"
          placeholder="Sök efter en produkt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 text-gray-900 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-500"
        />
      </section>

      {/* Produktvisning */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        {searchTerm === '' && !selectedCategory ? (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Populärt just nu:</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-500">Inga produkter hittades.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// 🔗 Produktkort med klickbar länk
function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <div className="flex flex-col bg-white border-l-4 border-gray-900 rounded-lg shadow hover:shadow-xl transition p-4 h-full">
        <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mb-3">
          <img
            src={`/images/${product.image || 'placeholder.jpg'}`}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-1 justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
          <p className="text-sm text-gray-500 italic">{product.category}</p>
          <div className="mt-2 text-gray-800 text-sm">
            <p><strong>Plats:</strong> {product.aisle}, {product.shelf}</p>
            <p><strong>Kod:</strong> {product.locationCode}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}








