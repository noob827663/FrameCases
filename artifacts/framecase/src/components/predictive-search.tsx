import React, { useEffect, useRef, useState } from "react";
import { Search, X, Loader2, Sparkles, Folder, ArrowRight } from "lucide-react";

export interface SuggestProduct {
  title: string;
  url: string;
  handle: string;
  price?: string;
  compareAtPrice?: string;
  imageUrl?: string;
}

export interface SuggestCollection {
  title: string;
  url: string;
  handle: string;
}

export interface SuggestQuery {
  text: string;
  url?: string;
}

export interface SuggestResponse {
  query: string;
  queries: SuggestQuery[];
  collections: SuggestCollection[];
  products: SuggestProduct[];
}

interface PredictiveSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSelectProduct?: (product: SuggestProduct) => void;
  onSelectCollection?: (collection: SuggestCollection) => void;
  onSelectQuery?: (query: string) => void;
  onSubmit?: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  showDropdown?: boolean;
  inputClassName?: string;
  onClose?: () => void;
}

export function PredictiveSearchBox({
  value,
  onChange,
  onSelectProduct,
  onSelectCollection,
  onSelectQuery,
  onSubmit,
  placeholder = "Search designs, collections, cases...",
  autoFocus = false,
  className = "",
  inputClassName = "",
  onClose,
}: PredictiveSearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SuggestResponse | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const trimmed = value.trim();
    if (!trimmed) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/suggest?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const json: SuggestResponse = await res.json();
          setData(json);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Predictive search failed", err);
        }
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasSuggestions =
    data &&
    ((data.queries && data.queries.length > 0) ||
      (data.collections && data.collections.length > 0) ||
      (data.products && data.products.length > 0));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsOpen(false);
      onSubmit?.(value);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleSelectQuery = (text: string) => {
    onChange(text);
    setIsOpen(false);
    onSelectQuery?.(text);
  };

  const handleSelectCollection = (col: SuggestCollection) => {
    setIsOpen(false);
    onSelectCollection?.(col);
  };

  const handleSelectProduct = (prod: SuggestProduct) => {
    setIsOpen(false);
    onSelectProduct?.(prod);
  };

  return (
    <div ref={containerRef} className={`predictive-search-root ${className}`}>
      <div className="predictive-search-input-wrapper">
        <Search className="predictive-search-icon" size={18} />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`predictive-search-input ${inputClassName}`}
          autoComplete="off"
          spellCheck="false"
        />
        {loading && <Loader2 className="predictive-search-loader animate-spin" size={16} />}
        {value && !loading && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setData(null);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="predictive-search-clear"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {isOpen && value.trim().length > 0 && (
        <div className="predictive-search-dropdown" role="listbox">
          {loading && !data && (
            <div className="predictive-search-status">
              <Loader2 className="animate-spin inline-block mr-2" size={16} />
              Searching designs...
            </div>
          )}

          {!loading && !hasSuggestions && (
            <div className="predictive-search-status">
              No matching suggestions for &ldquo;{value}&rdquo;
            </div>
          )}

          {data?.queries && data.queries.length > 0 && (
            <div className="predictive-search-group">
              <div className="predictive-search-group-title">
                <Sparkles size={12} className="inline mr-1" /> Suggestions
              </div>
              <ul className="predictive-search-query-list">
                {data.queries.slice(0, 5).map((q, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      className="predictive-search-query-item"
                      onClick={() => handleSelectQuery(q.text)}
                    >
                      <Search size={14} className="text-muted-foreground mr-2 shrink-0" />
                      <span>{q.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data?.collections && data.collections.length > 0 && (
            <div className="predictive-search-group">
              <div className="predictive-search-group-title">
                <Folder size={12} className="inline mr-1" /> Collections
              </div>
              <div className="predictive-search-chips">
                {data.collections.map((col) => (
                  <button
                    key={col.handle}
                    type="button"
                    className="predictive-search-chip"
                    onClick={() => handleSelectCollection(col)}
                  >
                    {col.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {data?.products && data.products.length > 0 && (
            <div className="predictive-search-group">
              <div className="predictive-search-group-title">Products</div>
              <div className="predictive-search-product-grid">
                {data.products.slice(0, 6).map((prod) => (
                  <button
                    key={prod.handle || prod.title}
                    type="button"
                    className="predictive-search-product-card"
                    onClick={() => handleSelectProduct(prod)}
                  >
                    <div className="predictive-search-thumb">
                      {prod.imageUrl ? (
                        <img src={prod.imageUrl} alt={prod.title} loading="lazy" />
                      ) : (
                        <div className="predictive-search-thumb-placeholder" />
                      )}
                    </div>
                    <div className="predictive-search-info">
                      <div className="predictive-search-prod-title">{prod.title}</div>
                      {prod.price && <div className="predictive-search-prod-price">{prod.price}</div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {value.trim() && (
            <div className="predictive-search-footer">
              <button
                type="button"
                className="predictive-search-footer-btn"
                onClick={() => {
                  setIsOpen(false);
                  onSubmit?.(value);
                }}
              >
                <span>Search for &ldquo;{value}&rdquo; across all cases</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
