import { type ChangeEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useGetCatalog, getGetCatalogQueryKey } from '@workspace/api-client-react';
import type { CatalogProduct } from '@workspace/api-client-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, ChevronRight, Copy, Check, Heart, Instagram, Menu, Search, Share2, ShieldCheck, ShoppingBag, Sparkles, Truck, X } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { PredictiveSearchBox, type SuggestProduct, type SuggestCollection } from '@/components/predictive-search';
import { ErrorBoundary } from '@/components/error-boundary';
import { AboutPage } from '@/pages/about';
import { FaqPage } from '@/pages/faq';
import { BlogPage } from '@/pages/blog';
import { getCategoryMeta, formatProductPageTitle } from '@/data/categories';

const queryClient = new QueryClient();

const navCollections = [
  { label: 'New designs', slug: 'new-designs' },
  { label: 'Best sellers', slug: 'best-sellers' },
  { label: 'Aesthetic', slug: 'aesthetic-collection' },
  { label: 'Cars & bikes', slug: 'cars-bikes-collection' },
  { label: 'Arts & scenery', slug: 'art-collection' },
  { label: 'Astrology', slug: 'zodiac-sign' },
  { label: 'Sports', slug: 'sports-collection' },
  { label: "Men's collection", slug: 'mens-collection' },
  { label: "Women's collection", slug: 'girls-collection' },
  { label: 'Cats collection', slug: 'cats-collection' },
  { label: 'Evil eye collection', slug: 'evil-eye-nazar' },
];

function ProductCard({ product, index, onOpen }: { product: CatalogProduct; index: number; onOpen: (product: CatalogProduct) => void }) {
  const [saved, setSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const productUrl = `${window.location.origin}/products/${encodeURIComponent(product.id || product.title)}`;
    const shareData = {
      title: product.title,
      text: `Check out this unique ${product.title} phone case on Framecase for just ${product.price}!`,
      url: productUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(productUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <article className="product-card" style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}>
      <button type="button" className="product-image-wrap" onClick={() => onOpen(product)} aria-label={`View details for ${product.title}`}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} className="product-image" loading={index > 5 ? 'lazy' : 'eager'} />
        ) : (
          <div className="image-fallback"><Sparkles size={24} /><span>Framecase</span></div>
        )}
        <span className="product-badge">{product.isFeatured ? 'Featured' : product.collectionName}</span>
        <span className="image-link"><ChevronRight size={16} /></span>
      </button>
      <div className="product-info">
        <div className="product-copy">
          <p className="product-collection">{product.collectionName}</p>
          <div className="product-title-row">
            <h3 title={product.title}>{product.title}</h3>
            <button
              type="button"
              className="product-card-share-action"
              onClick={handleShare}
              aria-label={`Share ${product.title}`}
              title={copiedShare ? 'Link copied!' : 'Share product direct link'}
            >
              {copiedShare ? (
                <>
                  <Check size={13} className="text-green-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Share2 size={13} />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="price-row">
            <strong>{product.price}</strong>
            {product.compareAtPrice && <span>{product.compareAtPrice}</span>}
          </div>
        </div>
        <button
          type="button"
          className={`save-button ${saved ? 'saved' : ''}`}
          aria-label={saved ? `Remove ${product.title} from saved items` : `Save ${product.title}`}
          onClick={() => setSaved((value) => !value)}
        >
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </article>
  );
}

