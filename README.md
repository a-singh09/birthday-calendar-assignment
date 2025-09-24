# 🎂 Birthday Calendar

A dynamic 7-day birthday calendar that calculates which day of the week birthdays fall on for any selected year. Built with Next.js 15 and TypeScript.

## 🚀 Live Demo

Visit the live application: [https://birthday-calendar-assignment.vercel.app](https://birthday-calendar-assignment.vercel.app)

## 📋 Project Overview

This project implements **Task 2: Logic & Code Quality — Birthday Calendar** from the hiring assignment. Given a list of people with birthdays and a selected year, the application displays each person's name in the correct day column based on when their birthday falls in that year.

> **Note**: I was only able to complete **Task 2** successfully. Task 1 (CSS Battle challenges) was not fully implemented and may not be working properly.

### How It Works

1. **Input**: JSON data containing people's names and birthdays + year selection
2. **Processing**: Calculate which day of the week each birthday falls on in the selected year
3. **Display**: Show people as colored squares in the appropriate day column (Monday-Sunday)

### Example

For people:

- A = 2/15/1978
- B = 5/23/1983

In year 2015:

- A's birthday (2/15/2015) falls on **Sunday** → A appears in Sunday column
- B's birthday (5/23/2015) falls on **Saturday** → B appears in Saturday column

## ✨ Features

### Core Functionality

- ✅ **7-day calendar layout** (Monday through Sunday)
- ✅ **JSON input parsing** with real-time validation
- ✅ **Year selection** (2000-present) with live updates
- ✅ **Dynamic day-of-week calculation** for any year
- ✅ **Age-based sorting** within each day (youngest to oldest)
- ✅ **Color-coded person squares** using predefined palette
- ✅ **Responsive square sizing** that adapts to content

### Advanced Features

- ✅ **Real-time updates** - calendar updates immediately on input changes
- ✅ **Error handling** - graceful validation with user feedback
- ✅ **Empty state management** - proper `day-empty` class for vacant days
- ✅ **Hover tooltips** - person name and age on hover
- ✅ **Keyboard navigation** - full accessibility support
- ✅ **Responsive design** - works on all screen sizes
- ✅ **TypeScript** - full type safety throughout

### Accessibility (WCAG 2.1 Compliant)

- ✅ **Screen reader support** with proper ARIA labels
- ✅ **Keyboard navigation** with focus management
- ✅ **High contrast mode** support
- ✅ **Reduced motion** preferences respected
- ✅ **Semantic HTML** structure

## 🛠️ Technical Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript with strict mode
- **UI**: React 19.1.0 with custom CSS (no external libraries)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint with Next.js config
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd birthday-calendar
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### JSON Input Format

Enter birthday data in this JSON format:

```json
[
  { "name": "Tyrion Lannister", "birthday": "1978-12-02" },
  { "name": "Cersei Lannister", "birthday": "1975-11-30" },
  { "name": "Jon Snow", "birthday": "1989-12-03" }
]
```

- **name**: Person's full name
- **birthday**: Date in YYYY-MM-DD format

### Sample Data

The app comes with pre-loaded sample data (Tyrion Lannister). You can also test with the comprehensive Game of Thrones dataset available in the application.

### Year Selection

Use the dropdown to select any year from 2000 to present. The calendar will automatically update to show where each birthday falls in the selected year.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main app component
│   ├── globals.css        # Global styles
│   └── css_battle_*/      # Additional challenges
├── components/            # React components
│   ├── InputSection/      # JSON input and year selector
│   ├── CalendarSection/   # 7-day calendar grid
│   ├── DayColumn/         # Individual day column
│   └── PersonSquare/      # Person square representation
├── types/                 # TypeScript definitions
│   └── index.ts           # Core interfaces
├── utils/                 # Utility functions
│   └── index.ts           # Date calculations and helpers
└── constants/             # Application constants
    └── index.ts           # Colors, day names, etc.
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run specific test file
npm test -- accessibility.test.tsx
```

### Test Coverage

- ✅ Unit tests for utility functions
- ✅ Integration tests for complete workflow
- ✅ Accessibility tests for WCAG compliance
- ✅ Component behavior tests

### Manual Testing

See `MANUAL_TEST.md` and `ACCESSIBILITY_TEST.md` for detailed testing procedures.

## 📏 Assignment Requirements Compliance

| Requirement             | Status | Implementation                                |
| ----------------------- | ------ | --------------------------------------------- |
| 7-day calendar layout   | ✅     | `CalendarSection` with `DayColumn` components |
| JSON input parsing      | ✅     | Real-time validation in `InputSection`        |
| Year selection          | ✅     | Dropdown from 2000-present                    |
| Day-of-week calculation | ✅     | `getDayOfWeek()` utility function             |
| Age-based sorting       | ✅     | `sortPeopleByAge()` within each day           |
| Color-coded squares     | ✅     | Predefined palette from assignment            |
| Empty day classes       | ✅     | `day-empty` class applied appropriately       |
| Title attributes        | ✅     | Name and age in hover tooltips                |
| Equal-sized squares     | ✅     | Responsive grid with dynamic sizing           |
| Real-time updates       | ✅     | Immediate recalculation on changes            |

## 🎨 Design Features

- **Glass morphism UI** - Modern frosted glass effects
- **Smooth animations** - Hover effects and transitions
- **Color palette** - `#545D79`, `#8AB721`, `#C77D99`, `#78CAE3`, `#E64A33`
- **Responsive grid** - Adapts to screen size and person count
- **Dark mode support** - Automatic theme detection

## 🐛 Known Issues

- **Task 1 Status**: CSS Battle challenges may not be fully working (as mentioned by user)
- **Browser Compatibility**: Tested primarily in modern browsers
- **Mobile UX**: Optimized but tooltip behavior varies on touch devices

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run test suite

### Environment Variables

No environment variables required for basic functionality.

## 📚 Documentation

- `PROJECT_STRUCTURE.md` - Detailed architecture overview
- `ACCESSIBILITY_TEST.md` - Accessibility testing guide
- `MANUAL_TEST.md` - Manual testing procedures
- `workflow-verification.md` - Integration test results

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

### Deploy Your Own

1. Fork this repository
2. Import to Vercel
3. Deploy with default settings

## 🤝 Contributing

This project was created as part of a hiring assignment. The implementation focuses on:

- Clean, maintainable code structure
- Comprehensive TypeScript typing
- Extensive test coverage
- Accessibility compliance
- Performance optimization

## 📄 License

This project is part of a coding assignment and is not intended for commercial use.

---

**Built with ❤️ using Next.js and TypeScript**
