import tunaImg from "@/assets/tuna-bliss.jpg";
import salmonImg from "@/assets/superior-salmon.jpg";
import glowImg from "@/assets/glow-bowl.jpg";
import veganWishImg from "@/assets/vegan-wish.png";
import proteinImg from "@/assets/protein-desire.png";
import falafelImg from "@/assets/falafel-kick.png";
import chickenSunImg from "@/assets/chicken-sunshine.png";
import greenSmoothie from "@/assets/green-smoothie.jpg";
import pinkSmoothie from "@/assets/pink-smoothie.jpg";
import kiwiJuice from "@/assets/kiwi-juice.jpg";
import beetJuice from "@/assets/beet-juice.jpg";

export type MenuCategory = "Salads" | "Sandwiches" | "Smoothies" | "Juices" | "Meal Plans";

export type Badge = "Best Seller" | "New Menu" | "Chef's Pick" | "Staff Pick";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  kcal?: string;
  protein?: string;
  badge?: Badge;
  image: string;
}

export const MENU: MenuItem[] = [
  // Salads
  { id: "tuna-bliss", name: "Tuna Bliss", price: 5.8, category: "Salads", kcal: "410 kcal", protein: "28g Protein", badge: "Best Seller", image: tunaImg },
  { id: "superior-salmon", name: "Superior Salmon", price: 7.5, category: "Salads", kcal: "520 kcal", protein: "32g Protein", badge: "Chef's Pick", image: salmonImg },
  { id: "glow-bowl", name: "Glow Bowl", price: 5.2, category: "Salads", kcal: "420 kcal", protein: "22g Protein", badge: "Best Seller", image: glowImg },
  { id: "vegan-garden", name: "Vegan Garden", price: 5.5, category: "Salads", kcal: "380 kcal", protein: "14g Protein", image: veganWishImg },
  { id: "vegan-wish", name: "Vegan Wish", price: 5.2, category: "Salads", kcal: "390 kcal", protein: "16g Protein", badge: "New Menu", image: veganWishImg },
  { id: "rice-capitan", name: "Rice Capitan", price: 6.4, category: "Salads", kcal: "560 kcal", protein: "24g Protein", image: glowImg },
  { id: "spicy-chicken-origine", name: "Spicy Chicken Origine", price: 5.8, category: "Salads", kcal: "470 kcal", protein: "30g Protein", image: proteinImg },
  { id: "protein-desire", name: "Protein Desire", price: 6.2, category: "Salads", kcal: "510 kcal", protein: "36g Protein", badge: "Staff Pick", image: proteinImg },

  // Sandwiches
  { id: "falafel-kick", name: "Falafel Kick", price: 3.8, category: "Sandwiches", kcal: "390 kcal", protein: "14g Protein", badge: "Best Seller", image: falafelImg },
  { id: "smoked-salmon", name: "Smoked Salmon", price: 6.3, category: "Sandwiches", kcal: "440 kcal", protein: "26g Protein", badge: "Chef's Pick", image: chickenSunImg },
  { id: "wicked-tuna", name: "Wicked Tuna", price: 4.0, category: "Sandwiches", kcal: "410 kcal", protein: "24g Protein", image: chickenSunImg },
  { id: "tasteful-avoegg", name: "Tasteful Avoegg", price: 4.0, category: "Sandwiches", kcal: "420 kcal", protein: "18g Protein", image: falafelImg },
  { id: "chicken-energy", name: "Chicken Energy", price: 4.2, category: "Sandwiches", kcal: "450 kcal", protein: "28g Protein", image: chickenSunImg },
  { id: "spicy-chicken", name: "Spicy Chicken", price: 4.5, category: "Sandwiches", kcal: "470 kcal", protein: "30g Protein", image: chickenSunImg },
  { id: "chicken-sunshine", name: "Chicken Sunshine", price: 4.5, category: "Sandwiches", kcal: "460 kcal", protein: "29g Protein", badge: "Staff Pick", image: chickenSunImg },

  // Smoothies
  { id: "green-goodness", name: "Green Goodness", price: 3.2, category: "Smoothies", kcal: "210 kcal", protein: "6g Protein", image: greenSmoothie },
  { id: "pb-j", name: "PB & J", price: 3.2, category: "Smoothies", kcal: "260 kcal", protein: "10g Protein", image: pinkSmoothie },
  { id: "almond-boost", name: "Almond Boost", price: 3.2, category: "Smoothies", kcal: "240 kcal", protein: "9g Protein", image: greenSmoothie },
  { id: "peanut-power", name: "Peanut Power", price: 3.2, category: "Smoothies", kcal: "290 kcal", protein: "12g Protein", badge: "Best Seller", image: pinkSmoothie },
  { id: "berries-fantasy", name: "Berries Fantasy", price: 4.2, category: "Smoothies", kcal: "230 kcal", protein: "7g Protein", badge: "New Menu", image: pinkSmoothie },

  // Juices
  { id: "kiwi-galore", name: "Kiwi Galore", price: 3.0, category: "Juices", kcal: "140 kcal", protein: "2g Protein", image: kiwiJuice },
  { id: "ming-energy", name: "Ming Energy", price: 3.2, category: "Juices", kcal: "150 kcal", protein: "2g Protein", image: kiwiJuice },
  { id: "pink-lady", name: "Pink Lady", price: 3.2, category: "Juices", kcal: "160 kcal", protein: "2g Protein", badge: "Best Seller", image: beetJuice },
  { id: "earth-juice", name: "Earth Juice", price: 3.2, category: "Juices", kcal: "150 kcal", protein: "3g Protein", image: beetJuice },
  { id: "green-habit", name: "Green Habit", price: 3.0, category: "Juices", kcal: "130 kcal", protein: "2g Protein", image: kiwiJuice },
  { id: "heart-juice", name: "Heart Juice", price: 4.0, category: "Juices", kcal: "180 kcal", protein: "3g Protein", badge: "Chef's Pick", image: beetJuice },
  { id: "beet-boost", name: "Beet Boost", price: 3.0, category: "Juices", kcal: "150 kcal", protein: "2g Protein", image: beetJuice },
  { id: "carrot-cure", name: "Carrot Cure", price: 3.2, category: "Juices", kcal: "140 kcal", protein: "2g Protein", image: beetJuice },
  { id: "celery-vibe", name: "Celery Vibe", price: 3.2, category: "Juices", kcal: "120 kcal", protein: "2g Protein", image: kiwiJuice },
];

export const CATEGORIES: MenuCategory[] = ["Salads", "Sandwiches", "Smoothies", "Juices", "Meal Plans"];