const phoneModels: Record<string, string[]> = {
  Apple: [
    'iPhone 7', 'iPhone 7 Plus', 'iPhone 8', 'iPhone 8 Plus', 'iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS Max',
    'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max', 'iPhone SE (2nd generation)', 'iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
    'iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone SE (3rd generation)', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
    'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 16e', 'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
    'iPhone 17', 'iPhone 17 Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max',
  ],
  Samsung: [
    'Galaxy S7', 'Galaxy S7 Edge', 'Galaxy S8', 'Galaxy S8+', 'Galaxy S9', 'Galaxy S9+', 'Galaxy S10e', 'Galaxy S10', 'Galaxy S10+', 'Galaxy S10 5G',
    'Galaxy S20', 'Galaxy S20+', 'Galaxy S20 Ultra', 'Galaxy S20 FE', 'Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra', 'Galaxy S21 FE',
    'Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra', 'Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra', 'Galaxy S23 FE',
    'Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra', 'Galaxy S24 FE', 'Galaxy S25', 'Galaxy S25+', 'Galaxy S25 Ultra', 'Galaxy S25 Edge', 'Galaxy S25 FE',
    'Galaxy S26', 'Galaxy S26+', 'Galaxy S26 Ultra', 'Galaxy Note 8', 'Galaxy Note 9', 'Galaxy Note 10', 'Galaxy Note 10+', 'Galaxy Note 20', 'Galaxy Note 20 Ultra',
    'Galaxy A10', 'Galaxy A20', 'Galaxy A30', 'Galaxy A40', 'Galaxy A50', 'Galaxy A51', 'Galaxy A52', 'Galaxy A52s', 'Galaxy A53', 'Galaxy A54', 'Galaxy A55', 'Galaxy A56',
    'Galaxy A70', 'Galaxy A71', 'Galaxy A72', 'Galaxy A73', 'Galaxy A14', 'Galaxy A15', 'Galaxy A16', 'Galaxy A24', 'Galaxy A25', 'Galaxy A34', 'Galaxy A35',
    'Galaxy M12', 'Galaxy M21', 'Galaxy M31', 'Galaxy M32', 'Galaxy M33', 'Galaxy M34', 'Galaxy M51', 'Galaxy M52', 'Galaxy M53', 'Galaxy M54', 'Galaxy M55',
    'Galaxy Z Flip 3', 'Galaxy Z Flip 4', 'Galaxy Z Flip 5', 'Galaxy Z Flip 6', 'Galaxy Z Fold 3', 'Galaxy Z Fold 4', 'Galaxy Z Fold 5', 'Galaxy Z Fold 6',
  ],
  OnePlus: [
    'OnePlus 3', 'OnePlus 3T', 'OnePlus 5', 'OnePlus 5T', 'OnePlus 6', 'OnePlus 6T', 'OnePlus 7', 'OnePlus 7 Pro', 'OnePlus 7T', 'OnePlus 7T Pro',
    'OnePlus 8', 'OnePlus 8 Pro', 'OnePlus 8T', 'OnePlus 9', 'OnePlus 9 Pro', 'OnePlus 9R', 'OnePlus 9RT', 'OnePlus 10 Pro', 'OnePlus 10R', 'OnePlus 10T',
    'OnePlus 11', 'OnePlus 11R', 'OnePlus 12', 'OnePlus 12R', 'OnePlus 13', 'OnePlus 13R', 'OnePlus 13s', 'OnePlus 14',
    'OnePlus Nord', 'OnePlus Nord 2', 'OnePlus Nord 2T', 'OnePlus Nord 3', 'OnePlus Nord 4', 'OnePlus Nord 5', 'OnePlus Nord CE', 'OnePlus Nord CE 2', 'OnePlus Nord CE 3', 'OnePlus Nord CE 4', 'OnePlus Nord CE 5', 'OnePlus Nord N10', 'OnePlus Nord N20', 'OnePlus Nord N30',
  ],
  Google: [
    'Pixel 3', 'Pixel 3 XL', 'Pixel 3a', 'Pixel 3a XL', 'Pixel 4', 'Pixel 4 XL', 'Pixel 4a', 'Pixel 4a 5G', 'Pixel 5', 'Pixel 5a',
    'Pixel 6', 'Pixel 6 Pro', 'Pixel 6a', 'Pixel 7', 'Pixel 7 Pro', 'Pixel 7a', 'Pixel 8', 'Pixel 8 Pro', 'Pixel 8a', 'Pixel 9', 'Pixel 9 Pro', 'Pixel 9 Pro XL', 'Pixel 9a',
  ],
  Xiaomi: [
    'Mi 8', 'Mi 9', 'Mi 10', 'Mi 10T', 'Mi 11', 'Mi 11X', 'Mi 11 Ultra', 'Xiaomi 12', 'Xiaomi 12 Pro', 'Xiaomi 12T', 'Xiaomi 13', 'Xiaomi 13 Pro', 'Xiaomi 13T', 'Xiaomi 14', 'Xiaomi 14 Civi', 'Xiaomi 14 Ultra', 'Xiaomi 15', 'Xiaomi 15 Ultra',
    'Redmi 7', 'Redmi 8', 'Redmi 9', 'Redmi 10', 'Redmi 11 Prime', 'Redmi 12', 'Redmi 13', 'Redmi Note 7', 'Redmi Note 8', 'Redmi Note 9', 'Redmi Note 10', 'Redmi Note 11', 'Redmi Note 12', 'Redmi Note 13', 'Redmi Note 14', 'Redmi Note 15',
    'Redmi Note 10 Pro', 'Redmi Note 11 Pro', 'Redmi Note 12 Pro', 'Redmi Note 13 Pro', 'Redmi Note 14 Pro', 'Redmi Note 14 Pro+',
    'Poco X2', 'Poco X3', 'Poco X3 Pro', 'Poco X4 Pro', 'Poco X5', 'Poco X5 Pro', 'Poco X6', 'Poco X6 Pro', 'Poco X7', 'Poco X7 Pro', 'Poco F3', 'Poco F4', 'Poco F5', 'Poco F6', 'Poco F7', 'Poco M2', 'Poco M3', 'Poco M4 Pro', 'Poco M5', 'Poco M6 Pro',
  ],
  Vivo: [
    'Vivo V5', 'Vivo V7', 'Vivo V9', 'Vivo V11', 'Vivo V15', 'Vivo V17', 'Vivo V19', 'Vivo V20', 'Vivo V21', 'Vivo V23', 'Vivo V25', 'Vivo V27', 'Vivo V29', 'Vivo V30', 'Vivo V40', 'Vivo V50',
    'Vivo X50', 'Vivo X60', 'Vivo X70', 'Vivo X80', 'Vivo X90', 'Vivo X100', 'Vivo X200', 'Vivo Y12', 'Vivo Y15', 'Vivo Y19', 'Vivo Y20', 'Vivo Y21', 'Vivo Y22', 'Vivo Y27', 'Vivo Y28', 'Vivo Y36', 'Vivo Y100', 'Vivo Y200',
  ],
  Oppo: [
    'Oppo F5', 'Oppo F7', 'Oppo F9', 'Oppo F11', 'Oppo F15', 'Oppo F17', 'Oppo F19', 'Oppo F21 Pro', 'Oppo F23', 'Oppo F25', 'Oppo F27',
    'Oppo Reno 2', 'Oppo Reno 3', 'Oppo Reno 4', 'Oppo Reno 5', 'Oppo Reno 6', 'Oppo Reno 7', 'Oppo Reno 8', 'Oppo Reno 9', 'Oppo Reno 10', 'Oppo Reno 11', 'Oppo Reno 12', 'Oppo Reno 13', 'Oppo Reno 14',
    'Oppo A5', 'Oppo A9', 'Oppo A12', 'Oppo A15', 'Oppo A16', 'Oppo A17', 'Oppo A31', 'Oppo A53', 'Oppo A54', 'Oppo A55', 'Oppo A57', 'Oppo A58', 'Oppo A59', 'Oppo A74', 'Oppo A76', 'Oppo A77', 'Oppo A78', 'Oppo A79', 'Oppo A96', 'Oppo A98', 'Oppo Find X2', 'Oppo Find X3', 'Oppo Find X5', 'Oppo Find X6', 'Oppo Find X7',
  ],
  Realme: [
    'Realme 1', 'Realme 2', 'Realme 3', 'Realme 5', 'Realme 6', 'Realme 7', 'Realme 8', 'Realme 9', 'Realme 10', 'Realme 11', 'Realme 12', 'Realme 13', 'Realme 14',
    'Realme C1', 'Realme C2', 'Realme C3', 'Realme C11', 'Realme C12', 'Realme C15', 'Realme C20', 'Realme C21', 'Realme C25', 'Realme C31', 'Realme C33', 'Realme C35', 'Realme C53', 'Realme C55', 'Realme C67', 'Realme C75',
    'Realme X', 'Realme X2', 'Realme X50', 'Realme GT', 'Realme GT Neo 2', 'Realme GT 2', 'Realme GT 3', 'Realme GT 5', 'Realme GT 6', 'Realme Narzo 10', 'Realme Narzo 20', 'Realme Narzo 30', 'Realme Narzo 50', 'Realme Narzo 60', 'Realme Narzo 70', 'Realme Narzo 80', 'Realme 12 Pro', 'Realme 13 Pro',
  ],
  Motorola: [
    'Moto G5', 'Moto G6', 'Moto G7', 'Moto G8', 'Moto G9', 'Moto G10', 'Moto G20', 'Moto G30', 'Moto G31', 'Moto G32', 'Moto G40 Fusion', 'Moto G42', 'Moto G52', 'Moto G53', 'Moto G54', 'Moto G62', 'Moto G72', 'Moto G73', 'Moto G84', 'Moto G85', 'Moto G Power', 'Moto G Stylus',
    'Motorola One', 'Motorola One Fusion', 'Motorola Edge', 'Motorola Edge 20', 'Motorola Edge 30', 'Motorola Edge 40', 'Motorola Edge 50', 'Motorola Edge 60', 'Motorola Razr 40', 'Motorola Razr 50', 'Motorola Razr 60',
  ],
  Nokia: ['Nokia 3', 'Nokia 3.1', 'Nokia 4.2', 'Nokia 5', 'Nokia 5.1', 'Nokia 6', 'Nokia 6.1', 'Nokia 7', 'Nokia 7 Plus', 'Nokia 7.1', 'Nokia 8', 'Nokia 8.1', 'Nokia 9 PureView', 'Nokia C01 Plus', 'Nokia C10', 'Nokia C20', 'Nokia C21', 'Nokia G10', 'Nokia G11', 'Nokia G20', 'Nokia G21', 'Nokia G42', 'Nokia X10', 'Nokia X20', 'Nokia X30'],
  Huawei: ['Huawei P20', 'Huawei P20 Pro', 'Huawei P30', 'Huawei P30 Pro', 'Huawei P40', 'Huawei P40 Pro', 'Huawei Mate 20', 'Huawei Mate 20 Pro', 'Huawei Mate 30', 'Huawei Mate 40', 'Huawei Nova 3', 'Huawei Nova 5', 'Huawei Nova 7', 'Huawei Nova 9', 'Huawei Nova 10', 'Huawei Nova 11', 'Huawei Nova 12'],
  Honor: ['Honor 8X', 'Honor 9X', 'Honor 10 Lite', 'Honor 20', 'Honor 20i', 'Honor 30', 'Honor 50', 'Honor 70', 'Honor 90', 'Honor 100', 'Honor 200', 'Honor X7', 'Honor X8', 'Honor X9', 'Honor X9b', 'Honor X50', 'Honor Magic 4', 'Honor Magic 5', 'Honor Magic 6', 'Honor Magic 7'],
  Asus: ['Zenfone 5', 'Zenfone 6', 'Zenfone 7', 'Zenfone 8', 'Zenfone 9', 'Zenfone 10', 'Zenfone 11 Ultra', 'ROG Phone 3', 'ROG Phone 5', 'ROG Phone 6', 'ROG Phone 7', 'ROG Phone 8', 'ROG Phone 9'],
  Nothing: ['Nothing Phone (1)', 'Nothing Phone (2)', 'Nothing Phone (2a)', 'Nothing Phone (2a) Plus', 'Nothing Phone (3a)', 'Nothing Phone (3)'],
  Sony: ['Xperia 1 II', 'Xperia 1 III', 'Xperia 1 IV', 'Xperia 1 V', 'Xperia 1 VI', 'Xperia 1 VII', 'Xperia 5 II', 'Xperia 5 III', 'Xperia 5 IV', 'Xperia 5 V', 'Xperia 10 II', 'Xperia 10 III', 'Xperia 10 IV', 'Xperia 10 V', 'Xperia 10 VI'],
  LG: ['LG G6', 'LG G7 ThinQ', 'LG G8 ThinQ', 'LG V30', 'LG V40 ThinQ', 'LG V50 ThinQ', 'LG V60 ThinQ', 'LG Velvet', 'LG Wing', 'LG K40', 'LG K50', 'LG K52'],
  Tecno: ['Tecno Camon 11', 'Tecno Camon 12', 'Tecno Camon 15', 'Tecno Camon 16', 'Tecno Camon 17', 'Tecno Camon 18', 'Tecno Camon 19', 'Tecno Camon 20', 'Tecno Camon 30', 'Tecno Camon 40', 'Tecno Spark 6', 'Tecno Spark 7', 'Tecno Spark 8', 'Tecno Spark 9', 'Tecno Spark 10', 'Tecno Spark 20', 'Tecno Spark 30'],
  Infinix: ['Infinix Hot 8', 'Infinix Hot 9', 'Infinix Hot 10', 'Infinix Hot 11', 'Infinix Hot 12', 'Infinix Hot 20', 'Infinix Hot 30', 'Infinix Hot 40', 'Infinix Hot 50', 'Infinix Note 7', 'Infinix Note 8', 'Infinix Note 10', 'Infinix Note 11', 'Infinix Note 12', 'Infinix Note 30', 'Infinix Note 40', 'Infinix Zero 8', 'Infinix Zero 20', 'Infinix Zero 30'],
  iQOO: ['iQOO 3', 'iQOO 7', 'iQOO 9', 'iQOO 9 Pro', 'iQOO 10', 'iQOO 11', 'iQOO 12', 'iQOO 13', 'iQOO Neo 6', 'iQOO Neo 7', 'iQOO Neo 8', 'iQOO Neo 9', 'iQOO Neo 10', 'iQOO Z3', 'iQOO Z5', 'iQOO Z6', 'iQOO Z7', 'iQOO Z9', 'iQOO Z10'],
};

