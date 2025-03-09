import { Sprite, SPRITE_16 } from '../../commons';
import { WeaponType } from './weapon.types';

const weaponTileset = '/public/items/weapons.png';

export const weaponSprites: Record<WeaponType, Sprite> = {
  [WeaponType.BRONZE_SWORD]: new Sprite(weaponTileset, 0, 0, SPRITE_16, SPRITE_16),
  [WeaponType.BRONZE_AXE]: new Sprite(weaponTileset, 1, 0, SPRITE_16, SPRITE_16),
  [WeaponType.BRONZE_BOW]: new Sprite(weaponTileset, 3, 0, SPRITE_16, SPRITE_16),
  [WeaponType.BRONZE_SHIELD]: new Sprite(weaponTileset, 2, 0, SPRITE_16, SPRITE_16),
  [WeaponType.BRONZE_SPEAR]: new Sprite(weaponTileset, 4, 0, SPRITE_16, SPRITE_16),

  [WeaponType.IRON_SWORD]: new Sprite(weaponTileset, 0, 1, SPRITE_16, SPRITE_16),
  [WeaponType.IRON_AXE]: new Sprite(weaponTileset, 1, 1, SPRITE_16, SPRITE_16),
  [WeaponType.IRON_BOW]: new Sprite(weaponTileset, 3, 1, SPRITE_16, SPRITE_16),
  [WeaponType.IRON_SHIELD]: new Sprite(weaponTileset, 2, 1, SPRITE_16, SPRITE_16),
  [WeaponType.IRON_SPEAR]: new Sprite(weaponTileset, 4, 1, SPRITE_16, SPRITE_16),

  [WeaponType.GOLD_SWORD]: new Sprite(weaponTileset, 0, 6, SPRITE_16, SPRITE_16),
  [WeaponType.GOLD_AXE]: new Sprite(weaponTileset, 1, 6, SPRITE_16, SPRITE_16),
  [WeaponType.GOLD_BOW]: new Sprite(weaponTileset, 3, 6, SPRITE_16, SPRITE_16),
  [WeaponType.GOLD_SHIELD]: new Sprite(weaponTileset, 2, 6, SPRITE_16, SPRITE_16),
  [WeaponType.GOLD_SPEAR]: new Sprite(weaponTileset, 4, 6, SPRITE_16, SPRITE_16),

  [WeaponType.TURQUOISE_SWORD]: new Sprite(weaponTileset, 0, 5, SPRITE_16, SPRITE_16),
  [WeaponType.TURQUOISE_AXE]: new Sprite(weaponTileset, 1, 5, SPRITE_16, SPRITE_16),
  [WeaponType.TURQUOISE_BOW]: new Sprite(weaponTileset, 3, 5, SPRITE_16, SPRITE_16),
  [WeaponType.TURQUOISE_SHIELD]: new Sprite(weaponTileset, 2, 5, SPRITE_16, SPRITE_16),
  [WeaponType.TURQUOISE_SPEAR]: new Sprite(weaponTileset, 4, 5, SPRITE_16, SPRITE_16),

  [WeaponType.ZAPHIRE_SWORD]: new Sprite(weaponTileset, 0,3 , SPRITE_16, SPRITE_16),
  [WeaponType.ZAPHIRE_AXE]: new Sprite(weaponTileset, 1,3 , SPRITE_16, SPRITE_16),
  [WeaponType.ZAPHIRE_BOW]: new Sprite(weaponTileset, 3,3 , SPRITE_16, SPRITE_16),
  [WeaponType.ZAPHIRE_SHIELD]: new Sprite(weaponTileset, 2,3 , SPRITE_16, SPRITE_16),
  [WeaponType.ZAPHIRE_SPEAR]: new Sprite(weaponTileset, 4,3 , SPRITE_16, SPRITE_16),

  [WeaponType.EMERALD_SWORD]: new Sprite(weaponTileset, 0,4 , SPRITE_16, SPRITE_16),
  [WeaponType.EMERALD_AXE]: new Sprite(weaponTileset, 1,4 , SPRITE_16, SPRITE_16),
  [WeaponType.EMERALD_BOW]: new Sprite(weaponTileset, 3,4 , SPRITE_16, SPRITE_16),
  [WeaponType.EMERALD_SHIELD]: new Sprite(weaponTileset, 2,4 , SPRITE_16, SPRITE_16),
  [WeaponType.EMERALD_SPEAR]: new Sprite(weaponTileset, 4,4 , SPRITE_16, SPRITE_16),

  [WeaponType.RUBI_SWORD]: new Sprite(weaponTileset, 0,2 , SPRITE_16, SPRITE_16),
  [WeaponType.RUBI_AXE]: new Sprite(weaponTileset, 1,2 , SPRITE_16, SPRITE_16),
  [WeaponType.RUBI_BOW]: new Sprite(weaponTileset, 3,2 , SPRITE_16, SPRITE_16),
  [WeaponType.RUBI_SHIELD]: new Sprite(weaponTileset, 2,2 , SPRITE_16, SPRITE_16),
  [WeaponType.RUBI_SPEAR]: new Sprite(weaponTileset, 4,2 , SPRITE_16, SPRITE_16),
};
