import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// Comprehensive Drink Database
const drinkDatabase = [
  // Vodka Drinks
  { name: "Vodka Cranberry", base: "Vodka", liqueur: "None", flavor: "Fruity", strength: "Light", description: "Crisp vodka meets tart cranberry in a vibrant ruby embrace. Bright berry notes dance with citrus undertones, creating a refreshing, fruit-forward profile. Clean, thirst-quenching finish with a subtle sweetness. Perfect for casual gatherings and warm evenings.", ingredients: ["2 oz Vodka", "4 oz Cranberry Juice", "Lime wedge"] },
  { name: "Cosmopolitan", base: "Vodka", liqueur: "Cointreau", flavor: "Sweet", strength: "Medium", description: "Sophisticated pink elegance with citrus complexity. Vodka's clean foundation enhanced by Cointreau's orange liqueur warmth and cranberry's tart berry notes. Balanced sweet-tart profile with a smooth, refined finish. Timeless glamour in a glass.", ingredients: ["2 oz Vodka", "1 oz Cointreau", "1 oz Lime juice", "1 oz Cranberry juice"] },
  { name: "Bloody Mary", base: "Vodka", liqueur: "None", flavor: "Spicy", strength: "Medium", description: "Bold and savory with complex umami depth. Rich tomato foundation layered with Worcestershire's tang, hot sauce's warming spice, and vodka's clean spirit. Robust, full-bodied with a lingering peppery finish. The ultimate brunch companion.", ingredients: ["2 oz Vodka", "4 oz Tomato juice", "Worcestershire sauce", "Hot sauce", "Salt & pepper", "Celery stalk"] },
  { name: "Vodka Martini", base: "Vodka", liqueur: "Dry Vermouth", flavor: "Bitter", strength: "Strong", description: "Crisp and clean with sophisticated simplicity. Premium vodka's smooth character enhanced by dry vermouth's herbal whisper. Silky texture with a bone-dry finish and lingering botanical notes. Pure elegance in its most refined form.", ingredients: ["3 oz Vodka", "0.5 oz Dry vermouth", "Olive or lemon twist"] },
  { name: "Dirty Martini", base: "Vodka", liqueur: "Dry Vermouth", flavor: "Herbal", strength: "Strong", description: "Bold and briny with savory sophistication. Vodka's clean base meets dry vermouth's herbal notes and olive brine's salty complexity. Rich, full-bodied with an umami-rich finish and lingering savory depth. For those who appreciate bold flavors.", ingredients: ["3 oz Vodka", "0.5 oz Dry vermouth", "0.5 oz Olive brine", "Olives"] },
  { name: "Moscow Mule", base: "Vodka", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Spicy ginger meets crisp vodka in perfect harmony. Warming ginger beer's fiery notes balanced by lime's bright citrus and vodka's clean spirit. Effervescent, invigorating with a spicy-sweet finish. Refreshing and energizing.", ingredients: ["2 oz Vodka", "4 oz Ginger beer", "0.5 oz Lime juice", "Lime wedge"] },
  { name: "White Russian", base: "Vodka", liqueur: "Kahlúa", flavor: "Creamy", strength: "Medium", description: "Luxuriously smooth with coffee cream elegance. Vodka's clean spirit meets Kahlúa's rich coffee liqueur and heavy cream's velvety texture. Silky, dessert-like with notes of vanilla and dark roast. Indulgent and comforting.", ingredients: ["2 oz Vodka", "1 oz Kahlúa", "1 oz Heavy cream"] },
  { name: "Black Russian", base: "Vodka", liqueur: "Kahlúa", flavor: "Bitter", strength: "Strong", description: "Bold and intense with coffee spirit depth. Clean vodka foundation enhanced by Kahlúa's rich coffee liqueur complexity. Robust, full-bodied with dark roast notes and a lingering coffee finish. Strong and sophisticated.", ingredients: ["2 oz Vodka", "1 oz Kahlúa"] },
  { name: "Espresso Martini", base: "Vodka", liqueur: "Kahlúa", flavor: "Bitter", strength: "Strong", description: "Rich coffee meets premium vodka in caffeinated elegance. Fresh espresso's bold intensity balanced by Kahlúa's sweet coffee liqueur and vodka's smooth spirit. Full-bodied with a creamy foam crown and lingering coffee finish. Perfect nightcap or pick-me-up.", ingredients: ["2 oz Vodka", "1 oz Kahlúa", "1 oz Fresh espresso", "Coffee beans"] },
  { name: "Lemon Drop", base: "Vodka", liqueur: "Triple Sec", flavor: "Sour", strength: "Medium", description: "Bright citrus perfection with a sweet sugar rim. Vodka's clean character enhanced by triple sec's orange warmth and fresh lemon's tart vibrancy. Balanced sweet-tart profile with a refreshing, citrus-forward finish. The ultimate lemon lover's cocktail.", ingredients: ["2 oz Vodka", "1 oz Triple sec", "1 oz Lemon juice", "Sugar rim", "Lemon twist"] },
  { name: "Kamikaze", base: "Vodka", liqueur: "Triple Sec", flavor: "Sour", strength: "Strong", description: "Bold and intense with citrus power. Vodka's clean strength enhanced by triple sec's orange sweetness and lime's bright acidity. Sharp, tart profile with a clean, refreshing finish. A cocktail that packs a punch.", ingredients: ["2 oz Vodka", "1 oz Triple sec", "1 oz Lime juice"] },
  { name: "Sea Breeze", base: "Vodka", liqueur: "None", flavor: "Refreshing", strength: "Light", description: "Oceanic refreshment with tropical fruit harmony. Vodka's clean character enhanced by cranberry's tart berry notes and grapefruit's bright citrus. Light, bubbly texture with a crisp, thirst-quenching finish. Perfect beachside companion.", ingredients: ["2 oz Vodka", "4 oz Cranberry juice", "2 oz Grapefruit juice", "Lime wedge"] },
  { name: "Bay Breeze", base: "Vodka", liqueur: "None", flavor: "Sweet", strength: "Light", description: "Tropical paradise with sweet fruit symphony. Vodka's clean foundation enhanced by cranberry's tart berry notes and pineapple's tropical sweetness. Light, fruity with a smooth, refreshing finish. Island vibes in every sip.", ingredients: ["2 oz Vodka", "4 oz Cranberry juice", "2 oz Pineapple juice", "Pineapple wedge"] },
  { name: "Vesper Martini", base: "Vodka", liqueur: "Dry Vermouth", flavor: "Herbal", strength: "Strong", description: "Bond's sophistication with gin and vodka's refined power. Vodka's clean strength enhanced by gin's botanical complexity and Lillet's herbal elegance. Rich, full-bodied with layers of spirit complexity and a lingering, mysterious finish. Shaken, not stirred.", ingredients: ["3 oz Vodka", "1 oz Gin", "0.5 oz Lillet Blanc", "Lemon twist"] },
  { name: "Vodka Gimlet", base: "Vodka", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Crisp and clean with citrus brightness. Vodka's smooth character enhanced by lime's tart vibrancy and simple syrup's gentle sweetness. Refreshing, herbaceous with a clean, citrus-forward finish. Perfect for warm evenings.", ingredients: ["2 oz Vodka", "0.75 oz Lime juice", "0.75 oz Simple syrup", "Lime wedge"] },
  { name: "Screwdriver", base: "Vodka", liqueur: "None", flavor: "Sweet", strength: "Light", description: "Simple elegance with orange sunshine. Vodka's clean character enhanced by fresh orange juice's citrus sweetness. Light, fruity with a smooth, refreshing finish. The ultimate brunch companion.", ingredients: ["2 oz Vodka", "4 oz Orange juice", "Orange slice"] },
  { name: "Greyhound", base: "Vodka", liqueur: "None", flavor: "Refreshing", strength: "Light", description: "Bitter-sweet refreshment with grapefruit's tart charm. Vodka's clean foundation enhanced by grapefruit's bright citrus and subtle bitterness. Light, refreshing with a crisp, thirst-quenching finish. Perfect for afternoon sipping.", ingredients: ["2 oz Vodka", "4 oz Grapefruit juice", "Lime wedge"] },
  { name: "Chi Chi", base: "Vodka", liqueur: "None", flavor: "Creamy", strength: "Medium", description: "Tropical creaminess with pineapple paradise. Vodka's clean character enhanced by pineapple's tropical sweetness and coconut cream's velvety richness. Luxuriously smooth with a sweet, vacation-worthy finish. Hawaii's vodka dream.", ingredients: ["2 oz Vodka", "2 oz Pineapple juice", "1 oz Coconut cream", "Pineapple wedge"] },
  { name: "Harvey Wallbanger", base: "Vodka", liqueur: "Galliano", flavor: "Herbal", strength: "Medium", description: "Herbal sophistication with Italian elegance. Vodka's clean foundation enhanced by orange juice's citrus sunshine and Galliano's anise-herbal complexity. Rich, full-bodied with layers of herbal sweetness and a lingering, contemplative finish. The ultimate Italian-American classic.", ingredients: ["2 oz Vodka", "4 oz Orange juice", "0.5 oz Galliano", "Orange slice"] },

  // Gin Drinks
  { name: "Gin & Tonic", base: "Gin", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Classic botanical elegance with effervescent charm. Gin's juniper-forward notes dance with tonic's bitter quinine and lime's bright citrus. Crisp, clean mouthfeel with a refreshing, thirst-quenching finish. Timeless sophistication in its purest form.", ingredients: ["2 oz Gin", "4 oz Tonic water", "Lime wedge"] },
  { name: "Negroni", base: "Gin", liqueur: "Campari", flavor: "Bitter", strength: "Strong", description: "Bold and bittersweet with striking ruby elegance. Gin's botanical complexity meets Campari's bitter orange intensity and sweet vermouth's herbal warmth. Rich, full-bodied with layers of bitter-sweet harmony and a lingering, contemplative finish. The aperitif of champions.", ingredients: ["1 oz Gin", "1 oz Campari", "1 oz Sweet vermouth", "Orange peel"] },
  { name: "Negroni Sbagliato", base: "Gin", liqueur: "Campari", flavor: "Bitter", strength: "Light", description: "Effervescent elegance with bittersweet sophistication. Prosecco's lively bubbles meet Campari's bitter orange notes and sweet vermouth's herbal complexity. Lighter, more playful than the classic with a crisp, refreshing finish. Perfect for aperitivo hour.", ingredients: ["1 oz Campari", "1 oz Sweet vermouth", "3 oz Prosecco", "Orange peel"] },
  { name: "Gin Fizz", base: "Gin", liqueur: "None", flavor: "Fruity", strength: "Light", description: "Bright citrus meets botanical gin in effervescent harmony. Fresh lemon's tart brightness balanced by simple syrup's sweetness and gin's juniper complexity. Light, bubbly texture with a clean, refreshing finish. Classic refreshment with timeless appeal.", ingredients: ["2 oz Gin", "1 oz Lemon juice", "1 oz Simple syrup", "Club soda"] },
  { name: "Aviation", base: "Gin", liqueur: "Maraschino", flavor: "Herbal", strength: "Medium", description: "Ethereal floral elegance with sky-blue sophistication. Gin's botanical foundation enhanced by maraschino's cherry notes and crème de violette's floral whisper. Delicate, complex with a smooth, refined finish and subtle floral aftertaste. A cocktail that soars.", ingredients: ["2 oz Gin", "0.5 oz Maraschino liqueur", "0.25 oz Crème de violette", "0.25 oz Lemon juice"] },
  { name: "Tom Collins", base: "Gin", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Tall, refreshing classic with citrus brightness. Gin's clean botanical character meets fresh lemon's tart vibrancy and simple syrup's gentle sweetness. Effervescent, thirst-quenching with a crisp, clean finish. The perfect summer companion.", ingredients: ["2 oz Gin", "1 oz Lemon juice", "0.5 oz Simple syrup", "Club soda"] },
  { name: "Bramble", base: "Gin", liqueur: "Crème de Mûre", flavor: "Sour", strength: "Medium", description: "Dark berry elegance with gin's botanical sophistication. Gin's juniper foundation enhanced by lemon's tart brightness and crème de mûre's blackberry richness. Complex layers of sweet and sour with a lingering berry finish. London's modern classic.", ingredients: ["2 oz Gin", "1 oz Lemon juice", "0.5 oz Simple syrup", "0.5 oz Crème de mûre", "Blackberry"] },
  { name: "Gimlet", base: "Gin", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Classic gin sophistication with lime's tart charm. Gin's botanical character enhanced by lime's bright acidity and simple syrup's gentle sweetness. Refreshing, herbaceous with a clean, citrus-forward finish. The ultimate gin refresher.", ingredients: ["2 oz Gin", "0.75 oz Lime juice", "0.75 oz Simple syrup", "Lime wedge"] },
  { name: "Vesper", base: "Gin", liqueur: "Dry Vermouth", flavor: "Herbal", strength: "Strong", description: "Bond's sophistication with gin and vodka's refined power. Gin's botanical complexity enhanced by vodka's clean strength and Lillet's herbal elegance. Rich, full-bodied with layers of spirit complexity and a lingering, mysterious finish. Shaken, not stirred.", ingredients: ["3 oz Gin", "1 oz Vodka", "0.5 oz Lillet Blanc", "Lemon twist"] },
  { name: "Martinez", base: "Gin", liqueur: "Sweet Vermouth", flavor: "Herbal", strength: "Medium", description: "Pre-Prohibition elegance with gin's botanical sophistication. Gin's juniper foundation enhanced by sweet vermouth's herbal warmth and maraschino's cherry notes. Rich, complex with layers of herbal sweetness and a lingering, contemplative finish. The Manhattan's gin cousin.", ingredients: ["2 oz Gin", "1 oz Sweet vermouth", "0.25 oz Maraschino", "2 dashes Angostura bitters", "Orange peel"] },
  { name: "Hanky Panky", base: "Gin", liqueur: "Sweet Vermouth", flavor: "Herbal", strength: "Strong", description: "Bold herbal complexity with Fernet's mysterious allure. Gin's botanical character enhanced by sweet vermouth's herbal warmth and Fernet-Branca's bitter complexity. Rich, full-bodied with layers of herbal sophistication and a lingering, contemplative finish. The ultimate herbal cocktail.", ingredients: ["1.5 oz Gin", "1.5 oz Sweet vermouth", "2 dashes Fernet-Branca", "Orange peel"] },
  { name: "Bijou", base: "Gin", liqueur: "Sweet Vermouth", flavor: "Herbal", strength: "Strong", description: "Jewel-toned sophistication with Chartreuse's herbal mystery. Gin's botanical foundation enhanced by sweet vermouth's herbal warmth and green Chartreuse's complex herbal notes. Rich, complex with layers of herbal sophistication and a lingering, contemplative finish. A cocktail that sparkles.", ingredients: ["1 oz Gin", "1 oz Sweet vermouth", "1 oz Green Chartreuse", "2 dashes Orange bitters", "Cherry"] },
  { name: "Singapore Sling", base: "Gin", liqueur: "Cointreau", flavor: "Sweet", strength: "Medium", description: "Tropical elegance with cherry's fruity charm. Gin's botanical foundation enhanced by cherry liqueur's sweet berry notes, Cointreau's orange warmth, and pineapple's tropical sunshine. Rich, fruity with layers of tropical complexity and a smooth, vacation-worthy finish. Singapore's liquid heritage.", ingredients: ["1.5 oz Gin", "0.5 oz Cherry liqueur", "0.25 oz Cointreau", "0.5 oz Lime juice", "4 oz Pineapple juice", "0.25 oz Grenadine", "Cherry"] },
  { name: "Silver Fizz", base: "Gin", liqueur: "None", flavor: "Creamy", strength: "Light", description: "Luxuriously creamy with egg white's velvety texture. Gin's botanical foundation enhanced by lemon's tart brightness and egg white's silky smoothness. Light, frothy with a clean, refreshing finish and creamy crown. The ultimate gin fizz.", ingredients: ["2 oz Gin", "1 oz Lemon juice", "0.5 oz Simple syrup", "1 Egg white", "Club soda"] },

  // Rum Drinks
  { name: "Mojito", base: "Rum (Light)", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Vibrant and effervescent with fresh mint and bright lime zest. Crisp rum foundation balanced by natural cane sweetness and cooling mint's herbal freshness. Refreshing herbaceous notes dance on the palate. Light, invigorating finish perfect for warm afternoons.", ingredients: ["2 oz White rum", "1 oz Lime juice", "2 tsp Sugar", "6-8 Mint leaves", "Club soda"] },
  { name: "Piña Colada", base: "Rum (Light)", liqueur: "None", flavor: "Sweet", strength: "Medium", description: "Tropical paradise in a creamy, dreamy embrace. Rich coconut cream meets sweet pineapple's tropical sunshine and rum's warm Caribbean spirit. Luxuriously smooth texture with a sweet, vacation-worthy finish. Escape to the islands in every sip.", ingredients: ["2 oz White rum", "2 oz Coconut cream", "2 oz Pineapple juice", "Pineapple wedge"] },
  { name: "Daiquiri", base: "Rum (Light)", liqueur: "None", flavor: "Sour", strength: "Medium", description: "Classic Cuban elegance with perfect sour balance. Rum's warm tropical character meets fresh lime's bright acidity and simple syrup's gentle sweetness. Clean, crisp mouthfeel with a refreshing, citrus-forward finish. Hemingway's favorite, perfectly refined.", ingredients: ["2 oz White rum", "1 oz Lime juice", "0.5 oz Simple syrup"] },
  { name: "Dark & Stormy", base: "Rum (Dark)", liqueur: "None", flavor: "Spicy", strength: "Medium", description: "Bold and stormy with ginger's fiery embrace. Rich dark rum's molasses depth meets spicy ginger beer's warming intensity and lime's bright citrus contrast. Full-bodied with a spicy-sweet finish and lingering warmth. A cocktail with character and depth.", ingredients: ["2 oz Dark rum", "4 oz Ginger beer", "Lime wedge"] },
  { name: "Mai Tai", base: "Rum (Light)", liqueur: "Triple Sec", flavor: "Fruity", strength: "Strong", description: "Tropical sophistication with complex rum harmony. Multiple rums' layered complexity enhanced by orange liqueur's warmth, orgeat's almond sweetness, and lime's bright acidity. Rich, full-bodied with a sweet-tart balance and lingering tropical finish. The king of tiki cocktails.", ingredients: ["1 oz White rum", "1 oz Dark rum", "0.5 oz Triple sec", "0.5 oz Orgeat syrup", "0.5 oz Lime juice", "Dark rum float"] },
  { name: "Zombie", base: "Rum (Light)", liqueur: "None", flavor: "Fruity", strength: "Strong", description: "Powerful tropical intensity with layered rum complexity. Multiple rums' combined strength meets grapefruit's tart brightness, lime's citrus vibrancy, and cinnamon's warming spice. Bold, full-bodied with a complex, lingering finish. Proceed with caution - this one bites back.", ingredients: ["1 oz White rum", "1 oz Dark rum", "1 oz Overproof rum", "0.5 oz Lime juice", "0.5 oz Grapefruit juice", "0.5 oz Cinnamon syrup"] },
  { name: "Cuba Libre", base: "Rum (Light)", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Simple elegance with refreshing cola harmony. Rum's warm tropical character meets cola's sweet caramel notes and lime's bright citrus accent. Smooth, easy-drinking with a clean, refreshing finish. Classic simplicity at its finest.", ingredients: ["2 oz White rum", "4 oz Cola", "Lime wedge"] },
  { name: "Between the Sheets", base: "Rum (Light)", liqueur: "Cointreau", flavor: "Sour", strength: "Strong", description: "Sophisticated complexity with cognac's refined elegance. Light rum's tropical character enhanced by cognac's oak complexity and Cointreau's orange warmth. Rich, full-bodied with layers of spirit sophistication and a lingering, contemplative finish. The ultimate rum-cognac harmony.", ingredients: ["1 oz White rum", "1 oz Cognac", "1 oz Cointreau", "0.5 oz Lemon juice"] },
  { name: "Hemingway Daiquiri", base: "Rum (Light)", liqueur: "Maraschino", flavor: "Refreshing", strength: "Medium", description: "Literary elegance with grapefruit's tart sophistication. Light rum's tropical character enhanced by grapefruit's bitter-sweet notes, lime's bright acidity, and maraschino's cherry complexity. Clean, crisp with a refreshing, citrus-forward finish. Papa's perfect cocktail.", ingredients: ["2 oz White rum", "0.75 oz Grapefruit juice", "0.5 oz Lime juice", "0.25 oz Maraschino"] },
  { name: "El Presidente", base: "Rum (Light)", liqueur: "Curaçao", flavor: "Herbal", strength: "Medium", description: "Presidential sophistication with vermouth's herbal elegance. Light rum's tropical character enhanced by dry vermouth's herbal complexity, Curaçao's orange warmth, and grenadine's sweet berry notes. Rich, complex with layers of herbal sweetness and a smooth, refined finish. Cuba's presidential cocktail.", ingredients: ["2 oz White rum", "0.75 oz Dry vermouth", "0.5 oz Curaçao", "0.25 oz Grenadine", "Orange peel"] },
  { name: "Bacardi Cocktail", base: "Rum (Light)", liqueur: "None", flavor: "Sweet", strength: "Medium", description: "Classic Cuban elegance with grenadine's sweet charm. Light rum's tropical character enhanced by lime's tart brightness and grenadine's pomegranate sweetness. Balanced sweet-tart profile with a smooth, refreshing finish. The original rum sour.", ingredients: ["2 oz White rum", "1 oz Lime juice", "0.5 oz Grenadine", "0.5 oz Simple syrup", "Lime wedge"] },
  { name: "Mary Pickford", base: "Rum (Light)", liqueur: "Maraschino", flavor: "Sweet", strength: "Light", description: "Hollywood glamour with pineapple's tropical charm. Light rum's tropical character enhanced by pineapple's sweet sunshine, grenadine's berry notes, and maraschino's cherry complexity. Light, fruity with a smooth, vacation-worthy finish. Silent film star's signature cocktail.", ingredients: ["2 oz White rum", "1 oz Pineapple juice", "0.25 oz Grenadine", "0.25 oz Maraschino", "Cherry"] },
  { name: "Jungle Bird", base: "Rum (Dark)", liqueur: "Campari", flavor: "Bitter", strength: "Medium", description: "Tropical bitterness with Campari's sophisticated allure. Dark rum's rich molasses character enhanced by Campari's bitter orange intensity, pineapple's tropical sweetness, and lime's bright acidity. Complex layers of bitter-sweet harmony with a lingering, contemplative finish. Malaysia's exotic bird.", ingredients: ["1.5 oz Dark rum", "0.75 oz Campari", "1.5 oz Pineapple juice", "0.5 oz Lime juice", "Pineapple wedge"] },
  { name: "Ti' Punch", base: "Rum (Dark)", liqueur: "None", flavor: "Sour", strength: "Strong", description: "Caribbean tradition with rhum agricole's rustic elegance. Rhum agricole's sugarcane character enhanced by lime's tart brightness and cane syrup's natural sweetness. Rustic, refreshing with a clean, citrus-forward finish. Martinique's spirited gift.", ingredients: ["2 oz Rhum agricole", "0.5 Lime (quartered)", "1 tsp Cane syrup"] },
  { name: "Painkiller", base: "Rum (Dark)", liqueur: "None", flavor: "Creamy", strength: "Medium", description: "Tropical paradise with coconut cream's luxurious embrace. Dark rum's rich molasses character enhanced by pineapple's tropical sunshine, orange's citrus brightness, and coconut cream's velvety richness. Luxuriously smooth with a sweet, vacation-worthy finish. The British Virgin Islands' liquid therapy.", ingredients: ["2 oz Dark rum", "4 oz Pineapple juice", "1 oz Orange juice", "1 oz Coconut cream", "Nutmeg", "Pineapple wedge"] },
  { name: "Rum Runner", base: "Rum (Dark)", liqueur: "Blackberry Liqueur", flavor: "Sweet", strength: "Medium", description: "Tropical fruit symphony with blackberry's dark allure. Dark rum's rich molasses character enhanced by blackberry liqueur's berry richness, banana liqueur's tropical sweetness, and citrus brightness. Rich, fruity with layers of tropical complexity and a smooth, island-worthy finish. The ultimate tropical escape.", ingredients: ["1 oz Dark rum", "0.5 oz Blackberry liqueur", "0.5 oz Banana liqueur", "1 oz Orange juice", "1 oz Pineapple juice", "0.5 oz Lime juice", "Cherry"] },
  { name: "Hot Buttered Rum", base: "Rum (Dark)", liqueur: "None", flavor: "Spicy", strength: "Medium", description: "Winter warmth with butter's luxurious embrace. Dark rum's rich molasses character enhanced by butter's creamy richness, brown sugar's caramel sweetness, and warming spices. Luxuriously smooth with notes of vanilla, cinnamon, and nutmeg. The ultimate winter warmer.", ingredients: ["2 oz Dark rum", "1 tbsp Butter", "1 tbsp Brown sugar", "6 oz Hot water", "Cinnamon", "Nutmeg"] },
  { name: "Navy Grog", base: "Rum (Light)", liqueur: "None", flavor: "Sour", strength: "Strong", description: "Naval strength with citrus power. Multiple rums' combined strength enhanced by lime's tart brightness, grapefruit's bitter-sweet notes, and honey's natural sweetness. Bold, full-bodied with a complex, lingering finish. Admiral's choice for rough seas.", ingredients: ["1 oz White rum", "1 oz Dark rum", "1 oz Overproof rum", "0.5 oz Lime juice", "0.5 oz Grapefruit juice", "0.5 oz Honey syrup"] },
  { name: "Scorpion Bowl", base: "Rum (Light)", liqueur: "None", flavor: "Sweet", strength: "Strong", description: "Tiki power with brandy's sophisticated strength. Multiple rums' combined strength enhanced by brandy's oak complexity, orgeat's almond sweetness, and citrus brightness. Rich, full-bodied with layers of tropical complexity and a lingering, stormy finish. The ultimate tiki punch.", ingredients: ["1 oz White rum", "1 oz Dark rum", "0.5 oz Brandy", "1 oz Orange juice", "1 oz Lemon juice", "0.5 oz Orgeat syrup", "Pineapple wedge"] },
  { name: "Rum Swizzle", base: "Rum (Light)", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Caribbean refreshment with pineapple's tropical charm. Light rum's tropical character enhanced by lime's tart brightness, pineapple's sweet sunshine, and bitters' herbal complexity. Refreshing, herbaceous with a clean, citrus-forward finish. Bermuda's cooling classic.", ingredients: ["2 oz White rum", "0.75 oz Lime juice", "0.75 oz Pineapple juice", "0.5 oz Simple syrup", "2 dashes Angostura bitters", "Pineapple wedge"] },
  { name: "Cable Car", base: "Rum (Light)", liqueur: "Orange Curaçao", flavor: "Spicy", strength: "Medium", description: "San Francisco sophistication with spiced rum's warming embrace. Spiced rum's cinnamon-clove character enhanced by orange curaçao's citrus warmth and lemon's tart brightness. Complex layers of spice and citrus with a smooth, warming finish. The City by the Bay's signature cocktail.", ingredients: ["2 oz Spiced rum", "0.5 oz Orange curaçao", "0.75 oz Lemon juice", "0.5 oz Simple syrup", "Cinnamon", "Orange peel"] },

  // Tequila Drinks
  { name: "Margarita", base: "Tequila (Blanco)", liqueur: "Cointreau", flavor: "Sour", strength: "Medium", description: "Bright agave spirit meets tart lime in perfect harmony. Smooth tequila character enhanced by orange liqueur, creating layers of citrus complexity. Balanced sweet-tart profile with a crisp, clean finish and subtle salt accent. Mexico's gift to the world.", ingredients: ["2 oz Tequila", "1 oz Lime juice", "1 oz Cointreau", "Salt rim"] },
  { name: "Spicy Margarita", base: "Tequila (Blanco)", liqueur: "Cointreau", flavor: "Spicy", strength: "Medium", description: "Bold and fiery with jalapeño's warming embrace. Tequila's agave character enhanced by lime's tart brightness and jalapeño's spicy heat. Complex layers of sweet, sour, and spice with a lingering, warming finish. For those who like it hot.", ingredients: ["2 oz Tequila", "1 oz Lime juice", "1 oz Cointreau", "2-3 Jalapeño slices", "Salt rim"] },
  { name: "Paloma", base: "Tequila (Blanco)", liqueur: "None", flavor: "Refreshing", strength: "Light", description: "Effervescent grapefruit meets smooth tequila in refreshing harmony. Agave spirit's clean character enhanced by grapefruit's tart sweetness and lime's bright citrus notes. Light, bubbly texture with a crisp, thirst-quenching finish. Mexico's lighter, brighter classic.", ingredients: ["2 oz Tequila", "4 oz Grapefruit soda", "0.5 oz Lime juice", "Salt rim"] },
  { name: "Tequila Sunrise", base: "Tequila (Blanco)", liqueur: "None", flavor: "Fruity", strength: "Medium", description: "Sunset in a glass with layered tropical beauty. Smooth tequila meets sweet orange juice's citrus sunshine and grenadine's ruby sunset glow. Sweet, fruity profile with a smooth, tropical finish. A visual and flavorful masterpiece.", ingredients: ["2 oz Tequila", "4 oz Orange juice", "0.5 oz Grenadine"] },
  { name: "Batanga", base: "Tequila (Blanco)", liqueur: "None", flavor: "Sweet", strength: "Light", description: "Mexican simplicity with cola's familiar comfort. Blanco tequila's clean agave character enhanced by Coca-Cola's sweet caramel notes and lime's bright citrus accent. Smooth, easy-drinking with a clean, refreshing finish. Mexico's answer to Cuba Libre.", ingredients: ["2 oz Tequila", "4 oz Coca-Cola", "0.5 oz Lime juice", "Lime wedge"] },
  { name: "Tequila Collins", base: "Tequila (Blanco)", liqueur: "None", flavor: "Refreshing", strength: "Light", description: "Tall, refreshing classic with agave brightness. Blanco tequila's clean character enhanced by lemon's tart vibrancy and simple syrup's gentle sweetness. Effervescent, thirst-quenching with a crisp, clean finish. The perfect summer agave companion.", ingredients: ["2 oz Tequila", "1 oz Lemon juice", "0.5 oz Simple syrup", "Club soda", "Lemon wedge"] },
  { name: "Cantarito", base: "Tequila (Blanco)", liqueur: "None", flavor: "Refreshing", strength: "Light", description: "Mexican citrus symphony with grapefruit soda's effervescent charm. Blanco tequila's clean agave character enhanced by citrus juices' bright vibrancy and grapefruit soda's tart sweetness. Light, bubbly texture with a crisp, thirst-quenching finish. Jalisco's refreshing classic.", ingredients: ["2 oz Tequila", "0.5 oz Lime juice", "0.5 oz Lemon juice", "0.5 oz Orange juice", "3 oz Grapefruit soda", "Salt rim"] },
  { name: "Tommy's Margarita", base: "Tequila (Blanco)", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Pure agave elegance with agave nectar's natural sweetness. Blanco tequila's clean character enhanced by lime's tart brightness and agave nectar's natural sweetness. Clean, crisp with a refreshing, citrus-forward finish. San Francisco's agave-forward classic.", ingredients: ["2 oz Tequila", "1 oz Lime juice", "0.5 oz Agave nectar", "Salt rim"] },
  { name: "Ranch Water", base: "Tequila (Blanco)", liqueur: "None", flavor: "Refreshing", strength: "Light", description: "West Texas simplicity with mineral water's crisp refreshment. Blanco tequila's clean agave character enhanced by lime's tart brightness and Topo Chico's effervescent crispness. Light, refreshing with a clean, thirst-quenching finish. Texas ranch hand's perfect companion.", ingredients: ["2 oz Tequila", "0.5 oz Lime juice", "Topo Chico", "Lime wedge"] },
  { name: "Añejo Old Fashioned", base: "Tequila (Reposado)", liqueur: "None", flavor: "Sweet", strength: "Strong", description: "Mexican sophistication with agave's natural sweetness. Reposado tequila's oak complexity enhanced by agave nectar's natural sweetness and bitters' herbal spice. Rich, complex with layers of oak and agave, finished with bitters' herbal complexity. Mexico's gift to the Old Fashioned.", ingredients: ["2 oz Reposado tequila", "0.25 oz Agave nectar", "2 dashes Angostura bitters", "Orange peel"] },
  { name: "Rosita", base: "Tequila (Reposado)", liqueur: "Campari", flavor: "Herbal", strength: "Medium", description: "Mexican Negroni with reposado's oak sophistication. Reposado tequila's oak complexity enhanced by Campari's bitter orange intensity and vermouth's herbal warmth. Rich, complex with layers of bitter-sweet harmony and a lingering, contemplative finish. Mexico's bitter aperitif.", ingredients: ["1.5 oz Reposado tequila", "0.75 oz Campari", "0.75 oz Sweet vermouth", "0.75 oz Dry vermouth", "Orange peel"] },
  { name: "Oaxacan Old Fashioned", base: "Tequila (Reposado)", liqueur: "None", flavor: "Smoky", strength: "Strong", description: "Smoky sophistication with agave's ancient wisdom. Reposado tequila's oak complexity enhanced by mezcal's distinctive smoke character and agave nectar's natural sweetness. Rich, complex with layers of smoke and oak, finished with bitters' herbal complexity. Oaxaca's gift to the Old Fashioned.", ingredients: ["1.5 oz Reposado tequila", "0.5 oz Mezcal", "0.25 oz Agave nectar", "2 dashes Angostura bitters", "Orange peel"] },
  { name: "Tequila Manhattan", base: "Tequila (Añejo)", liqueur: "Sweet Vermouth", flavor: "Herbal", strength: "Strong", description: "Mexican elegance with Manhattan sophistication. Añejo tequila's oak complexity enhanced by sweet vermouth's herbal warmth and aromatic bitters' spice. Rich, full-bodied with layers of oak and sweetness. Mexico's gift to Manhattan culture.", ingredients: ["2 oz Añejo tequila", "1 oz Sweet vermouth", "2 dashes Angostura bitters", "Cherry"] },
  { name: "Añejo Sour", base: "Tequila (Añejo)", liqueur: "None", flavor: "Creamy", strength: "Medium", description: "Mexican sophistication with egg white's creamy elegance. Añejo tequila's oak complexity enhanced by lemon's tart brightness and egg white's velvety texture. Smooth, well-rounded with a frothy crown and lingering oak finish. Mexico's refined sour.", ingredients: ["2 oz Añejo tequila", "1 oz Lemon juice", "0.5 oz Simple syrup", "1 Egg white", "Angostura bitters"] },
  { name: "Tequila Old Fashioned", base: "Tequila (Añejo)", liqueur: "None", flavor: "Sweet", strength: "Strong", description: "Mexican refinement with agave's natural sweetness. Añejo tequila's oak complexity enhanced by agave nectar's natural sweetness and bitters' herbal spice. Rich, complex with layers of oak and agave, finished with bitters' herbal complexity. Mexico's sophisticated classic.", ingredients: ["2 oz Añejo tequila", "0.25 oz Agave nectar", "2 dashes Angostura bitters", "Orange peel"] },
  { name: "Blood & Sand Variation", base: "Tequila (Añejo)", liqueur: "Sweet Vermouth", flavor: "Herbal", strength: "Medium", description: "Mexican twist on Scottish classic with blood orange's tart sophistication. Añejo tequila's oak complexity enhanced by blood orange's tart sweetness, sweet vermouth's herbal warmth, and cherry liqueur's berry notes. Rich, complex with layers of fruit and oak, finished with herbal complexity. Mexico's blood orange classic.", ingredients: ["1 oz Añejo tequila", "1 oz Blood orange juice", "0.75 oz Sweet vermouth", "0.75 oz Cherry liqueur", "Orange peel"] },

  // Mezcal Drinks
  { name: "Mezcal Mule", base: "Mezcal", liqueur: "None", flavor: "Smoky", strength: "Medium", description: "Smoky sophistication with ginger's fiery embrace. Mezcal's distinctive smoky character meets spicy ginger beer's warming intensity and lime's bright citrus contrast. Complex layers of smoke and spice with a lingering, contemplative finish. For the adventurous spirit.", ingredients: ["2 oz Mezcal", "4 oz Ginger beer", "0.5 oz Lime juice", "Lime wedge"] },
  { name: "Naked & Famous", base: "Mezcal", liqueur: "Chartreuse", flavor: "Herbal", strength: "Strong", description: "Modern sophistication with equal parts herbal complexity. Mezcal's distinctive smoke character enhanced by Aperol's bitter orange notes, Chartreuse's herbal mystery, and lime's bright acidity. Complex layers of smoke, citrus, and herbs with a smooth, contemplative finish. The cocktail that bridges worlds.", ingredients: ["0.75 oz Mezcal", "0.75 oz Aperol", "0.75 oz Chartreuse", "0.75 oz Lime juice"] },
  { name: "Mezcal Paloma", base: "Mezcal", liqueur: "None", flavor: "Refreshing", strength: "Light", description: "Smoky refreshment with grapefruit's tart charm. Mezcal's distinctive smoky character enhanced by grapefruit's bright citrus and lime's tart vibrancy. Light, bubbly texture with a crisp, thirst-quenching finish and smoky undertones. Mexico's smoky grapefruit classic.", ingredients: ["2 oz Mezcal", "4 oz Grapefruit soda", "0.5 oz Lime juice", "Salt rim"] },
  { name: "Mezcal Margarita", base: "Mezcal", liqueur: "Cointreau", flavor: "Sour", strength: "Medium", description: "Smoky sophistication with lime's tart elegance. Mezcal's distinctive smoke character enhanced by Cointreau's orange warmth and lime's bright acidity. Complex layers of smoke and citrus with a smooth, refined finish. Mexico's smoky margarita.", ingredients: ["2 oz Mezcal", "1 oz Lime juice", "1 oz Cointreau", "Salt rim"] },
  { name: "Last of the Oaxacans", base: "Mezcal", liqueur: "Chartreuse", flavor: "Herbal", strength: "Strong", description: "Oaxacan sophistication with Chartreuse's herbal mystery. Mezcal's distinctive smoke character enhanced by green Chartreuse's complex herbal notes, lime's bright acidity, and maraschino's cherry complexity. Rich, complex with layers of smoke and herbal sophistication. Oaxaca's herbal masterpiece.", ingredients: ["0.75 oz Mezcal", "0.75 oz Green Chartreuse", "0.75 oz Lime juice", "0.75 oz Maraschino"] },
  { name: "Smoky Martini", base: "Mezcal", liqueur: "Dry Vermouth", flavor: "Herbal", strength: "Strong", description: "Smoky elegance with vermouth's herbal sophistication. Mezcal's distinctive smoke character enhanced by dry vermouth's herbal complexity and orange bitters' spice. Rich, complex with layers of smoke and herbs with a lingering, contemplative finish. The ultimate smoky martini.", ingredients: ["2 oz Mezcal", "0.5 oz Dry vermouth", "2 dashes Orange bitters", "Orange peel"] },
  { name: "Mezcal Negroni", base: "Mezcal", liqueur: "Campari", flavor: "Bitter", strength: "Strong", description: "Smoky sophistication with Negroni's bitter elegance. Mezcal's distinctive smoke character enhanced by Campari's bitter orange intensity and sweet vermouth's herbal warmth. Rich, full-bodied with layers of smoke and bitter-sweet harmony. Mexico's smoky Negroni.", ingredients: ["1 oz Mezcal", "1 oz Campari", "1 oz Sweet vermouth", "Orange peel"] },
  { name: "Single Village Fix", base: "Mezcal", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Oaxacan refreshment with pineapple's tropical charm. Mezcal's distinctive smoke character enhanced by pineapple's sweet sunshine, lime's tart brightness, and cucumber's cooling freshness. Refreshing, herbaceous with a clean, citrus-forward finish and smoky undertones. Oaxaca's cooling classic.", ingredients: ["2 oz Mezcal", "0.75 oz Pineapple juice", "0.75 oz Lime juice", "0.5 oz Simple syrup", "Cucumber slices"] },

  // Whiskey/Bourbon Drinks
  { name: "Whiskey Sour", base: "Whiskey", liqueur: "None", flavor: "Sour", strength: "Medium", description: "Perfect sour balance with whiskey's warm embrace. Bourbon's rich character enhanced by fresh lemon's tart brightness and simple syrup's gentle sweetness. Smooth, well-rounded with a clean, citrus-forward finish. Classic American elegance.", ingredients: ["2 oz Bourbon", "1 oz Lemon juice", "0.5 oz Simple syrup", "Cherry"] },
  { name: "Manhattan", base: "Whiskey", liqueur: "Sweet Vermouth", flavor: "Bitter", strength: "Strong", description: "Sophisticated elegance with whiskey's refined character. Bourbon's warm depth enhanced by sweet vermouth's herbal complexity and aromatic bitters' spice. Rich, full-bodied with layers of sweet and bitter harmony. New York's gift to cocktail culture.", ingredients: ["2 oz Bourbon", "1 oz Sweet vermouth", "2 dashes Angostura bitters", "Cherry"] },
  { name: "Mint Julep", base: "Bourbon", liqueur: "None", flavor: "Refreshing", strength: "Strong", description: "Kentucky elegance with cooling mint sophistication. Bourbon's rich warmth enhanced by fresh mint's herbal freshness and sugar's gentle sweetness. Refreshing herbaceous notes with a smooth, contemplative finish. The Derby's crown jewel.", ingredients: ["2 oz Bourbon", "2 tsp Sugar", "6-8 Mint leaves", "Crushed ice"] },
  { name: "Sazerac", base: "Rye", liqueur: "None", flavor: "Herbal", strength: "Strong", description: "New Orleans sophistication with absinthe's mysterious allure. Rye whiskey's spicy character enhanced by Peychaud's bitters' herbal complexity and absinthe's anise whisper. Rich, complex layers with a lingering, contemplative finish. The Big Easy's finest.", ingredients: ["2 oz Rye whiskey", "0.25 oz Simple syrup", "2 dashes Peychaud's bitters", "Absinthe rinse", "Lemon peel"] },
  { name: "Rusty Nail", base: "Scotch", liqueur: "Drambuie", flavor: "Herbal", strength: "Strong", description: "Simple sophistication with scotch's refined character. Rich single malt enhanced by Drambuie's honeyed herbal complexity and subtle spice notes. Smooth, warming with a lingering, contemplative finish. Elegance in simplicity.", ingredients: ["2 oz Scotch", "0.5 oz Drambuie", "Lemon peel"] },
  { name: "Rob Roy", base: "Scotch", liqueur: "Sweet Vermouth", flavor: "Bitter", strength: "Strong", description: "Highland elegance with Manhattan sophistication. Scotch's smoky character enhanced by sweet vermouth's herbal warmth and aromatic bitters' spice. Rich, full-bodied with layers of smoke and sweetness. Scotland's gift to cocktail culture.", ingredients: ["2 oz Scotch", "1 oz Sweet vermouth", "2 dashes Angostura bitters", "Cherry"] },
  { name: "Godfather", base: "Scotch", liqueur: "Amaretto", flavor: "Sweet", strength: "Strong", description: "Bold power with sweet sophistication. Scotch's smoky strength meets Amaretto's almond sweetness, creating a complex dance of smoke and marzipan. Rich, full-bodied with a lingering, warming finish. An offer you can't refuse.", ingredients: ["2 oz Scotch", "1 oz Amaretto", "Ice"] },
  { name: "Whiskey Julep", base: "Whiskey", liqueur: "None", flavor: "Herbal", strength: "Strong", description: "Refreshing whiskey elegance with mint's cooling embrace. Whiskey's warm character enhanced by fresh mint's herbal freshness and sugar's gentle sweetness. Cool, refreshing with a smooth, contemplative finish. Summer's whiskey companion.", ingredients: ["2 oz Whiskey", "6-8 Mint leaves", "2 tsp Sugar", "Crushed ice"] },
  { name: "Whiskey Smash", base: "Whiskey", liqueur: "None", flavor: "Herbal", strength: "Medium", description: "Bright whiskey refreshment with mint and citrus harmony. Whiskey's warm character enhanced by fresh mint's herbal notes and lemon's tart brightness. Refreshing, herbaceous with a clean, citrus-forward finish. Perfect for warm evenings.", ingredients: ["2 oz Whiskey", "6-8 Mint leaves", "0.5 oz Simple syrup", "0.5 oz Lemon juice"] },

  // Irish Whiskey Drinks
  { name: "Irish Coffee", base: "Irish Whiskey", liqueur: "None", flavor: "Creamy", strength: "Medium", description: "Warming Irish hospitality with coffee's rich embrace. Smooth Irish whiskey meets hot coffee's bold intensity and cream's velvety richness. Luxuriously smooth with notes of vanilla and oak. The perfect winter warmer.", ingredients: ["1.5 oz Irish whiskey", "6 oz Hot coffee", "1 tsp Sugar", "Heavy cream"] },

  // Distilled Wine Drinks (Brandy/Cognac/Armagnac)
  { name: "Sidecar", base: "Distilled Wine (Brandy/Cognac/Armagnac)", liqueur: "Triple Sec", flavor: "Sour", strength: "Strong", description: "French sophistication with citrus elegance. Cognac's refined complexity enhanced by orange liqueur's warmth and lemon's bright acidity. Rich, full-bodied with layers of fruit and oak, finished with a sugar rim's delicate sweetness. Parisian perfection.", ingredients: ["2 oz Cognac", "1 oz Triple sec", "1 oz Lemon juice", "Sugar rim"] },
  { name: "Brandy Alexander", base: "Distilled Wine (Brandy/Cognac/Armagnac)", liqueur: "Crème de Cacao", flavor: "Creamy", strength: "Medium", description: "Luxuriously decadent with chocolate cream sophistication. Brandy's warm fruit character enhanced by crème de cacao's rich chocolate notes and heavy cream's velvety texture. Silky, dessert-like with notes of vanilla and spice. The ultimate after-dinner indulgence.", ingredients: ["1.5 oz Brandy", "1 oz Crème de cacao", "1 oz Heavy cream", "Nutmeg"] },
  { name: "Brandy Sour", base: "Distilled Wine (Brandy/Cognac/Armagnac)", liqueur: "None", flavor: "Sour", strength: "Medium", description: "Classic sour elegance with brandy's refined character. Warm brandy enhanced by fresh lemon's tart brightness and simple syrup's gentle sweetness. Smooth, well-rounded with a clean, citrus-forward finish. Timeless sophistication.", ingredients: ["2 oz Brandy", "1 oz Lemon juice", "0.5 oz Simple syrup", "Cherry"] },
  { name: "Brandy Fizz", base: "Distilled Wine (Brandy/Cognac/Armagnac)", liqueur: "None", flavor: "Fruity", strength: "Light", description: "Effervescent brandy elegance with citrus brightness. Brandy's warm fruit character enhanced by lemon's tart vibrancy and club soda's refreshing bubbles. Light, bubbly texture with a crisp, clean finish. Perfect for afternoon refreshment.", ingredients: ["2 oz Brandy", "1 oz Lemon juice", "0.5 oz Simple syrup", "Club soda"] },
  { name: "Brandy Smash", base: "Distilled Wine (Brandy/Cognac/Armagnac)", liqueur: "None", flavor: "Herbal", strength: "Medium", description: "Refreshing brandy sophistication with mint's cooling embrace. Brandy's warm character enhanced by fresh mint's herbal freshness and lemon's tart brightness. Cool, herbaceous with a clean, citrus-forward finish. Summer's brandy companion.", ingredients: ["2 oz Brandy", "6-8 Mint leaves", "0.5 oz Simple syrup", "0.5 oz Lemon juice"] },
  { name: "Vieux Carré", base: "Distilled Wine (Brandy/Cognac/Armagnac)", liqueur: "Sweet Vermouth", flavor: "Herbal", strength: "Strong", description: "New Orleans complexity with layered spirit sophistication. Cognac and rye's combined warmth enhanced by sweet vermouth's herbal complexity and Bénédictine's honeyed spice. Rich, full-bodied with complex layers and a lingering, contemplative finish. The French Quarter's finest.", ingredients: ["0.75 oz Cognac", "0.75 oz Rye whiskey", "0.75 oz Sweet vermouth", "0.25 oz Bénédictine", "2 dashes Peychaud's bitters", "2 dashes Angostura bitters"] },

  // Liqueur-Based Drinks
  { name: "Aperol Spritz", base: "Champagne/Prosecco", liqueur: "Aperol", flavor: "Bitter", strength: "Light", description: "Italian aperitivo elegance with effervescent charm. Prosecco's lively bubbles meet Aperol's bitter orange notes and club soda's refreshing crispness. Light, bubbly texture with a bittersweet finish and orange's bright accent. Perfect for aperitivo hour.", ingredients: ["3 oz Prosecco", "2 oz Aperol", "1 oz Club soda", "Orange slice"] },
  { name: "St. Germain Cocktail", base: "Champagne/Prosecco", liqueur: "St. Germain", flavor: "Herbal", strength: "Light", description: "Floral sophistication with elderflower's delicate charm. St. Germain's elderflower elegance enhanced by Prosecco's lively bubbles and club soda's refreshing crispness. Light, floral with a smooth, refined finish. Parisian garden in a glass.", ingredients: ["2 oz St. Germain", "2 oz Prosecco", "2 oz Club soda", "Lemon twist"] },
  { name: "Midori Sour", base: "None", liqueur: "Midori", flavor: "Fruity", strength: "Medium", description: "Vibrant melon elegance with citrus brightness. Midori's sweet melon character enhanced by fresh lemon's tart vibrancy and simple syrup's gentle sweetness. Bright, fruity with a clean, refreshing finish. Tokyo's green delight.", ingredients: ["2 oz Midori", "1 oz Lemon juice", "0.5 oz Simple syrup", "Lime wedge"] },
  { name: "Bellini", base: "Champagne/Prosecco", liqueur: "None", flavor: "Fruity", strength: "Light", description: "Venetian elegance with peach's golden charm. Sweet peach purée meets Prosecco's lively bubbles in perfect harmony. Light, fruity with a smooth, refreshing finish and peach's natural sweetness. Harry's Bar's timeless classic.", ingredients: ["2 oz Peach purée", "4 oz Prosecco", "Peach slice"] },
  { name: "Mimosa", base: "Champagne/Prosecco", liqueur: "None", flavor: "Fruity", strength: "Light", description: "Brunch sophistication with orange's sunny embrace. Fresh orange juice meets Champagne's elegant bubbles in perfect harmony. Light, fruity with a smooth, refreshing finish and citrus's bright vibrancy. The ultimate morning celebration.", ingredients: ["2 oz Orange juice", "4 oz Champagne", "Orange slice"] },
  { name: "French 75", base: "Champagne/Prosecco", liqueur: "None", flavor: "Sweet", strength: "Medium", description: "Parisian elegance with gin's botanical sophistication. Gin's complex character enhanced by lemon's bright acidity and Champagne's elegant bubbles. Rich, effervescent with layers of botanical complexity and a lingering, refined finish. The cocktail that packs a punch.", ingredients: ["1 oz Gin", "0.5 oz Lemon juice", "0.5 oz Simple syrup", "3 oz Champagne"] },

  // Complex Cocktails
  { name: "Long Island Iced Tea", base: "Vodka", liqueur: "Triple Sec", flavor: "Refreshing", strength: "Strong", description: "Deceptively smooth with multiple spirits' hidden power. Vodka, gin, rum, and tequila's combined strength masked by triple sec's sweetness and cola's familiar comfort. Dangerously easy-drinking with a complex, lingering finish. Proceed with caution.", ingredients: ["0.5 oz Vodka", "0.5 oz Gin", "0.5 oz White rum", "0.5 oz Tequila", "0.5 oz Triple sec", "1 oz Lemon juice", "Cola"] },
  { name: "Caipirinha", base: "Cachaça", liqueur: "None", flavor: "Sour", strength: "Medium", description: "Brazilian soul with lime's vibrant embrace. Cachaça's sugarcane character enhanced by fresh lime's tart brightness and sugar's natural sweetness. Rustic, refreshing with a clean, citrus-forward finish. São Paulo's spirited gift.", ingredients: ["2 oz Cachaça", "1 Lime (quartered)", "2 tsp Sugar", "Ice"] },
  { name: "Pisco Sour", base: "Pisco", liqueur: "None", flavor: "Sour", strength: "Medium", description: "Peruvian elegance with egg white's creamy sophistication. Pisco's grape spirit character enhanced by lime's bright acidity and egg white's velvety texture. Smooth, well-rounded with a frothy crown and lingering citrus finish. Lima's liquid heritage.", ingredients: ["2 oz Pisco", "1 oz Lime juice", "0.5 oz Simple syrup", "1 Egg white", "Angostura bitters"] },
  { name: "Vesper", base: "Vodka", liqueur: "Dry Vermouth", flavor: "Bitter", strength: "Strong", description: "Bond's sophistication with gin and vodka's refined power. Vodka's clean strength enhanced by gin's botanical complexity and Lillet's herbal elegance. Rich, full-bodied with layers of spirit complexity and a lingering, mysterious finish. Shaken, not stirred.", ingredients: ["3 oz Vodka", "1 oz Gin", "0.5 oz Lillet Blanc", "Lemon twist"] },
  { name: "Boulevardier", base: "Whiskey", liqueur: "Campari", flavor: "Bitter", strength: "Strong", description: "Whiskey sophistication with Negroni's bitter elegance. Bourbon's warm character enhanced by Campari's bitter orange intensity and sweet vermouth's herbal complexity. Rich, full-bodied with layers of bitter-sweet harmony and a lingering, contemplative finish. The American Negroni.", ingredients: ["1.5 oz Bourbon", "1 oz Campari", "1 oz Sweet vermouth", "Orange peel"] },
  { name: "Paper Plane", base: "Whiskey", liqueur: "None", flavor: "Bitter", strength: "Medium", description: "Modern sophistication with equal parts harmony. Bourbon's warm character enhanced by Amaro Nonino's bitter complexity and Aperol's orange notes. Balanced, complex with layers of bitter-sweet balance and a smooth, refined finish. Aviation's grounded cousin.", ingredients: ["0.75 oz Bourbon", "0.75 oz Amaro Nonino", "0.75 oz Aperol", "0.75 oz Lemon juice"] },
  { name: "Last Word", base: "Gin", liqueur: "Chartreuse", flavor: "Herbal", strength: "Strong", description: "Perfect harmony with equal parts botanical complexity. Gin's juniper foundation enhanced by Chartreuse's herbal mystery and maraschino's cherry notes. Rich, complex with layers of herbal sophistication and a lingering, contemplative finish. The final word in cocktails.", ingredients: ["0.75 oz Gin", "0.75 oz Chartreuse", "0.75 oz Maraschino", "0.75 oz Lime juice"] },
  { name: "Penicillin", base: "Scotch", liqueur: "None", flavor: "Herbal", strength: "Strong", description: "Healing sophistication with ginger's warming embrace. Blended scotch's smooth character enhanced by honey-ginger syrup's spicy sweetness and Islay scotch's smoky float. Complex layers of smoke, spice, and sweetness with a lingering, warming finish. Modern medicine in a glass.", ingredients: ["2 oz Blended scotch", "0.75 oz Lemon juice", "0.75 oz Honey-ginger syrup", "0.25 oz Islay scotch float"] },
  { name: "Corpse Reviver #2", base: "Gin", liqueur: "Triple Sec", flavor: "Sour", strength: "Strong", description: "Morning-after sophistication with absinthe's mysterious allure. Gin's botanical character enhanced by Cointreau's orange warmth and Lillet's herbal complexity. Rich, full-bodied with absinthe's anise whisper and a lingering, refined finish. The ultimate hair of the dog.", ingredients: ["0.75 oz Gin", "0.75 oz Cointreau", "0.75 oz Lillet Blanc", "0.75 oz Lemon juice", "Absinthe rinse"] },
  { name: "Bee's Knees", base: "Gin", liqueur: "None", flavor: "Sweet", strength: "Medium", description: "Prohibition elegance with honey's golden sweetness. Gin's botanical character enhanced by honey syrup's natural sweetness and lemon's bright acidity. Smooth, well-rounded with floral honey notes and a clean, citrus-forward finish. The cat's pajamas.", ingredients: ["2 oz Gin", "0.75 oz Lemon juice", "0.75 oz Honey syrup", "Lemon twist"] },
  { name: "Clover Club", base: "Gin", liqueur: "None", flavor: "Fruity", strength: "Medium", description: "Pink elegance with raspberry's fruity charm. Gin's botanical foundation enhanced by raspberry syrup's sweet berry notes and egg white's creamy texture. Smooth, fruity with a frothy crown and lingering berry finish. Philadelphia's pink perfection.", ingredients: ["2 oz Gin", "0.5 oz Lemon juice", "0.5 oz Raspberry syrup", "0.5 oz Dry vermouth", "1 Egg white"] },
  { name: "Southside", base: "Gin", liqueur: "None", flavor: "Refreshing", strength: "Medium", description: "Refreshing gin sophistication with mint's cooling embrace. Gin's botanical character enhanced by fresh mint's herbal freshness and lime's bright citrus notes. Cool, herbaceous with a clean, refreshing finish and mint's cooling sensation. Chicago's cool classic.", ingredients: ["2 oz Gin", "0.75 oz Lime juice", "0.75 oz Simple syrup", "6-8 Mint leaves"] },
  { name: "Ramos Gin Fizz", base: "Gin", liqueur: "None", flavor: "Creamy", strength: "Medium", description: "Luxuriously creamy with orange flower water's delicate charm. Gin's botanical foundation enhanced by heavy cream's velvety texture and orange flower water's floral whisper. Silky, smooth with a frothy crown and lingering floral finish. New Orleans' liquid luxury.", ingredients: ["2 oz Gin", "0.5 oz Lemon juice", "0.5 oz Lime juice", "0.5 oz Simple syrup", "1 oz Heavy cream", "1 Egg white", "Orange flower water"] },
  { name: "Blue Hawaiian", base: "Rum (Light)", liqueur: "Blue Curaçao", flavor: "Sweet", strength: "Medium", description: "Tropical paradise in oceanic blue elegance. White rum's clean character enhanced by blue curaçao's citrus sweetness and pineapple's tropical sunshine. Creamy coconut adds luxurious texture with a smooth, vacation-worthy finish. Hawaii's liquid dream.", ingredients: ["1 oz White rum", "1 oz Blue curaçao", "2 oz Pineapple juice", "1 oz Cream of coconut", "Pineapple wedge"] },
  { name: "Hurricane", base: "Rum (Light)", liqueur: "None", flavor: "Fruity", strength: "Strong", description: "New Orleans power with passion fruit's tropical intensity. Multiple rums' combined strength enhanced by passion fruit's exotic sweetness and citrus brightness. Rich, full-bodied with layers of tropical complexity and a lingering, stormy finish. The Big Easy's tempest in a glass.", ingredients: ["2 oz White rum", "2 oz Dark rum", "2 oz Passion fruit juice", "1 oz Lime juice", "0.5 oz Simple syrup", "Grenadine"] },
  { name: "Planter's Punch", base: "Rum (Dark)", liqueur: "None", flavor: "Fruity", strength: "Strong", description: "Caribbean tradition with tropical fruit symphony. Dark rum's rich molasses character enhanced by orange and pineapple's tropical sweetness and lime's bright acidity. Full-bodied with layers of fruit complexity and a smooth, island-worthy finish. The original tropical escape.", ingredients: ["3 oz Dark rum", "1 oz Orange juice", "1 oz Pineapple juice", "0.5 oz Lime juice", "0.5 oz Simple syrup", "Grenadine"] },
  { name: "El Diablo", base: "Tequila (Reposado)", liqueur: "Crème de Cassis", flavor: "Spicy", strength: "Medium", description: "Fiery sophistication with black currant's dark allure. Reposado tequila's oak complexity enhanced by crème de cassis's berry richness and ginger beer's spicy warmth. Complex layers of smoke, spice, and fruit with a lingering, mysterious finish. The devil's own cocktail.", ingredients: ["2 oz Tequila", "0.5 oz Crème de cassis", "0.5 oz Lime juice", "Ginger beer", "Lime wedge"] },
  { name: "Mexican Firing Squad", base: "Tequila (Blanco)", liqueur: "None", flavor: "Spicy", strength: "Medium", description: "Bold Mexican spirit with grenadine's sweet contrast. Blanco tequila's clean agave character enhanced by lime's tart brightness and grenadine's pomegranate sweetness. Complex layers of sweet and sour with a crisp, refreshing finish and bitters' herbal depth. Mexico's spirited salute.", ingredients: ["2 oz Tequila", "0.75 oz Lime juice", "0.5 oz Grenadine", "2 dashes Angostura bitters", "Club soda"] },
  { name: "Oaxaca Old Fashioned", base: "Mezcal", liqueur: "None", flavor: "Smoky", strength: "Strong", description: "Smoky sophistication with agave's ancient wisdom. Mezcal's distinctive smoke character enhanced by tequila's clean agave notes and agave nectar's natural sweetness. Rich, complex with layers of smoke and spice, finished with bitters' herbal complexity. Oaxaca's gift to the Old Fashioned.", ingredients: ["1.5 oz Mezcal", "0.5 oz Tequila", "0.25 oz Agave nectar", "2 dashes Angostura bitters", "Orange peel"] },
  { name: "Division Bell", base: "Mezcal", liqueur: "Aperol", flavor: "Bitter", strength: "Medium", description: "Modern sophistication with mezcal's smoky allure. Mezcal's distinctive character enhanced by Aperol's bitter orange notes and lime's bright acidity. Complex layers of smoke, citrus, and bitters with a smooth, contemplative finish. The cocktail that bridges worlds.", ingredients: ["1 oz Mezcal", "0.75 oz Aperol", "0.75 oz Lime juice", "0.5 oz Maraschino"] },

  // Non-alcoholic Options
  { name: "Virgin Mojito", base: "None", liqueur: "None", flavor: "Refreshing", strength: "Light", description: "Refreshing purity with mint's cooling embrace. Fresh mint's herbal freshness enhanced by lime's bright citrus and sugar's gentle sweetness. Clean, thirst-quenching with a crisp, refreshing finish. Perfect refreshment for any occasion.", ingredients: ["1 oz Lime juice", "2 tsp Sugar", "6-8 Mint leaves", "Club soda"] },
  { name: "Shirley Temple", base: "None", liqueur: "None", flavor: "Sweet", strength: "Light", description: "Childhood joy with ginger ale's bubbly charm. Sweet grenadine's cherry notes enhanced by ginger ale's spicy effervescence and maraschino cherry's festive sweetness. Light, fun, and refreshing with a clean, playful finish. The ultimate mocktail classic.", ingredients: ["Ginger ale", "Grenadine", "Maraschino cherry"] },
  { name: "Virgin Piña Colada", base: "None", liqueur: "None", flavor: "Sweet", strength: "Light", description: "Tropical paradise without the spirit. Rich coconut cream meets sweet pineapple's tropical sunshine in perfect harmony. Luxuriously smooth texture with a sweet, vacation-worthy finish. The perfect tropical escape for everyone.", ingredients: ["2 oz Coconut cream", "2 oz Pineapple juice", "Pineapple wedge"] },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome, 1-3 = questions, 4 = results
  const [answers, setAnswers] = useState({
    base: null,
    flavor: null,
    strength: null
  });

  // Helper function to filter drinks based on current selections (ignore liqueur)
  const getFilteredDrinks = (baseFilter, flavorFilter, strengthFilter) => {
    return drinkDatabase.filter(drink => {
      const baseMatch = !baseFilter || drink.base === baseFilter;
      const flavorMatch = !flavorFilter || drink.flavor === flavorFilter;
      const strengthMatch = !strengthFilter || drink.strength === strengthFilter;
      
      return baseMatch && flavorMatch && strengthMatch;
    });
  };

  // Get available flavors for selected base spirit (cascading filter)
  const getAvailableFlavors = (selectedBase) => {
    if (!selectedBase) return [];
    
    // Filter drinks to only those matching the selected base spirit
    const drinksWithBase = drinkDatabase.filter(drink => drink.base === selectedBase);
    
    // Get unique flavor profiles from those drinks
    const flavors = [...new Set(drinksWithBase.map(drink => drink.flavor))];
    return flavors.sort();
  };

  // Get available strengths for selected base + flavor (cascading filter)
  const getAvailableStrengths = (selectedBase, selectedFlavor) => {
    if (!selectedBase || !selectedFlavor) return [];
    
    // Filter drinks to only those matching base spirit + flavor profile
    const drinksMatching = drinkDatabase.filter(drink => 
      drink.base === selectedBase && drink.flavor === selectedFlavor
    );
    
    // Get unique strength levels from those drinks
    const strengths = [...new Set(drinksMatching.map(drink => drink.strength))];
    return strengths.sort();
  };

  // Base spirits organized by bartender logic
  const allBaseSpirits = [
    'Vodka', 'Gin', 'Rum (Light)', 'Rum (Dark)', 
    'Tequila (Blanco)', 'Tequila (Reposado)', 'Tequila (Añejo)', 'Mezcal',
    'Whiskey', 'Bourbon', 'Rye', 'Scotch', 'Irish Whiskey',
    'Distilled Wine (Brandy/Cognac/Armagnac)', 'Cachaça', 'Pisco',
    'Champagne/Prosecco',
    'Jägermeister', 'Chambord', 'Baileys', 'Grand Marnier',
    'Limoncello', 'Sambuca', 'Frangelico', 'Amaretto'
  ];

  // Spirits that are typically enjoyed neat (sipping spirits)
  const sippingSpirits = [
    'Premium Scotch', 'Single Malt Scotch', 'Aged Cognac', 'Aged Armagnac',
    'Premium Bourbon', 'Single Barrel Bourbon', 'Aged Rum', 'Añejo Tequila',
    'Limoncello', 'Sambuca', 'Frangelico', 'Crème de Menthe',
    'Jägermeister', 'Chambord', 'Baileys', 'Grand Marnier', 'Amaretto'
  ];

  // Flavor descriptions for sipping spirits and liqueurs
  const sippingFlavorDescriptions = {
    'Jägermeister': 'A masterful composition of 56 botanicals, meticulously aged in oak barrels to achieve remarkable depth and complexity.\n\nTASTING NOTES:\nOpens with an intriguing bouquet of star anise and licorice root, layered with bright citrus peel and exotic spices. The palate reveals a sophisticated interplay of warming ginger, delicate cinnamon, and aromatic saffron threads, balanced by subtle hints of wild herbs and forest botanicals. Notes of sweet orange zest and cardamom emerge mid-palate, giving way to whispers of chamomile and elderflower.\n\nFINISH:\nLong and contemplative, with a bittersweet herbal character reminiscent of alpine meadows. The gentle embrace of honey and vanilla from oak aging softens the medicinal herbal intensity, leaving a warming, digestif-worthy conclusion with lingering notes of fennel and clove.\n\nSERVING SUGGESTION:\nBest enjoyed chilled at 0°C (32°F) to fully appreciate its intricate botanical symphony. Traditionally savored as a digestif to conclude an exceptional meal.',
    'Chambord': 'Luxurious French liqueur crafted from black raspberries, Madagascar vanilla, and XO cognac. Deep garnet hue reflects its opulent character. Aromas of ripe summer berries and honeycomb lead to a velvety palate of black raspberry, hints of blackcurrant, and delicate floral notes. Smooth, elegant finish with cognac warmth and subtle oak influence. A sophisticated after-dinner indulgence.',
    'Baileys': 'Ireland\'s iconic cream liqueur blending triple-distilled Irish whiskey with fresh dairy cream. Silky, luxurious texture coats the palate with flavors of rich cream, fine chocolate, and subtle vanilla. Whiskey\'s gentle warmth provides depth without overwhelming the delicate sweetness. Smooth, comforting finish reminiscent of premium ice cream. Perfect neat, over ice, or in coffee.',
    'Grand Marnier': 'Distinguished Cognac-based orange liqueur created in 1880. Noble Cognac foundation enhanced with essence of exotic bitter oranges. Complex layers of candied orange peel, caramelized sugar, and aged oak. The XO Cognac imparts depth, vanilla notes, and remarkable smoothness. Long, warming finish with orange zest brightness and refined spirit character. A grand finale to exceptional meals.',
    'Limoncello': 'Italian lemon liqueur with intense, bright citrus flavor. Sweet and refreshing with strong lemon zest character. Best served chilled.',
    'Sambuca': 'Anise-flavored Italian liqueur with bold black licorice taste. Sweet with herbal complexity. Traditionally served with coffee beans.',
    'Frangelico': 'Hazelnut liqueur with rich, nutty sweetness. Notes of vanilla, cocoa, and roasted hazelnuts. Smooth and dessert-like.',
    'Amaretto': 'Italian almond liqueur with sweet marzipan flavor. Notes of vanilla, cherry, and warm spices. Rich and smooth.',
    'Crème de Menthe': 'Mint-flavored liqueur with refreshing herbal taste. Sweet and cooling with pure mint essence. Available in green (mint) or white (clear) varieties.',
    'Premium Scotch': 'Complex single malt with notes of smoke, peat, and oak. Rich with hints of honey, fruit, and spices. Best enjoyed neat or with a splash of water.',
    'Single Malt Scotch': 'Distinctive whisky with regional character. Expect flavors of malt, oak, smoke, and subtle fruit notes. Each distillery offers unique characteristics.',
    'Aged Cognac': 'Refined French brandy with complex layers. Notes of dried fruit, vanilla, oak, and warm spices. Smooth and elegant with long finish.',
    'Aged Armagnac': 'Traditional French brandy with rustic elegance. Rich fruit flavors with notes of prune, fig, and oak. Warmer and more robust than Cognac.',
    'Premium Bourbon': 'American whiskey with sweet corn character. Notes of vanilla, caramel, oak, and spice. Rich and warming with smooth finish.',
    'Single Barrel Bourbon': 'Unique bourbon from individual barrels. Complex flavors of oak, vanilla, and spice. Each bottle offers distinct character.',
    'Aged Rum': 'Rich Caribbean spirit with tropical character. Notes of molasses, vanilla, oak, and warm spices. Smooth and complex.',
    'Añejo Tequila': 'Aged Mexican spirit with oak complexity. Notes of agave, vanilla, caramel, and spice. Smooth and sophisticated.'
  };

  const allLiqueurs = [
    'None', 'Sweet Vermouth', 'Dry Vermouth', 'Campari', 'Aperol',
    'Triple Sec', 'Cointreau',
    'Kahlúa',
    'Midori'
  ];

  // Check if a selection is a sipping spirit
  const isSippingSpirit = (selection) => {
    return sippingSpirits.includes(selection);
  };

  const getRecommendations = () => {
    // Filter based on base, flavor, and strength only (ignore liqueur)
    return getFilteredDrinks(answers.base, answers.flavor, answers.strength);
  };

  // Simple step-based answer handling
  const handleAnswer = (answer) => {
    const newAnswers = { ...answers };
    
    if (currentStep === 1) {
      // Step 1: Base spirit
      newAnswers.base = answer;
      if (isSippingSpirit(answer)) {
        setAnswers(newAnswers);
        setCurrentStep(5); // Special sipping spirit screen
        return;
      }
      setAnswers(newAnswers);
      setCurrentStep(2); // Go to flavor
    } else if (currentStep === 2) {
      // Step 2: Flavor profile
      newAnswers.flavor = answer;
      setAnswers(newAnswers);
      setCurrentStep(3); // Go to strength
    } else if (currentStep === 3) {
      // Step 3: Strength
      newAnswers.strength = answer;
      setAnswers(newAnswers);
      setCurrentStep(4); // Go to results
    }
  };

  const startOver = () => {
    setCurrentStep(0);
    setAnswers({ base: null, flavor: null, strength: null });
  };

  const handleBack = () => {
    // Simple: just decrease step by 1, clear that answer
    const newAnswers = { ...answers };
    
    if (currentStep === 4) {
      // Results → Step 3 (strength)
      newAnswers.strength = null;
      setAnswers(newAnswers);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Step 3 (strength) → Step 2 (flavor)
      newAnswers.flavor = null;
      setAnswers(newAnswers);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Step 2 (flavor) → Step 1 (base)
      newAnswers.base = null;
      setAnswers(newAnswers);
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Step 1 (base) → Welcome
      startOver();
    }
  };

  const renderWelcomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Bartender's Helper</Text>
      <Text style={styles.subtitle}>Find the perfect drink for your taste</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentStep(1)}>
        <Text style={styles.buttonText}>Find a Drink</Text>
      </TouchableOpacity>
    </View>
  );

  // Simple step-based question rendering
  const renderQuestion = (step, options, questionText) => (
    <View style={styles.container}>
      <Text style={styles.questionTitle}>{questionText}</Text>
      <ScrollView style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Back button - show on steps 2, 3, 4, 5 (not step 1) */}
      {step > 1 && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={styles.secondaryButton} onPress={startOver}>
        <Text style={styles.secondaryButtonText}>Start Over</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSippingSpirit = () => {
    const selectedSpirit = answers.base || answers.liqueur;
    const flavorDescription = sippingFlavorDescriptions[selectedSpirit] || '';
    
    // Debug logging
    console.log('Full answers object:', answers);
    console.log('answers.base:', answers.base);
    console.log('answers.liqueur:', answers.liqueur);
    console.log('answers.spirit:', answers.spirit);
    console.log('answers.baseSpirit:', answers.baseSpirit);
    console.log('Selected Spirit:', selectedSpirit);
    console.log('Flavor Description:', flavorDescription);
    console.log('Description exists:', !!flavorDescription);
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Premium Spirit Selected</Text>
        <View style={styles.sippingCard}>
          <Text style={styles.sippingTitle}>This spirit is best savored on its own</Text>
          
          <Text style={styles.flavorProfileTitle}>FLAVOR PROFILE:</Text>
          <Text style={styles.flavorDescription}>{flavorDescription || 'No description found for: ' + selectedSpirit}</Text>
          
          <Text style={styles.sippingSubtext}>
            Would you like to start over and choose something else for a cocktail?
          </Text>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={startOver}>
          <Text style={styles.buttonText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecommendations = () => {
    const recommendations = getRecommendations();
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Recommendations</Text>
        <ScrollView style={styles.recommendationsContainer}>
          {recommendations.length > 0 ? (
            recommendations.map((drink, index) => (
              <View key={index} style={styles.drinkCard}>
                <Text style={styles.drinkName}>{drink.name}</Text>
                <Text style={styles.drinkDescription}>{drink.description}</Text>
                <Text style={styles.ingredientsTitle}>Ingredients:</Text>
                {drink.ingredients.map((ingredient, idx) => (
                  <Text key={idx} style={styles.ingredient}>• {ingredient}</Text>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.noMatchCard}>
              <Text style={styles.noMatchTitle}>This spirit is best savored on its own</Text>
              <Text style={styles.noMatchMessage}>
                This spirit is best savored on its own and doesn't need flavor enhancements. It's crafted to be enjoyed neat or with just a splash of water.
              </Text>
              
              {(() => {
                const selectedSpirit = answers.base || answers.liqueur;
                const flavorDescription = sippingFlavorDescriptions[selectedSpirit];
                return flavorDescription ? (
                  <>
                    <Text style={styles.flavorProfileTitle}>FLAVOR PROFILE:</Text>
                    <Text style={styles.flavorDescription}>{flavorDescription}</Text>
                  </>
                ) : null;
              })()}
              
              <Text style={styles.selectionSummary}>
                Your selections: {answers.base} + {answers.flavor} + {answers.strength}
              </Text>
            </View>
          )}
        </ScrollView>
        
        {/* Back button - go back to last question */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.primaryButton} onPress={startOver}>
          <Text style={styles.buttonText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 0:
        return renderWelcomeScreen();
      case 1:
        return renderQuestion(1, allBaseSpirits, "What's your base spirit?");
      case 2:
        // Show only flavor profiles available for the selected base spirit
        return renderQuestion(2, getAvailableFlavors(answers.base), "What flavor profile?");
      case 3:
        // Show only strength levels available for the selected base + flavor
        return renderQuestion(3, getAvailableStrengths(answers.base, answers.flavor), "How strong?");
      case 4:
        return renderRecommendations();
      case 5:
        return renderSippingSpirit();
      default:
        return renderWelcomeScreen();
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {renderCurrentScreen()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 34,
  },
  primaryButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 12,
    minWidth: 200,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#666666',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  secondaryButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ff6b35',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#ff6b35',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    maxHeight: '60%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#2d2d2d',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444444',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  recommendationsContainer: {
    width: '100%',
    maxHeight: '70%',
    marginBottom: 20,
  },
  drinkCard: {
    backgroundColor: '#2d2d2d',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#444444',
  },
  drinkName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 8,
  },
  drinkDescription: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 12,
    lineHeight: 22,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 4,
    lineHeight: 20,
  },
  noMatchCard: {
    backgroundColor: '#2d2d2d',
    padding: 30,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#444444',
    alignItems: 'center',
  },
  noMatchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 15,
    textAlign: 'center',
  },
  noMatchMessage: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  selectionSummary: {
    fontSize: 14,
    color: '#888888',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  sippingCard: {
    backgroundColor: '#2d2d2d',
    padding: 30,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444444',
    alignItems: 'center',
  },
  sippingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 20,
    textAlign: 'center',
  },
  sippingMessage: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  sippingSubtext: {
    fontSize: 14,
    color: '#aaaaaa',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  flavorProfileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginTop: 15,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  flavorDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