type CartItem = {
  id: string;
  product: CatalogProduct;
  brand: string;
  model: string;
};

const phoneBrands = Object.keys(phoneModels);

function getModelsForBrand(brand: string) {
  return phoneModels[brand] ?? [];
}

function ProductPage({ product, onBack, onAddToCart, onBuyNow }: {
  product: CatalogProduct;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
}) {
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [added, setAdded] = useState(false);
  const models = getModelsForBrand(brand);
  const canPurchase = Boolean(brand && model);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [product.id]);

  const filteredBrands = useMemo(() => {
    const q = brandSearch.trim().toLowerCase();
    return q ? phoneBrands.filter((b) => b.toLowerCase().includes(q)) : phoneBrands;
  }, [brandSearch]);

  const filteredModels = useMemo(() => {
    const q = modelSearch.trim().toLowerCase();
    return q ? models.filter((m) => m.toLowerCase().includes(q)) : models;
  }, [models, modelSearch]);

  const createCartItem = () => ({
    id: `${product.id}-${brand}-${model}`,
    product,
    brand,
    model,
  });

  const addCurrentItem = () => {
    onAddToCart(createCartItem());
    setAdded(true);
  };

  const handleSelectBrand = (selectedBrand: string) => {
    setBrand(selectedBrand);
    setModel('');
    setModelSearch('');
    setAdded(false);
  };

  const handleSelectModel = (selectedModel: string) => {
    setModel(selectedModel);
    setAdded(false);
  };

  return (
    <section className="product-page">
      <button type="button" className="back-to-catalog" onClick={onBack}><ChevronRight size={16} className="back-chevron" /> Back to designs</button>
      <div className="product-page-layout">
        <div className="product-page-media">
          {product.imageUrl ? <img src={product.imageUrl} alt={product.title} /> : <div className="image-fallback"><Sparkles size={30} /><span>Framecase</span></div>}
        </div>
        <div className="product-page-details">
          <p className="product-collection">{product.collectionName}</p>
          <div className="product-page-title-row">
            <h1>{product.title}</h1>
            <button
              type="button"
              className="product-detail-share-btn"
              onClick={async () => {
                const productUrl = `${window.location.origin}/products/${encodeURIComponent(product.id || product.title)}`;
                const shareData = {
                  title: product.title,
                  text: `Check out this unique ${product.title} phone case on Framecase for just ${product.price}!`,
                  url: productUrl,
                };
                if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                  try {
                    await navigator.share(shareData);
                    return;
                  } catch {}
                }
                if (navigator.clipboard) {
                  await navigator.clipboard.writeText(productUrl);
                  alert('Product link copied to clipboard! You can now paste and send to friends.');
                }
              }}
              aria-label={`Share ${product.title}`}
              title="Share product direct link to friends"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
          <div className="product-page-price"><strong>{product.price}</strong>{product.compareAtPrice && <span>{product.compareAtPrice}</span>}</div>
          <div className="product-page-description">
            {product.description.split('\n\n').filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="device-picker-onpage">
            <div className="device-picker-heading">
              <p>Choose your phone</p>
              <span>{brand && model ? `${brand} · ${model}` : 'Selection Required'}</span>
            </div>

            <div className="onpage-menu-section">
              <div className="onpage-menu-header">
                <span className="onpage-step-label">1. Select Brand</span>
                <input
                  type="text"
                  placeholder="Filter brand..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="onpage-filter-input"
                  aria-label="Filter phone brand"
                />
              </div>
              <div className="onpage-brand-chips">
                {filteredBrands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`onpage-chip ${brand === b ? 'active' : ''}`}
                    onClick={() => handleSelectBrand(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {brand && (
              <div className="onpage-menu-section">
                <div className="onpage-menu-header">
                  <span className="onpage-step-label">2. Select Model for {brand}</span>
                  <input
                    type="text"
                    placeholder={`Search ${brand} models...`}
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    className="onpage-filter-input"
                    aria-label={`Search ${brand} phone models`}
                  />
                </div>
                <div className="onpage-model-grid">
                  {filteredModels.length === 0 ? (
                    <p className="no-models-text">No models matched "{modelSearch}".</p>
                  ) : (
                    filteredModels.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`onpage-model-btn ${model === m ? 'active' : ''}`}
                        onClick={() => handleSelectModel(m)}
                      >
                        {m}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {!canPurchase && (
            <p className="selection-hint">
              {!brand ? 'Select a brand above to see available models.' : 'Select your model above to continue.'}
            </p>
          )}

          <div className="product-actions">
            <button type="button" className="secondary-button" disabled={!canPurchase} onClick={addCurrentItem}><ShoppingBag size={17} /> {added ? 'Added to bag' : 'Add to cart'}</button>
            <button type="button" className="primary-button" disabled={!canPurchase} onClick={() => onBuyNow(createCartItem())}>Buy now <ArrowUpRight size={17} /></button>
          </div>
          <div className="product-page-material"><ShieldCheck size={18} /><p>Glossy 9H glass back with flexible TPU silicon sides. Slim daily protection; the glass may shatter after a heavy drop.</p></div>
        </div>
      </div>
    </section>
  );
}

function CartPanel({ items, onClose, onRemove, onBuyNow }: { items: CartItem[]; onClose: () => void; onRemove: (id: string) => void; onBuyNow: (items: CartItem[]) => void }) {
  return (
    <div className="cart-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="cart-panel-header"><div><p className="eyebrow">Framecase bag</p><h2 id="cart-title">Your cases</h2></div><button type="button" className="modal-close" aria-label="Close bag" onClick={onClose}><X size={20} /></button></div>
        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={25} />
            <p>Your bag is empty.</p>
            <button type="button" className="secondary-button" onClick={onClose}>Continue browsing</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  {item.product.imageUrl ? <img src={item.product.imageUrl} alt="" /> : <div className="cart-item-fallback"><Sparkles size={16} /></div>}
                  <div>
                    <strong>{item.product.title}</strong>
                    <p>{item.brand} · {item.model}</p>
                    <span>{item.product.price}</span>
                  </div>
                  <button type="button" aria-label={`Remove ${item.product.title}`} onClick={() => onRemove(item.id)}>
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
            <p className="cart-note">Your selected phone brand and model are saved with each case.</p>
            <div className="cart-checkout-box">
              <button
                type="button"
                className="primary-button cart-checkout-button"
                onClick={() => onBuyNow(items)}
              >
                <Instagram size={17} /> Buy now on Instagram ({items.length} {items.length === 1 ? 'case' : 'cases'})
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function CollectionChip({ label, slug, active, onSelect }: { label: string; slug?: string; active: boolean; onSelect: (slug?: string) => void }) {
  return (
    <button type="button" className={`collection-chip ${active ? 'active' : ''}`} onClick={() => onSelect(slug)}>
      {label}
    </button>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllCollections, setShowAllCollections] = useState(false);
  const [activeProduct, setActiveProduct] = useState<CatalogProduct | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderModalMessage, setOrderModalMessage] = useState<string | null>(null);
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [page, setPage] = useState(1);
  // Read initial path for direct endpoint navigation (e.g. /products/:handle, /aesthetic-collection, /about, etc.)
  const getInitialRouting = () => {
    if (typeof window === 'undefined') return { view: 'catalog' as const, slug: undefined, productHandle: undefined };
    const urlParams = new URLSearchParams(window.location.search);
    const queryProduct = urlParams.get('product');

    const pathname = window.location.pathname.replace(/^\/|\/$/g, '');
    if (pathname.startsWith('products/')) {
      const handle = pathname.replace('products/', '');
      return { view: 'catalog' as const, slug: undefined, productHandle: handle };
    }
    if (queryProduct) {
      return { view: 'catalog' as const, slug: undefined, productHandle: queryProduct };
    }
    if (!pathname) return { view: 'catalog' as const, slug: undefined, productHandle: undefined };
    if (pathname === 'about' || pathname === 'faq' || pathname === 'blog') {
      return { view: pathname as 'about' | 'faq' | 'blog', slug: undefined, productHandle: undefined };
    }
    return { view: 'category' as const, slug: pathname, productHandle: undefined };
  };

  const initialRoute = useMemo(() => getInitialRouting(), []);
  const [selectedCollection, setSelectedCollection] = useState<string | undefined>(initialRoute.slug);
  const [currentView, setCurrentView] = useState<'catalog' | 'about' | 'faq' | 'blog' | 'category'>(initialRoute.view);
  const [categoryViewSlug, setCategoryViewSlug] = useState<string | undefined>(initialRoute.slug);
  const scrollPositionRef = useRef<number>(0);
  const initialDataForCollection = useMemo(() => {
    if (typeof window !== 'undefined' && (window as any).__FRAMECASE_INITIAL_DATA__) {
      const data = (window as any).__FRAMECASE_INITIAL_DATA__;
      if (data && data.collection === selectedCollection && data.catalog) {
        return data.catalog;
      }
    }
    return undefined;
  }, [selectedCollection]);

  const params = useMemo(() => ({
    collection: selectedCollection,
    search: search.trim() || undefined,
    limit: 48,
    page,
  }), [selectedCollection, search, page]);
  const catalog = useGetCatalog(params, {
    query: {
      queryKey: getGetCatalogQueryKey(params),
      initialData: initialDataForCollection,
    },
  });
  const newlyLaunchedCatalog = useGetCatalog({
    collection: 'new-arrivalss',
    limit: 20,
    page: 1,
  });
  const newlyLaunchedProducts = (newlyLaunchedCatalog.data?.products ?? []).slice(0, 20);
  const aestheticCatalog = useGetCatalog({
    collection: 'aesthetic-collection',
    limit: 20,
    page: 1,
  });
  const aestheticProducts = (aestheticCatalog.data?.products ?? []).slice(0, 20);
  const rawProducts = catalog.data?.products ?? [];
  // Ensure strict deduplication by product id/handle
  const products = useMemo(() => {
    const seen = new Set<string>();
    return rawProducts.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [rawProducts]);
  const collections = catalog.data?.collections ?? [];
  const visibleCollections = showAllCollections ? collections : collections.slice(0, 12);
  const currentLabel = selectedCollection
    ? collections.find((collection) => collection.slug === selectedCollection)?.name ?? 'Collection'
    : 'All designs';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToView = (view: 'catalog' | 'about' | 'faq' | 'blog', pushHistory = true) => {
    setCurrentView(view);
    setActiveProduct(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (pushHistory) {
      const targetPath = view === 'catalog' ? '/' : `/${view}`;
      window.history.pushState({ view, slug: undefined }, '', targetPath);
    }
  };

  // Only scroll to top when switching between distinct full views (about, faq, blog, category)
  useEffect(() => {
    if (currentView !== 'catalog') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [currentView]);

  // Dynamic SEO Title and Meta Description + Favicon maintenance across SPA views
  useEffect(() => {
    let currentDesc = 'Shop unique design phone cases in India! Attractive, stylish covers for top brands at ₹299. Explore now!';
    if (activeProduct) {
      document.title = formatProductPageTitle(activeProduct.title);
      currentDesc = `${activeProduct.title} phone case for iPhone, Samsung, OnePlus & more. Unique design, shockproof glass finish, all models available at ₹299.`.slice(0, 160);
    } else if (currentView === 'category') {
      const meta = getCategoryMeta(categoryViewSlug, currentLabel);
      document.title = meta.seoTitle;
      currentDesc = meta.metaDescription || meta.description.slice(0, 160);
    } else if (currentView === 'about') {
      document.title = 'About Us — Unique & Attractive Design Phone Cases | Framecase';
      currentDesc = 'Discover Framecase: unique & attractive design phone cases featuring optical glass finish, flexible shockproof TPU borders, and accessible ₹299 pricing.';
    } else if (currentView === 'faq') {
      document.title = 'Frequently Asked Questions (FAQs) — Unique Design Phone Covers | Framecase';
      currentDesc = 'Everything you need to know about Framecase phone cases, supported devices (iPhone, Samsung, OnePlus, Vivo, Oppo, Realme), shipping in India & durability.';
    } else if (currentView === 'blog') {
      document.title = 'Framecase Journal — Unique & Attractive Phone Case Designs';
      currentDesc = 'Read in-depth articles and guides about phone case aesthetics, everyday drop protection, and styling your smartphone carry.';
    } else if (selectedCollection) {
      const meta = getCategoryMeta(selectedCollection, currentLabel);
      document.title = meta.seoTitle;
      currentDesc = meta.metaDescription || meta.description.slice(0, 160);
    } else {
      document.title = 'Framecase - Stylish Unique Design Phone Cases for All';
    }

    let metaDescEl = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (metaDescEl) {
      metaDescEl.content = currentDesc;
    }
    let ogDescEl = document.querySelector<HTMLMetaElement>("meta[property='og:description']");
    if (ogDescEl) {
      ogDescEl.content = currentDesc;
    }
    let twitterDescEl = document.querySelector<HTMLMetaElement>("meta[name='twitter:description']");
    if (twitterDescEl) {
      twitterDescEl.content = currentDesc;
    }

    // Maintain consistent canonical tag and Open Graph URL across client-side navigation
    let currentCanonical = 'https://framecase.in/';
    if (activeProduct) {
      currentCanonical = `https://framecase.in/products/${encodeURIComponent(activeProduct.id || activeProduct.title)}`;
    } else if (currentView === 'category' && categoryViewSlug) {
      currentCanonical = `https://framecase.in/${categoryViewSlug}`;
    } else if (currentView === 'about' || currentView === 'faq' || currentView === 'blog') {
      currentCanonical = `https://framecase.in/${currentView}`;
    }

    let canonicalEl = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = currentCanonical;

    let ogUrlEl = document.querySelector<HTMLMetaElement>("meta[property='og:url']");
    if (ogUrlEl) {
      ogUrlEl.content = currentCanonical;
    }

    // Maintain consistent canonical favicon references across client-side view changes
    const v = 'fc3';
    const favicons = [
      { rel: 'icon', type: 'image/svg+xml', href: `/favicon.svg?v=${v}`, sizes: undefined },
      { rel: 'icon', type: 'image/png', href: `/favicon.png?v=${v}`, sizes: '48x48' },
      { rel: 'shortcut icon', href: `/favicon.ico?v=${v}`, sizes: undefined },
      { rel: 'apple-touch-icon', href: `/apple-touch-icon.png?v=${v}`, sizes: '180x180' }
    ];
    favicons.forEach(({ rel, type, href, sizes }) => {
      const selector = `link[rel='${rel}']` + (type ? `[type='${type}']` : '') + (sizes ? `[sizes='${sizes}']` : '');
      let el = document.querySelector<HTMLLinkElement>(selector);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        if (type) el.type = type;
        if (sizes) el.sizes.value = sizes;
        document.head.appendChild(el);
      }
      if (el.href !== href && !el.href.endsWith(href)) {
        el.href = href;
      }
    });
  }, [currentView, activeProduct, selectedCollection, currentLabel, categoryViewSlug]);

  const openCategoryPage = (slug: string, pushHistory = true) => {
    setCategoryViewSlug(slug);
    setSelectedCollection(slug);
    setSearch('');
    setPage(1);
    setCurrentView('category');
    setActiveProduct(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (pushHistory) {
      window.history.pushState({ view: 'category', slug }, '', `/${slug}`);
    }
  };

  // Listen for browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.replace(/^\/|\/$/g, '');
      if (pathname.startsWith('products/')) {
        const handle = pathname.replace('products/', '').trim().toLowerCase();
        fetch(`/api/products/${encodeURIComponent(handle)}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((productData) => {
            if (productData) {
              openProduct(productData, false);
            }
          })
          .catch(() => {});
        return;
      }

      setActiveProduct(null);
      if (!pathname) {
        setCurrentView('catalog');
        setSelectedCollection(undefined);
      } else if (pathname === 'about' || pathname === 'faq' || pathname === 'blog') {
        setCurrentView(pathname);
      } else {
        setCategoryViewSlug(pathname);
        setSelectedCollection(pathname);
        setCurrentView('category');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const selectCollection = (slug?: string) => {
    setCurrentView('catalog');
    setActiveProduct(null);
    setSelectedCollection(slug);
    setPage(1);
    setMobileMenuOpen(false);
    // Smooth scroll directly to catalog without resetting page to full top
    window.requestAnimationFrame(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    window.setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const openProduct = (product: CatalogProduct, pushHistory = true) => {
    scrollPositionRef.current = window.scrollY;
    setActiveProduct(product);
    setCartOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (pushHistory) {
      const productPath = `/products/${encodeURIComponent(product.id || product.title)}`;
      window.history.pushState({ view: 'product', productId: product.id }, '', productPath);
    }
  };

  const handleBackToCatalog = () => {
    setActiveProduct(null);
    const returnPath = currentView === 'category' && categoryViewSlug ? `/${categoryViewSlug}` : '/';
    window.history.pushState({ view: currentView, slug: categoryViewSlug }, '', returnPath);
    const targetY = scrollPositionRef.current;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
    });
  };

  // Auto-open product page if visited via direct link (e.g. /products/:handle or ?product=...)
  useEffect(() => {
    if (initialRoute.productHandle) {
      const cleanHandle = initialRoute.productHandle.trim().toLowerCase();
      fetch(`/api/products/${encodeURIComponent(cleanHandle)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((productData) => {
          if (productData) {
            openProduct(productData, false);
          }
        })
        .catch(() => {});
    }
  }, [initialRoute.productHandle]);

  const handleSelectSuggestedProduct = async (p: SuggestProduct) => {
    // 1. If it's already in the catalog list, open directly
    const existing = products.find((item) => item.id === p.handle || item.title.toLowerCase() === p.title.toLowerCase());
    if (existing) {
      openProduct(existing);
      return;
    }

    // 2. Fetch full product details from backend
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(p.handle)}`);
      if (res.ok) {
        const fullProduct = (await res.json()) as CatalogProduct;
        openProduct(fullProduct);
        return;
      }
    } catch {
      // ignore network errors and fallback
    }

    // 3. Fallback: synthesize a CatalogProduct from the suggestion info
    const fallbackProduct: CatalogProduct = {
      id: p.handle,
      title: p.title,
      description: 'A polished glass case with a glossy finish and protective silicon sides.',
      imageUrl: p.imageUrl ?? null,
      price: '₹299',
      compareAtPrice: p.compareAtPrice ?? '₹449',
      productUrl: p.url.startsWith('http') ? p.url : '#',
      collectionSlug: 'search-results',
      collectionName: 'Curated Collection',
      tags: [],
      isFeatured: true,
    };
    openProduct(fallbackProduct);
  };

  const openSearch = () => {
    setActiveProduct(null);
    setMobileMenuOpen(false);
    setSearchModalOpen(true);
  };

  const addToCart = (item: CartItem) => {
    setCartItems((items) => items.some((existingItem) => existingItem.id === item.id) ? items : [...items, item]);
  };

  const buyNow = (itemOrItems: CartItem | CartItem[]) => {
    const itemList = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
    if (itemList.length === 0) return;

    const messageLines = [
      'Hi Framecase! 👋 I would like to order the following phone case(s):',
      '',
      ...itemList.map((item, idx) => {
        const productLink = window.location.origin + '/#catalog';
        return `${idx + 1}. *${item.product.title}*\n   - Device: ${item.brand} ${item.model}\n   - Price: ${item.product.price}\n   - Link: ${productLink}`;
      }),
      '',
      'Please let me know how to proceed with payment and shipping. Thank you!',
    ];

    const fullMessage = messageLines.join('\n');
    setOrderModalMessage(fullMessage);
    setCopiedOrder(false);

    // Automatically copy formatted message to user's clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullMessage).then(() => {
        setCopiedOrder(true);
      }).catch(() => {});
    }

    // Try ig.me direct message link first, falling back to official profile URL
    const encoded = encodeURIComponent(fullMessage);
    const igMeUrl = `https://ig.me/m/framecase.in?text=${encoded}`;
    window.open(igMeUrl, '_blank', 'noopener,noreferrer');
  };

  const cartCount = cartItems.length;

  const pageNumbers = Array.from(new Set([
    1,
    Math.max(1, page - 1),
    page,
    ...(catalog.data?.hasNextPage ? [page + 1] : []),
  ])).sort((a, b) => a - b);

  return (
    <div className="site-shell">
      <div className="announcement"><span>Complimentary shipping on orders over ₹999</span><span className="announcement-detail">Designed to be noticed. Built to protect.</span></div>
      <header className="site-header">
        <a href="/" className="brand" aria-label="Framecase home">
          <img src="/brand-logo.png" alt="FrameCase" className="brand-logo" width="30" height="30" />
          <span className="brand-word">Frame<span>Case</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navCollections.slice(0, 4).map((item) => (
            <a
              key={item.slug}
              href={`/${item.slug}`}
              onClick={(e) => {
                e.preventDefault();
                openCategoryPage(item.slug);
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              navigateToView('blog');
            }}
          >
            Blog
          </a>
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              navigateToView('about');
            }}
          >
            About
          </a>
          <a
            href="/faq"
            onClick={(e) => {
              e.preventDefault();
              navigateToView('faq');
            }}
          >
            FAQs
          </a>
          <button type="button" onClick={() => selectCollection()}>Shop all</button>
        </nav>
        <div className="header-actions">
          <button type="button" className="icon-button" aria-label="Search" onClick={openSearch}><Search size={20} /></button>
          <button type="button" className="bag-button" aria-label="Shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag size={20} /><span>{cartCount}</span></button>
          <button type="button" className="menu-button icon-button" aria-label="Open menu" onClick={() => setMobileMenuOpen((value) => !value)}>{mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>
      {mobileMenuOpen && (
        <nav className="mobile-menu" role="menu" aria-label="Mobile navigation">
          {navCollections.map((item) => (
            <a
              key={item.slug}
              href={`/${item.slug}`}
              role="menuitem"
              onClick={(e) => {
                e.preventDefault();
                openCategoryPage(item.slug);
              }}
            >
              <span>{item.label}</span>
              <ChevronRight size={17} />
            </a>
          ))}
          <a
            href="/blog"
            role="menuitem"
            onClick={(e) => {
              e.preventDefault();
              navigateToView('blog');
            }}
          >
            <span>Blog</span>
            <ChevronRight size={17} />
          </a>
          <a
            href="/about"
            role="menuitem"
            onClick={(e) => {
              e.preventDefault();
              navigateToView('about');
            }}
          >
            <span>About Us</span>
            <ChevronRight size={17} />
          </a>
          <a
            href="/faq"
            role="menuitem"
            onClick={(e) => {
              e.preventDefault();
              navigateToView('faq');
            }}
          >
            <span>FAQs</span>
            <ChevronRight size={17} />
          </a>
          <button
            type="button"
            role="menuitem"
            onClick={() => selectCollection()}
          >
            <span>Shop all</span>
            <ChevronRight size={17} />
          </button>
        </nav>
      )}

      <main>
        {activeProduct ? (
          <ProductPage key={activeProduct.id} product={activeProduct} onBack={handleBackToCatalog} onAddToCart={addToCart} onBuyNow={buyNow} />
        ) : currentView === 'category' ? (() => {
          const catMeta = getCategoryMeta(categoryViewSlug, currentLabel);
          return (
          <div className="content-page-shell category-page-shell">
            <div className="content-page-header">
              <button type="button" className="back-to-catalog" onClick={() => navigateToView('catalog')}>
                <ArrowUpRight size={16} className="rotate-180" /> Back to home
              </button>
              <p className="eyebrow">Curated Collection · 9H Glass Edition</p>
              <h1 className="content-page-title">{catMeta.name}</h1>
              <p className="content-page-subtitle">
                {catMeta.tagline}
              </p>
            </div>

            <div className="category-toolbar">
              <p className="result-count">
                {catalog.isLoading ? 'Syncing live designs…' : `${products.length} designs available on page ${page}`}
              </p>
              <div className="catalog-search-wrapper">
                <PredictiveSearchBox
                  value={search}
                  onChange={(val: string) => {
                    setSearch(val);
                    setPage(1);
                  }}
                  onSelectQuery={(q: string) => {
                    setSearch(q);
                    setPage(1);
                  }}
                  onSelectProduct={(p: SuggestProduct) => {
                    handleSelectSuggestedProduct(p);
                  }}
                  onSelectCollection={(c: SuggestCollection) => {
                    openCategoryPage(c.handle);
                  }}
                  onSubmit={(val: string) => {
                    setSearch(val);
                    setPage(1);
                  }}
                  placeholder={`Search ${currentLabel}...`}
                />
              </div>
            </div>

            {catalog.isLoading && (
              <div className="catalog-state"><div className="loader" /><p>Bringing the latest designs in…</p></div>
            )}
            {catalog.isError && (
              <div className="catalog-state state-error">
                <p>We couldn’t reach the live collection right now.</p>
                <button type="button" className="secondary-button" onClick={() => catalog.refetch()}>Try again</button>
              </div>
            )}
            {!catalog.isLoading && !catalog.isError && products.length === 0 && (
              <div className="catalog-state">
                <Sparkles size={24} />
                <p>No cases found in this category. Explore our other design collections.</p>
                <button type="button" className="secondary-button" onClick={() => navigateToView('catalog')}>View all designs</button>
              </div>
            )}
            {!catalog.isLoading && !catalog.isError && products.length > 0 && (
              <div className="product-grid">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} onOpen={openProduct} />
                ))}
              </div>
            )}

            {!catalog.isLoading && !catalog.isError && products.length > 0 && (
              <nav className="pagination" aria-label="Category pages">
                <button type="button" className="pagination-arrow" disabled={page === 1} onClick={() => goToPage(page - 1)}>Previous</button>
                <div className="pagination-pages">
                  {pageNumbers.map((pageNumber) => (
                    <button type="button" key={pageNumber} className={pageNumber === page ? 'current' : ''} onClick={() => goToPage(pageNumber)}>{pageNumber}</button>
                  ))}
                </div>
                <button type="button" className="pagination-arrow" disabled={!catalog.data?.hasNextPage} onClick={() => goToPage(page + 1)}>Next <ChevronRight size={15} /></button>
              </nav>
            )}

            {/* Description and category information below pagination */}
            <div className="category-editorial-section">
              <div className="category-editorial-card">
                <div className="category-editorial-body">
                  <p className="eyebrow">About {catMeta.name}</p>
                  <h2>{catMeta.name}: Curated Art & In-Hand Protection</h2>
                  <p className="category-editorial-description">{catMeta.description}</p>
                  <p className="category-editorial-materials">{catMeta.materialInfo}</p>
                </div>
                <div className="category-highlights-box">
                  <h3>Highlights & Engineering</h3>
                  <ul>
                    {catMeta.highlights.map((h, i) => (
                      <li key={i}>
                        <ShieldCheck size={16} /> <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="category-price-banner">
                    <strong>₹299</strong>
                    <span>All designs in this category · Free shipping over ₹999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        })() : currentView === 'about' ? (
          <AboutPage onBack={() => navigateToView('catalog')} />
        ) : currentView === 'faq' ? (
          <FaqPage onBack={() => navigateToView('catalog')} />
        ) : currentView === 'blog' ? (
          <BlogPage onBack={() => navigateToView('catalog')} onExploreDesigns={() => selectCollection()} />
        ) : <>
        <section className="hero">
          <div className="hero-backdrop hero-backdrop-one" />
          <div className="hero-backdrop hero-backdrop-two" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Curated for your frame</p>
            <h1>Make it<br /><em>yours.</em></h1>
            <p className="hero-description">Cases with a point of view. Discover designs that bring a little more personality to the everyday.</p>
            <button type="button" className="primary-button" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>Explore the collection <ArrowUpRight size={17} /></button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="phone phone-one"><div className="camera camera-left" /><div className="phone-case-art art-check" /></div>
            <div className="phone phone-two"><div className="camera camera-right" /><div className="phone-case-art art-sun" /></div>
            <div className="hero-sticker">YOUR<br /><span>EVERYDAY</span><br />ESSENTIAL</div>
          </div>
          <div className="hero-footnote"><span>01</span><span className="hero-line" /><span>Explore your next favourite</span></div>
        </section>

        <section className="value-strip" aria-label="Framecase benefits">
          <div><ShieldCheck size={19} /><span>Made to protect</span></div>
          <div><Sparkles size={19} /><span>Designs for every mood</span></div>
          <div><Truck size={19} /><span>Ships across India</span></div>
        </section>

        <section className="collection-section">
          <div className="section-heading">
            <div><p className="eyebrow">Find your frame</p><h2>Shop by mood</h2></div>
            <button type="button" className="text-button" onClick={() => selectCollection()}>View all collections <ArrowUpRight size={16} /></button>
          </div>
          <div className="collection-chips">
            <CollectionChip label="All designs" active={!selectedCollection} onSelect={selectCollection} />
            {visibleCollections.map((collection) => <CollectionChip key={collection.slug} label={collection.name} slug={collection.slug} active={selectedCollection === collection.slug} onSelect={selectCollection} />)}
          </div>
          {collections.length > 12 && <button type="button" className="show-more" onClick={() => setShowAllCollections((value) => !value)}>{showAllCollections ? 'Show fewer' : `Show all ${collections.length} collections`}</button>}
        </section>

        <section className="catalog-section" id="catalog">
          <div className="catalog-toolbar">
            <div><p className="eyebrow">The edit</p><h2>{currentLabel}</h2><p className="result-count">{catalog.isLoading ? 'Syncing live designs…' : `${products.length} designs on page ${page}`}</p></div>
            <div className="catalog-search-wrapper">
              <PredictiveSearchBox
                value={search}
                onChange={(val: string) => {
                  setSearch(val);
                  setPage(1);
                }}
                onSelectQuery={(q: string) => {
                  setSearch(q);
                  setPage(1);
                }}
                onSelectProduct={(p: SuggestProduct) => {
                  handleSelectSuggestedProduct(p);
                }}
                onSelectCollection={(c: SuggestCollection) => {
                  selectCollection(c.handle);
                  setSearch('');
                }}
                onSubmit={(val: string) => {
                  setSearch(val);
                  setPage(1);
                }}
                placeholder="Search designs, collections, cases..."
              />
            </div>
          </div>
          {catalog.isLoading && <div className="catalog-state"><div className="loader" /><p>Bringing the latest designs in…</p></div>}
          {catalog.isError && <div className="catalog-state state-error"><p>We couldn’t reach the live collection right now.</p><button type="button" className="secondary-button" onClick={() => catalog.refetch()}>Try again</button></div>}
          {!catalog.isLoading && !catalog.isError && products.length === 0 && <div className="catalog-state"><Sparkles size={24} /><p>No cases matched that search. Try a different mood.</p><button type="button" className="secondary-button" onClick={() => { setSearch(''); setSelectedCollection(undefined); }}>Clear filters</button></div>}
          {!catalog.isLoading && !catalog.isError && products.length > 0 && <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} onOpen={openProduct} />)}</div>}
          {!catalog.isLoading && !catalog.isError && products.length > 0 && <nav className="pagination" aria-label="Catalog pages">
            <button type="button" className="pagination-arrow" disabled={page === 1} onClick={() => goToPage(page - 1)}>Previous</button>
            <div className="pagination-pages">
              {pageNumbers.map((pageNumber) => <button type="button" key={pageNumber} className={pageNumber === page ? 'current' : ''} onClick={() => goToPage(pageNumber)}>{pageNumber}</button>)}
            </div>
            <button type="button" className="pagination-arrow" disabled={!catalog.data?.hasNextPage} onClick={() => goToPage(page + 1)}>Next <ChevronRight size={15} /></button>
          </nav>}

          {/* Newly launched horizontal section below pagination */}
          <div className="newly-launched-section">
            <div className="newly-launched-header">
              <div>
                <p className="eyebrow">Fresh drops</p>
                <h3 className="newly-launched-title">Newly launched</h3>
              </div>
              <button
                type="button"
                className="text-button"
                onClick={() => selectCollection('new-arrivalss')}
              >
                View all newly launched <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="newly-launched-scroll-container">
              {newlyLaunchedProducts.map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="newly-launched-card"
                  onClick={() => openProduct(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openProduct(p);
                    }
                  }}
                >
                  <div className="newly-launched-card-image">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} loading="lazy" />
                    ) : (
                      <div className="image-fallback">
                        <Sparkles size={20} />
                      </div>
                    )}
                    <span className="newly-launched-badge">NEW</span>
                  </div>
                  <div className="newly-launched-card-info">
                    <h4 className="newly-launched-card-title">{p.title}</h4>
                    <div className="newly-launched-card-price">
                      <strong>₹299</strong>
                      {p.compareAtPrice && <span>{p.compareAtPrice}</span>}
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="newly-launched-card newly-launched-view-all-card"
                onClick={() => selectCollection('new-arrivalss')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectCollection('new-arrivalss');
                  }
                }}
              >
                <div className="view-all-content">
                  <div className="view-all-icon-circle">
                    <ArrowUpRight size={22} />
                  </div>
                  <span className="view-all-text">View all</span>
                  <span className="view-all-sub">Browse full collection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Aesthetic Collection horizontal section below newly launched */}
          <div className="newly-launched-section aesthetic-section">
            <div className="newly-launched-header">
              <div>
                <p className="eyebrow">Visual Moods</p>
                <h3 className="newly-launched-title">Aesthetic Collection</h3>
              </div>
              <button
                type="button"
                className="text-button"
                onClick={() => selectCollection('aesthetic-collection')}
              >
                View all aesthetic <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="newly-launched-scroll-container">
              {aestheticProducts.map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="newly-launched-card"
                  onClick={() => openProduct(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openProduct(p);
                    }
                  }}
                >
                  <div className="newly-launched-card-image">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} loading="lazy" />
                    ) : (
                      <div className="image-fallback">
                        <Sparkles size={20} />
                      </div>
                    )}
                    <span className="newly-launched-badge">AESTHETIC</span>
                  </div>
                  <div className="newly-launched-card-info">
                    <h4 className="newly-launched-card-title">{p.title}</h4>
                    <div className="newly-launched-card-price">
                      <strong>₹299</strong>
                      {p.compareAtPrice && <span>{p.compareAtPrice}</span>}
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="newly-launched-card newly-launched-view-all-card"
                onClick={() => selectCollection('aesthetic-collection')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectCollection('aesthetic-collection');
                  }
                }}
              >
                <div className="view-all-content">
                  <div className="view-all-icon-circle">
                    <ArrowUpRight size={22} />
                  </div>
                  <span className="view-all-text">View all</span>
                  <span className="view-all-sub">Browse full collection</span>
                </div>
              </div>
            </div>
          </div>

          {catalog.data?.sourceOnline && <p className="sync-note"><span className="online-dot" /> Live collection synced {new Date(catalog.data.syncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Tap a case to see its details</p>}
        </section>

        <section className="material-section" aria-labelledby="glass-case-guide">
          <div className="material-intro">
            <p className="eyebrow">The Framecase standard</p>
            <h2 id="glass-case-guide">Made beautiful.<br /><em>Made to protect.</em></h2>
          </div>
          <div className="material-copy">
            <p className="material-lead">Every Framecase design is made as a glossy glass case, so the art stays crisp while your phone gets everyday protection.</p>
            <div className="material-points">
              <div><span>01</span><div><strong>Glossy glass back</strong><p>Our designs are printed onto a high-quality 9H glass back. No loose glitter, no faux marble — just a clean, polished finish.</p></div></div>
              <div><span>02</span><div><strong>Silicon sides</strong><p>Flexible TPU silicon sides make the case comfortable to hold and help cover the phone from edge to edge.</p></div></div>
              <div><span>03</span><div><strong>Glass + plastic construction</strong><p>The combination is slim and protective for daily use. Because the back is glass, a heavy drop can still cause it to shatter.</p></div></div>
            </div>
          </div>
        </section>

        <section className="seo-content-section" aria-labelledby="seo-collection-overview">
          <div className="seo-content-container">
            <div className="seo-content-header">
              <p className="eyebrow">India's Designer Phone Case Destination</p>
              <h2 id="seo-collection-overview">Unique & Attractive Design Phone Cases & Covers at ₹299</h2>
              <p className="seo-content-intro">
                Elevate your smartphone with curated designer phone cases crafted for visual elegance and everyday drop defense. Whether you're looking for aesthetic covers, bold pop-culture art, or sleek minimalism, Framecase brings high-definition glossy glass protection to your fingertips at an honest price.
              </p>
            </div>

            <div className="seo-benefits-grid">
              <div className="seo-benefit-card">
                <h3>Curated Unique Designs</h3>
                <p>
                  Explore hundreds of fresh, attractive phone case designs spanning anime, automotive, retro typography, and nature-inspired motifs. Each case transforms your device into an eye-catching statement piece.
                </p>
                <button type="button" className="seo-cta-link" onClick={() => selectCollection()}>
                  Browse All Designs <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="seo-benefit-card">
                <h3>Shockproof Drop Protection</h3>
                <p>
                  Built with shock-absorbing TPU silicone bumpers and scratch-resistant gloss backplates. Enjoy reinforced camera bezels and tactile button response for effortless daily durability.
                </p>
                <button type="button" className="seo-cta-link" onClick={() => navigateToView('about')}>
                  Our Quality & Materials <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="seo-benefit-card">
                <h3>100+ Compatible Devices</h3>
                <p>
                  Precision-cut cases available for Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Oppo, and Realme. Every model is priced uniformly at ₹299 with fast nationwide delivery.
                </p>
                <button type="button" className="seo-cta-link" onClick={() => {
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Find Your Model <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div className="seo-conversion-bar">
              <div className="seo-conversion-text">
                <strong>Ready to upgrade your daily carry?</strong>
                <span>Over 100+ phone models supported · ₹299 flat pricing · Complimentary shipping over ₹999</span>
              </div>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setSelectedCollection(undefined);
                  setSearch('');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Shop Unique Phone Covers <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="statement-section">
          <div className="statement-label"><span>Framecase</span><span>Since 2026</span></div>
          <h2>Your phone<br /><em>has a frame.</em></h2>
          <a href="#catalog" className="statement-link">Find yours <ArrowUpRight size={17} /></a>
        </section>
        </>}
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div><a href="/" className="brand footer-brand" onClick={(e) => { e.preventDefault(); navigateToView('catalog'); }}><span className="brand-mark">F</span><span className="brand-word">frame<span>case</span></span></a><p>Cases with a point of view.</p></div>
          <div className="footer-links">
            <div>
              <p>Explore</p>
              <button type="button" onClick={() => selectCollection()}>All designs</button>
              <button type="button" onClick={() => selectCollection('new-designs')}>New designs</button>
              <button type="button" onClick={() => selectCollection('best-sellers')}>Best sellers</button>
              <button type="button" onClick={() => selectCollection('aesthetic-collection')}>Aesthetic</button>
              <button type="button" onClick={() => selectCollection('cars-bikes-collection')}>Cars & bikes</button>
            </div>
            <div>
              <p>Company & Help</p>
              <button type="button" onClick={() => navigateToView('about')}>About Us</button>
              <button type="button" onClick={() => navigateToView('faq')}>FAQ’s</button>
              <button type="button" onClick={() => navigateToView('blog')}>Blog</button>
              <a href="mailto:nkeepson@gmail.com" className="footer-contact-link">nkeepson@gmail.com</a>
            </div>
            <div>
              <p>Follow along</p>
              <a
                href="https://www.instagram.com/framecase.in?srtk=YWYzZDk4a3N2bWVl&utm_source=qr"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={15} /> Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Framecase</span><span>Made for every device, every version of you.</span></div>
      </footer>
            {searchModalOpen && (
        <div
          className="search-modal-backdrop"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="search-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <PredictiveSearchBox
                autoFocus
                value={search}
                onChange={(val: string) => {
                  setSearch(val);
                  setPage(1);
                }}
                onSelectQuery={(q: string) => {
                  setSearch(q);
                  setPage(1);
                  setSearchModalOpen(false);
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onSelectProduct={(p: SuggestProduct) => {
                  setSearchModalOpen(false);
                  handleSelectSuggestedProduct(p);
                }}
                onSelectCollection={(c: SuggestCollection) => {
                  selectCollection(c.handle);
                  setSearch('');
                  setSearchModalOpen(false);
                }}
                onSubmit={(val: string) => {
                  setSearch(val);
                  setPage(1);
                  setSearchModalOpen(false);
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onClose={() => setSearchModalOpen(false)}
                placeholder="Search designs, collections, cases..."
              />
              <button
                type="button"
                className="search-modal-close"
                onClick={() => setSearchModalOpen(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      {cartOpen && <CartPanel items={cartItems} onClose={() => setCartOpen(false)} onRemove={(id) => setCartItems((items) => items.filter((item) => item.id !== id))} onBuyNow={buyNow} />}

      {orderModalMessage && (
        <div className="order-modal-backdrop" onClick={() => setOrderModalMessage(null)}>
          <div className="order-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <div>
                <p className="eyebrow">Order Direct on Instagram</p>
                <h3 className="order-modal-title">Complete Your Order</h3>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setOrderModalMessage(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="order-modal-body">
              <div className="order-modal-status-badge">
                {copiedOrder ? (
                  <>
                    <Check size={16} className="text-green-600" />
                    <span>Order details automatically copied to your clipboard!</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Your order message is ready:</span>
                  </>
                )}
              </div>

              <div className="order-message-preview">
                <pre>{orderModalMessage}</pre>
              </div>

              <p className="order-modal-instructions">
                If Instagram did not pre-fill your message, simply <strong>paste</strong> your copied order details into our Instagram DM!
              </p>

              <div className="order-modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    navigator.clipboard?.writeText(orderModalMessage);
                    setCopiedOrder(true);
                  }}
                >
                  <Copy size={16} /> {copiedOrder ? 'Copied again!' : 'Copy order message'}
                </button>

                <a
                  href={`https://ig.me/m/framecase.in?text=${encodeURIComponent(orderModalMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                >
                  <Instagram size={17} /> Open Instagram DM <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AppBoundary() {
  return <ErrorBoundary><App /></ErrorBoundary>;
}

export default function RootApp(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBoundary />
      <Toaster />
    </QueryClientProvider>
  );
}