import { Sprite, SPRITE_16 } from "../../commons";
import { PotionType } from "./potion.types";

const potionTileset = '/public/items/potions.png';

export const potionSprites: Record<PotionType, Sprite> = {
  [PotionType.COAL_POTION]: new Sprite(potionTileset, 2, 13, SPRITE_16, SPRITE_16),
  [PotionType.COAL_POWDER]: new Sprite(potionTileset, 2,0, SPRITE_16, SPRITE_16),
  [PotionType.COAL_SPELL]: new Sprite(potionTileset, 2, 8, SPRITE_16, SPRITE_16),
  [PotionType.COAL_TEAR]: new Sprite(potionTileset, 2, 12, SPRITE_16, SPRITE_16),
  [PotionType.COAL_RAGE]: new Sprite(potionTileset, 2, 4, SPRITE_16, SPRITE_16),
  [PotionType.COAL_WISH]: new Sprite(potionTileset, 2, 10, SPRITE_16, SPRITE_16),

  [PotionType.BRONZE_POTION]: new Sprite(potionTileset, 5, 13, SPRITE_16, SPRITE_16),
  [PotionType.BRONZE_POWDER]: new Sprite(potionTileset, 5,0, SPRITE_16, SPRITE_16),
  [PotionType.BRONZE_SPELL]: new Sprite(potionTileset, 5, 8, SPRITE_16, SPRITE_16),
  [PotionType.BRONZE_TEAR]: new Sprite(potionTileset, 5, 12, SPRITE_16, SPRITE_16),
  [PotionType.BRONZE_RAGE]: new Sprite(potionTileset, 5, 4, SPRITE_16, SPRITE_16),
  [PotionType.BRONZE_WISH]: new Sprite(potionTileset, 5, 10, SPRITE_16, SPRITE_16),

  [PotionType.IRON_POTION]: new Sprite(potionTileset, 0, 13, SPRITE_16, SPRITE_16),
  [PotionType.IRON_POWDER]: new Sprite(potionTileset, 0,0, SPRITE_16, SPRITE_16),
  [PotionType.IRON_SPELL]: new Sprite(potionTileset, 0, 8, SPRITE_16, SPRITE_16),
  [PotionType.IRON_TEAR]: new Sprite(potionTileset, 0, 12, SPRITE_16, SPRITE_16),
  [PotionType.IRON_RAGE]: new Sprite(potionTileset, 0, 4, SPRITE_16, SPRITE_16),
  [PotionType.IRON_WISH]: new Sprite(potionTileset, 0, 10, SPRITE_16, SPRITE_16),

  [PotionType.GOLD_POTION]: new Sprite(potionTileset, 6, 13, SPRITE_16, SPRITE_16),
  [PotionType.GOLD_POWDER]: new Sprite(potionTileset, 6,0, SPRITE_16, SPRITE_16),
  [PotionType.GOLD_SPELL]: new Sprite(potionTileset, 6, 8, SPRITE_16, SPRITE_16),
  [PotionType.GOLD_TEAR]: new Sprite(potionTileset, 6, 12, SPRITE_16, SPRITE_16),
  [PotionType.GOLD_RAGE]: new Sprite(potionTileset, 6, 4, SPRITE_16, SPRITE_16),
  [PotionType.GOLD_WISH]: new Sprite(potionTileset, 6, 10, SPRITE_16, SPRITE_16),

  [PotionType.TURQUOISE_POTION]: new Sprite(potionTileset, 9, 13, SPRITE_16, SPRITE_16),
  [PotionType.TURQUOISE_POWDER]: new Sprite(potionTileset, 9,0, SPRITE_16, SPRITE_16),
  [PotionType.TURQUOISE_SPELL]: new Sprite(potionTileset, 9, 8, SPRITE_16, SPRITE_16),
  [PotionType.TURQUOISE_TEAR]: new Sprite(potionTileset, 9, 12, SPRITE_16, SPRITE_16),
  [PotionType.TURQUOISE_RAGE]: new Sprite(potionTileset, 9, 4, SPRITE_16, SPRITE_16),
  [PotionType.TURQUOISE_WISH]: new Sprite(potionTileset, 9, 10, SPRITE_16, SPRITE_16),

  [PotionType.ZAPHIRE_POTION]: new Sprite(potionTileset, 12, 13, SPRITE_16, SPRITE_16),
  [PotionType.ZAPHIRE_POWDER]: new Sprite(potionTileset, 12,0, SPRITE_16, SPRITE_16),
  [PotionType.ZAPHIRE_SPELL]: new Sprite(potionTileset, 12, 8, SPRITE_16, SPRITE_16),
  [PotionType.ZAPHIRE_TEAR]: new Sprite(potionTileset, 12, 12, SPRITE_16, SPRITE_16),
  [PotionType.ZAPHIRE_RAGE]: new Sprite(potionTileset, 12, 4, SPRITE_16, SPRITE_16),
  [PotionType.ZAPHIRE_WISH]: new Sprite(potionTileset, 12, 10, SPRITE_16, SPRITE_16),

  [PotionType.EMERALD_POTION]: new Sprite(potionTileset, 8, 13, SPRITE_16, SPRITE_16),
  [PotionType.EMERALD_POWDER]: new Sprite(potionTileset, 8,0, SPRITE_16, SPRITE_16),
  [PotionType.EMERALD_SPELL]: new Sprite(potionTileset, 8, 8, SPRITE_16, SPRITE_16),
  [PotionType.EMERALD_TEAR]: new Sprite(potionTileset, 8, 12, SPRITE_16, SPRITE_16),
  [PotionType.EMERALD_RAGE]: new Sprite(potionTileset, 8, 4, SPRITE_16, SPRITE_16),
  [PotionType.EMERALD_WISH]: new Sprite(potionTileset, 8, 10, SPRITE_16, SPRITE_16),

  [PotionType.RUBI_POTION]: new Sprite(potionTileset, 3, 13, SPRITE_16, SPRITE_16),
  [PotionType.RUBI_POWDER]: new Sprite(potionTileset, 3,0, SPRITE_16, SPRITE_16),
  [PotionType.RUBI_SPELL]: new Sprite(potionTileset, 3, 8, SPRITE_16, SPRITE_16),
  [PotionType.RUBI_TEAR]: new Sprite(potionTileset, 3, 12, SPRITE_16, SPRITE_16),
  [PotionType.RUBI_RAGE]: new Sprite(potionTileset, 3, 4, SPRITE_16, SPRITE_16),
  [PotionType.RUBI_WISH]: new Sprite(potionTileset, 3, 10, SPRITE_16, SPRITE_16),
}