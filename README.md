# Bartender's Helper App

A comprehensive professional drink recommendation app designed for busy bar environments. This React Native app helps bartenders and customers find the perfect drink from a fully stocked bar inventory.

## Features

- **Welcome Screen**: Clean introduction with "Find a Drink" button
- **Professional Bartender Organization**: 
  - **Base Spirit Selection**: Organized by bartender logic including Vodka, Gin, Rum (Light/Dark), Tequila varieties, Mezcal, Whiskey family, Distilled Wine (Brandy/Cognac/Armagnac), Cachaça, Pisco, Champagne/Prosecco, and None/Other
  - **Liqueur Selection**: 20+ liqueurs organized under appropriate spirit categories, not as standalone base spirits
  - **Sipping Spirits Handling**: Premium spirits that should be enjoyed neat get special recognition
  - **Flavor Profile**: Fruity, Sweet, Sour, Spicy, Bitter, Refreshing, Herbal, Creamy, Smoky
  - **Strength Preference**: Light, Medium, Strong
- **Cascading Dynamic Filtering**: Shows only relevant options at each step, ensuring users always get valid recommendations
- **Smart Question Flow**: Questions adapt based on previous selections to prevent invalid combinations
- **Comprehensive Database**: 50+ classic cocktails covering all spirit/liqueur combinations
- **Professional Design**: Dark theme optimized for bar lighting
- **Easy Navigation**: Large, easy-to-tap buttons with clear typography

## Getting Started

1. Make sure you have Node.js and Expo CLI installed
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Scan the QR code with Expo Go app on your phone or run on simulator

## Drink Database

The app includes a comprehensive database of 50+ classic cocktails:

### Vodka Drinks
- Vodka Cranberry, Cosmopolitan, Bloody Mary, Vodka Martini, Dirty Martini, Moscow Mule, White Russian, Black Russian, Espresso Martini

### Gin Drinks  
- Gin & Tonic, French 75, Negroni, Negroni Sbagliato, Gin Fizz, Aviation, Tom Collins, Last Word, Bee's Knees, Clover Club, Southside, Ramos Gin Fizz, Corpse Reviver #2

### Rum Drinks
- Mojito, Piña Colada, Daiquiri, Dark & Stormy, Mai Tai, Zombie, Cuba Libre, Blue Hawaiian, Hurricane, Planter's Punch

### Tequila Drinks
- Margarita, Spicy Margarita, Paloma, Tequila Sunrise, El Diablo, Mexican Firing Squad

### Mezcal Drinks
- Mezcal Mule, Oaxaca Old Fashioned, Division Bell

### Whiskey/Bourbon Drinks
- Old Fashioned, Whiskey Sour, Manhattan, Mint Julep, Sazerac, Rusty Nail, Rob Roy, Godfather, Boulevardier, Paper Plane

### Irish Whiskey Drinks
- Irish Coffee

### Distilled Wine Drinks (Brandy/Cognac/Armagnac)
- Sidecar, Brandy Alexander, Brandy Sour, Brandy Fizz, Brandy Smash, Vieux Carré, French Connection

### Champagne/Prosecco Drinks
- Aperol Spritz, St. Germain Cocktail, Limoncello Spritz, Bellini, Mimosa, French 75

### Specialty Spirits
- Caipirinha (Cachaça), Pisco Sour (Pisco)

### Liqueur-Based Drinks
- Amaretto Sour, Midori Sour, Grasshopper, Kahlúa & Cream, Kahlúa Frappé, Kahlúa Hot Chocolate

### Complex Cocktails
- Long Island Iced Tea, Mudslide, Vesper, Penicillin

### Non-Alcoholic Options
- Virgin Mojito, Shirley Temple, Virgin Piña Colada

## Design Features

- **Dark Theme**: Professional black/dark gray background perfect for bars
- **Large Buttons**: Easy to tap even in busy environments
- **Clear Typography**: High contrast text for readability
- **Responsive Layout**: Works on various screen sizes
- **Smooth Navigation**: Intuitive flow between screens

## Usage

1. Tap "Find a Drink" to start
2. Answer the four questions about your preferences:
   - Select your base spirit
   - Choose a liqueur (or None)
   - Pick your flavor profile
   - Choose strength level
3. View personalized drink recommendations that match your exact selections
4. Each question only shows options that will lead to valid drink recommendations

## Key Features

- **Professional Bartender Logic**: Spirits organized by proper bartender categories and relationships
- **Sipping Spirit Recognition**: Premium spirits get special handling with educational messages
- **Cascading Filtering**: Each question only shows options that lead to valid drinks
- **Smart Navigation**: Questions adapt dynamically based on previous selections
- **Always Valid Results**: Users never encounter "no drinks available" scenarios
- **Flexible Selection**: Start with either base spirit or liqueur
- **Comprehensive Coverage**: 60+ drinks covering all major combinations
- **Professional Interface**: Optimized for busy bar environments

Perfect for bartenders who need accurate drink suggestions or customers looking to explore new flavors!
