import { ARMOUR_SPRITE_DIMMENSSION, Sprite } from "../commons";
import { ArmourType } from "./armour.types";

const armourSprite = '/public/items/armours.png';

export const armourSprites: Record<ArmourType, Sprite> = {
  [ArmourType.VEST]: new Sprite(
    armourSprite,
    1,
    5,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.VEST2]: new Sprite(
    armourSprite,
    4,
    5,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.VEST3]: new Sprite(
    armourSprite,
    2,
    4,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.COTTON_VEST]: new Sprite(
    armourSprite,
    4,
    3,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.COTTON_VEST2]: new Sprite(
    armourSprite,
    5,
    3,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.COTTON_VEST3]: new Sprite(
    armourSprite,
    6,
    2,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),

  [ArmourType.LEATHER_VEST]: new Sprite(
    armourSprite,
    2,
    1,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.LEATHER_VEST2]: new Sprite(
    armourSprite,
    5,
    0,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.LEATHER_VEST3]: new Sprite(
    armourSprite,
    7,
    0,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  
  [ArmourType.ARMOUR]: new Sprite(
    armourSprite,
    3,
    7,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.ARMOUR2]: new Sprite(
    armourSprite,
    2,
    6,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.ARMOUR3]: new Sprite(
    armourSprite,
    1,
    7,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  
  [ArmourType.IRON_ARMOUR]: new Sprite(
    armourSprite,
    2,
    8,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.IRON_ARMOUR2]: new Sprite(
    armourSprite,
    3,
    8,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.IRON_ARMOUR3]: new Sprite(
    armourSprite,
    0,
    9,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  
  [ArmourType.BRONZE_ARMOUR]: new Sprite(
    armourSprite,
    4,
    12,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.BRONZE_ARMOUR2]: new Sprite(
    armourSprite,
    5,
    12,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.BRONZE_ARMOUR3]: new Sprite(
    armourSprite,
    4,
    11,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  
  [ArmourType.SILVER_ARMOUR]: new Sprite(
    armourSprite,
    4,
    14,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.SILVER_ARMOUR2]: new Sprite(
    armourSprite,
    5,
    14,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.SILVER_ARMOUR3]: new Sprite(
    armourSprite,
    6,
    14,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  
  [ArmourType.GOLD_ARMOUR]: new Sprite(
    armourSprite,
    2,
    16,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.GOLD_ARMOUR2]: new Sprite(
    armourSprite,
    5,
    16,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.GOLD_ARMOUR3]: new Sprite(
    armourSprite,
    8,
    16,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  
  [ArmourType.TURQUOISE_ARMOUR]: new Sprite(
    armourSprite,
    5,
    17,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.TURQUOISE_ARMOUR2]: new Sprite(
    armourSprite,
    4,
    17,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.TURQUOISE_ARMOUR3]: new Sprite(
    armourSprite,
    7,
    17,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  
  [ArmourType.EMERALD_ARMOUR]: new Sprite(
    armourSprite,
    4,
    18,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.EMERALD_ARMOUR2]: new Sprite(
    armourSprite,
    0,
    18,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
  [ArmourType.EMERALD_ARMOUR3]: new Sprite(
    armourSprite,
    8,
    18,
    ARMOUR_SPRITE_DIMMENSSION,
    ARMOUR_SPRITE_DIMMENSSION,
  ),
}