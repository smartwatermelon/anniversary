# 26th Anniversary Activity Selector

A delightful web application that helps couples choose anniversary activities by drawing Scrabble-style letter tiles. Inspired by 26 years :: 26 letters of the alphabet.

## Features

- Interactive Scrabble-style letter tiles
- Random activity suggestions based on selected letters
- Ability to shuffle and get new suggestions
- Heart/favorite activities to track completed ones
- Responsive design that works on both desktop and mobile
- Customizable activity lists and loading phrases
- Local storage to remember completed activities

## Demo

You can view the live demo at: [`https://smartwatermelon.github.io/anniversary`](https://smartwatermelon.github.io/anniversary)

## Installation

1. Clone the repository:

	```bash
git clone https://github.com/smartwatermelon/anniversary.git && cd anniversary
```

2. Install dependencies:

	```bash
npm install
```

3. Run the development server:

	```bash
npm run dev
```

4. Build for production:

	```bash
npm run build
```

## Customizing Activities and Phrases

### Customizing Activities

The activities are stored in `activities.json`. The file contains an object where each key is a letter of the alphabet, and the value is an array of activities starting with that letter.

To customize the activities:

1. Open `activities.json`
2. Modify the arrays for each letter
3. Keep the structure consistent:

```json
{
  "A": [
    "Afternoon tea at a fancy hotel",
    "Art museum visit",
    "Adventure hike"
  ],
  "B": [
    "Breakfast in bed",
    "Brunch at a trendy spot",
    "Brewery tour"
  ]
  // ... rest of the alphabet
}
```

### Customizing Loading Phrases

The loading phrases that appear while shuffling activities are stored in `phrases.json`. To customize:

1. Open `phrases.json`
2. Modify the array of phrases:

```json
[
  "Finding perfect activities...",
  "Crafting romantic moments...",
  "Searching for adventures...",
  // Add your own phrases here
]
```

## Technologies Used

- React 18
- Vite
- TailwindCSS
- Lucide React (for icons)
- LocalStorage (for persisting completed activities)

## Project Structure

- `App.jsx` - Main application component
- `ScrabbleHeader.jsx` - Component for displaying letter tiles
- `index.css` - Styling including Tailwind components
- `activities.json` - Activity data
- `phrases.json` - Loading phrases
- `public/` - Static assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC License - See LICENSE file for details
