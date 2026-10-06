import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { PRODUCTS, SHIPPING } from "../data/products";
import { StoreContext, lineKey } from "./context";

const STORAGE_KEY = "luxelips:v1";
const MAX_QTY = 10;

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [], wishlist: [] };
    const parsed = JSON.parse(raw);
    // Drop anything that no longer exists in the catalog.
    const ids = new Set(PRODUCTS.map((p) => p.id));
    return {
      lines: (parsed.lines ?? []).filter((l) => ids.has(l.productId)),
      wishlist: (parsed.wishlist ?? []).filter((id) => ids.has(id)),
    };
  } catch {
    return { lines: [], wishlist: [] };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const { productId, shade, qty } = action;
      const key = lineKey(productId, shade);
      const existing = state.lines.find((l) => l.key === key);
      const lines = existing
        ? state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
        : [...state.lines, { key, productId, shade, qty: Math.min(MAX_QTY, qty) }];
      return { ...state, lines };
    }
    case "setQty": {
      const qty = Math.max(0, Math.min(MAX_QTY, action.qty));
      const lines =
        qty === 0
          ? state.lines.filter((l) => l.key !== action.key)
          : state.lines.map((l) => (l.key === action.key ? { ...l, qty } : l));
      return { ...state, lines };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
    case "clear":
      return { ...state, lines: [] };
    case "toggleWish": {
      const has = state.wishlist.includes(action.productId);
      return {
        ...state,
        wishlist: has ? state.wishlist.filter((id) => id !== action.productId) : [...state.wishlist, action.productId],
      };
    }
    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode) — cart still works in memory */
    }
  }, [state]);

  const notify = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const addToCart = useCallback((product, { shade = null, qty = 1, openDrawer = true } = {}) => {
    dispatch({ type: "add", productId: product.id, shade, qty });
    if (openDrawer) setCartOpen(true);
  }, []);

  const toggleWishlist = useCallback(
    (product) => {
      const willAdd = !state.wishlist.includes(product.id);
      dispatch({ type: "toggleWish", productId: product.id });
      notify(willAdd ? `Saved ${product.name} to your wishlist` : `Removed ${product.name} from your wishlist`);
    },
    [state.wishlist, notify]
  );

  const value = useMemo(() => {
    const lines = state.lines
      .map((l) => {
        const product = PRODUCTS.find((p) => p.id === l.productId);
        return product ? { ...l, product, lineTotal: product.price * l.qty } : null;
      })
      .filter(Boolean);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
    const savings = lines.reduce(
      (n, l) => n + (l.product.compareAt ? (l.product.compareAt - l.product.price) * l.qty : 0),
      0
    );
    const toFreeShipping = Math.max(0, SHIPPING.freeThreshold - subtotal);

    return {
      lines,
      count,
      subtotal,
      savings,
      toFreeShipping,
      maxQty: MAX_QTY,
      wishlist: state.wishlist,
      isWished: (id) => state.wishlist.includes(id),
      addToCart,
      setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
      removeLine: (key) => dispatch({ type: "remove", key }),
      clearCart: () => dispatch({ type: "clear" }),
      toggleWishlist,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      toast,
      notify,
    };
  }, [state, addToCart, toggleWishlist, cartOpen, searchOpen, toast, notify]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
