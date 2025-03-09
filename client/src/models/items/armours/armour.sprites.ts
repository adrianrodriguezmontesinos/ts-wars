import { SPRITE_16, Sprite } from "../../commons";
import { ArmourType } from "./armour.types";

const armourTileset = '/public/items/armours.png';

export const armourSprites: Record<ArmourType, Sprite> = {
  [ArmourType.VEST]: new Sprite(
    armourTileset,
    1,
    5,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.VEST2]: new Sprite(
    armourTileset,
    4,
    5,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.VEST3]: new Sprite(
    armourTileset,
    2,
    4,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.COTTON_VEST]: new Sprite(
    armourTileset,
    4,
    3,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.COTTON_VEST2]: new Sprite(
    armourTileset,
    5,
    3,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.COTTON_VEST3]: new Sprite(
    armourTileset,
    6,
    2,
    SPRITE_16,
    SPRITE_16,
  ),

  [ArmourType.LEATHER_VEST]: new Sprite(
    armourTileset,
    2,
    1,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.LEATHER_VEST2]: new Sprite(
    armourTileset,
    5,
    0,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.LEATHER_VEST3]: new Sprite(
    armourTileset,
    7,
    0,
    SPRITE_16,
    SPRITE_16,
  ),
  
  [ArmourType.ARMOUR]: new Sprite(
    armourTileset,
    3,
    7,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.ARMOUR2]: new Sprite(
    armourTileset,
    2,
    6,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.ARMOUR3]: new Sprite(
    armourTileset,
    1,
    7,
    SPRITE_16,
    SPRITE_16,
  ),
  
  [ArmourType.IRON_ARMOUR]: new Sprite(
    armourTileset,
    2,
    8,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.IRON_ARMOUR2]: new Sprite(
    armourTileset,
    3,
    8,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.IRON_ARMOUR3]: new Sprite(
    armourTileset,
    0,
    9,
    SPRITE_16,
    SPRITE_16,
  ),
  
  [ArmourType.BRONZE_ARMOUR]: new Sprite(
    armourTileset,
    4,
    12,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.BRONZE_ARMOUR2]: new Sprite(
    armourTileset,
    5,
    12,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.BRONZE_ARMOUR3]: new Sprite(
    armourTileset,
    4,
    11,
    SPRITE_16,
    SPRITE_16,
  ),
  
  [ArmourType.SILVER_ARMOUR]: new Sprite(
    armourTileset,
    4,
    14,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.SILVER_ARMOUR2]: new Sprite(
    armourTileset,
    5,
    14,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.SILVER_ARMOUR3]: new Sprite(
    armourTileset,
    6,
    14,
    SPRITE_16,
    SPRITE_16,
  ),
  
  [ArmourType.GOLD_ARMOUR]: new Sprite(
    armourTileset,
    2,
    16,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.GOLD_ARMOUR2]: new Sprite(
    armourTileset,
    5,
    16,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.GOLD_ARMOUR3]: new Sprite(
    armourTileset,
    8,
    16,
    SPRITE_16,
    SPRITE_16,
  ),
  
  [ArmourType.TURQUOISE_ARMOUR]: new Sprite(
    armourTileset,
    5,
    17,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.TURQUOISE_ARMOUR2]: new Sprite(
    armourTileset,
    4,
    17,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.TURQUOISE_ARMOUR3]: new Sprite(
    armourTileset,
    7,
    17,
    SPRITE_16,
    SPRITE_16,
  ),
  
  [ArmourType.EMERALD_ARMOUR]: new Sprite(
    armourTileset,
    4,
    18,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.EMERALD_ARMOUR2]: new Sprite(
    armourTileset,
    0,
    18,
    SPRITE_16,
    SPRITE_16,
  ),
  [ArmourType.EMERALD_ARMOUR3]: new Sprite(
    armourTileset,
    8,
    18,
    SPRITE_16,
    SPRITE_16,
  ),
}