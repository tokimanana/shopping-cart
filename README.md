# NgRx Shopping Cart

A learning project demonstrating state management with **NgRx** in Angular 19. This application showcases the implementation of a shopping cart with products listing, cart management, and persistent storage.

## 🎯 Learning Objectives

This project was created to practice and understand:

- **NgRx Store**: Centralized state management
- **Actions & Reducers**: Pure functions for state transitions
- **Effects**: Handling side effects and async operations
- **Selectors**: Efficient state derivation and memoization
- **State Persistence**: Using `ngrx-store-localstorage` for cart persistence
- **Angular Signals & Control Flow**: Modern Angular syntax (`@if`, `@for`)

## 🏗️ Architecture

### State Structure

```
├── Products State
│   ├── products: Product[]
│   ├── loading: boolean
│   └── error: string | null
│
└── Cart State
    └── items: CartItem[]
```

### Key NgRx Patterns

- **Feature-based organization**: Separate modules for products and cart
- **Normalized state**: Products stored separately from cart items
- **Derived selectors**: Cart items enriched with product details
- **Effect for API calls**: Product loading via HTTP with error handling
- **Action groups**: Type-safe actions using `createActionGroup()`

## 📦 Features

- ✅ Product listing with loading states
- ✅ Add/remove items to/from cart
- ✅ Increase/decrease item quantities
- ✅ Cart persistence across browser sessions
- ✅ Real-time cart total calculation
- ✅ Error handling and empty states
- ✅ Responsive image fallback

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Angular CLI (v19.2.19)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
ng serve

# Start the mock backend (JSON Server)
npm run server
# or
json-server --watch db.json --port 3000
```

The application will be available at `http://localhost:4200/`

### Mock API

The project uses a JSON Server for mock product data. Ensure `db.json` exists with:

```json
{
  "products": [
    {
      "id": "1",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

## 🛠️ Tech Stack

- **Angular** 19.2.19
- **NgRx** (Store, Effects, Store Devtools)
- **RxJS** for reactive programming
- **TypeScript** for type safety
- **ngrx-store-localstorage** for state persistence

## 📁 Project Structure

```
src/app/
├── products/
│   ├── product.model.ts
│   ├── product.actions.ts
│   ├── product.reducer.ts
│   ├── product.selector.ts
│   ├── product.effects.ts
│   └── product.service.ts
├── cart/
│   ├── cart.model.ts
│   ├── cart.action.ts
│   ├── cart.reducer.ts
│   └── cart.selectors.ts
├── product-list/
│   └── product-list.component.*
├── shopping-cart/
│   └── shopping-cart.component.*
└── app.config.ts
```

## 🧪 Key Learning Points

### 1. Effects Pattern
```typescript
loadProducts$ = createEffect(() =>
  this.action$.pipe(
    ofType(ProductActions.loadProducts),
    exhaustMap(() =>
      this.productService.getProducts().pipe(
        map((products) => ProductActions.loadProductsSuccess({ products })),
        catchError((error) => of(ProductActions.loadProductsFailure({ error })))
      )
    )
  )
);
```

### 2. Selector Composition
```typescript
export const selectCartItemsWithDetails = createSelector(
  selectCartItems,
  selectAllProducts,
  (items, products) => {
    return items.map(item => ({
      ...item,
      ...products.find(p => p.id === item.productId)
    }));
  }
);
```

### 3. Immutable Updates
```typescript
on(CartActions.addItem, (state, { productId }) => {
  const existingItemIndex = state.items.findIndex(item => item.productId === productId);
  
  const updatedItems = existingItemIndex > -1
    ? state.items.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
      )
    : [...state.items, { productId, quantity: 1 }];

  return { ...state, items: updatedItems };
})
```

## 🔍 Redux DevTools

The project is configured with NgRx Store Devtools. Install the Redux DevTools browser extension to:
- Inspect state changes
- Time-travel debugging
- Action replay

## 📚 Resources

- [NgRx Documentation](https://ngrx.io/)
- [Angular Documentation](https://angular.dev/)
- [RxJS Documentation](https://rxjs.dev/)

## 🤝 Contributing

This is a learning project. Feel free to fork and experiment with:
- Adding new features (wishlist, checkout, etc.)
- Implementing NgRx Entity
- Adding router state management
- Writing unit tests for reducers and effects

## 📝 License

This project is open source and available for educational purposes.

---

**Note**: This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.
