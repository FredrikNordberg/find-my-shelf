import products from '../../../data/products_detailed.json';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return <div className="p-10 text-center text-gray-500">Produkten kunde inte hittas.</div>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/" className="text-blue-600 hover:underline text-sm">← Tillbaka</Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Bild */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={`/images/${product.image}`}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain w-full h-auto"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 italic mb-4">Kategori: {product.category}</p>

          <div className="text-sm text-gray-800 space-y-1 mb-6">
            <p><strong>Plats:</strong> {product.aisle}, {product.shelf}</p>
            <p><strong>Kod:</strong> {product.locationCode}</p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

          <h2 className="font-semibold text-gray-800 mb-2">Teknisk specifikation:</h2>
          <table className="w-full text-sm text-left border border-gray-200">
            <tbody>
              {Object.entries(product.specs).map(([key, value]) => (
                <tr key={key} className="border-t">
                  <td className="py-2 px-3 font-medium text-gray-700">{key}</td>
                  <td className="py-2 px-3 text-gray-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}