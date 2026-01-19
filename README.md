# SupPros - Dietary Supplements Sales Dashboard

A modern, responsive sales dashboard application for dietary supplements built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Dashboard Overview

- **Sales Overview**: Revenue metrics, order statistics, and performance indicators
- **Products Analytics**: Product performance tracking, inventory management, and stock monitoring
- **Interactive Charts**: Revenue trends, sales by category, and product performance visualizations
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Mode**: Complete dark/light theme support with system preference detection

### Technical Features

- **React 19** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** with custom theme configuration
- **Recharts** for data visualization
- **React Router** for client-side routing
- **Responsive sidebar navigation**
- **Loading states and error handling**

## 📊 Dashboard Pages

### Sales Overview (`/`)

- Total revenue, orders, and average order value cards
- Revenue trend line chart (12-month data)
- Sales by category bar chart
- Top 5 selling supplements list
- Real-time metrics calculation

### Products Analytics (`/products`)

- Category-based product filtering
- Product performance bar chart
- Stock status distribution pie chart
- Comprehensive inventory table with stock indicators
- Low/medium/high stock level warnings

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.4.13
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Development**: ESLint, Prettier

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   └── Card.tsx          # Reusable card components
│   ├── Layout.tsx            # Main layout with sidebar
│   └── .gitkeep
├── hooks/
│   └── useTheme.tsx          # Theme management hook
├── pages/
│   ├── SalesOverview.tsx     # Main dashboard page
│   └── ProductsAnalytics.tsx # Products analytics page
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── cn.ts                 # Class name utility
├── data/
│   └── mockData.ts           # Mock data and calculations
├── App.tsx                   # Main app component
├── main.tsx                  # App entry point
└── index.css                 # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd admin-panel-suppros
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npx prettier --write .
```

## 🎨 Customization

### Theme Configuration

The app supports light, dark, and system themes. Theme preferences are stored in localStorage and automatically applied on page load.

### Color Scheme

Custom colors are defined in `tailwind.config.js`:

- Primary: Sky blue tones
- Secondary: Slate grays
- Responsive to dark/light modes

### Adding New Products

Products are defined in `src/data/mockData.ts`. Add new products following the existing `Product` interface:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  category: Category.VITAMINS, // or other category
  price: 29.99,
  stock: 100,
  sales: 50,
  description: 'Product description'
}
```

## 📊 Data Structure

### Product Categories

- Vitamins
- Minerals
- Proteins
- Herbal Supplements

### Key Metrics

- Total Revenue: Sum of all sales
- Total Orders: Number of transactions
- Average Order Value: Revenue ÷ Orders
- Stock Levels: Low (<50), Medium (50-200), High (>200)

## 🔧 Configuration

### Tailwind CSS

Custom theme configured in `tailwind.config.js` with:

- Dark mode class-based toggling
- Custom color palette
- Inter font family
- Responsive breakpoints

### TypeScript

Strict TypeScript configuration with:

- Path mapping for clean imports
- JSX React 19 support
- Module resolution for bundler

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Import project from GitHub
   - Vercel will auto-detect Vite configuration

2. **Environment Variables** (if needed)
   - Add environment variables in Vercel dashboard
   - Configure build settings

3. **Deploy**
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

### Other Platforms

The app can be deployed to any static hosting service:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build command: `npm run build`
Output directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

Built as a modern React dashboard example

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**SupPros Dashboard** - Empowering supplement businesses with data-driven insights.
