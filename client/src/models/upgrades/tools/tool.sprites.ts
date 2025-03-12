import { SingleSprite, SPRITE_64 } from '../../commons';
import { ToolType } from './tool.types';

const toolFolder = '/public/upgrades/tools/';

const toolSpriteSrcs: Record<string, string> = {
  [ToolType.SMALL_SHOVE]: `${toolFolder}small-shove.png`,
  [ToolType.SMALL_PICKAXE]: `${toolFolder}small-pickaxe.png`,
  [ToolType.SHOVE]: `${toolFolder}shove.png`,
  [ToolType.AXE]: `${toolFolder}axe.png`,
  [ToolType.PICKAXE]: `${toolFolder}pickaxe.png`,
  [ToolType.RAKE]: `${toolFolder}rake.png`,
  [ToolType.BIG_SHOVE]: `${toolFolder}big-shove.png`,
  [ToolType.GOLD_SACK]: `${toolFolder}gold-sack.png`,
  [ToolType.TURQUOISE_SACK]: `${toolFolder}turquoise-sack.png`,
  [ToolType.ZAPHIRE_SACK]: `${toolFolder}zaphire-sack.png`,
  [ToolType.EMERALD_SACK]: `${toolFolder}emerald-sack.png`,
  [ToolType.RUBI_SACK]: `${toolFolder}rubi-sack.png`,
  [ToolType.CAULDRON]: `${toolFolder}cauldron.png`,
};

export const toolSprites: Record<ToolType, SingleSprite> = {
  [ToolType.SMALL_SHOVE]: new SingleSprite(
    toolSpriteSrcs[ToolType.SMALL_SHOVE],
    SPRITE_64,
    SPRITE_64,
  ),
  [ToolType.SMALL_PICKAXE]: new SingleSprite(
    toolSpriteSrcs[ToolType.SMALL_PICKAXE],
    SPRITE_64,
    SPRITE_64,
  ),
  [ToolType.SHOVE]: new SingleSprite(toolSpriteSrcs[ToolType.SHOVE], SPRITE_64, SPRITE_64),
  [ToolType.AXE]: new SingleSprite(toolSpriteSrcs[ToolType.AXE], SPRITE_64, SPRITE_64),
  [ToolType.PICKAXE]: new SingleSprite(toolSpriteSrcs[ToolType.PICKAXE], SPRITE_64, SPRITE_64),
  [ToolType.RAKE]: new SingleSprite(toolSpriteSrcs[ToolType.RAKE], SPRITE_64, SPRITE_64),
  [ToolType.BIG_SHOVE]: new SingleSprite(toolSpriteSrcs[ToolType.BIG_SHOVE], SPRITE_64, SPRITE_64),
  [ToolType.GOLD_SACK]: new SingleSprite(toolSpriteSrcs[ToolType.GOLD_SACK], SPRITE_64, SPRITE_64),
  [ToolType.TURQUOISE_SACK]: new SingleSprite(
    toolSpriteSrcs[ToolType.TURQUOISE_SACK],
    SPRITE_64,
    SPRITE_64,
  ),
  [ToolType.ZAPHIRE_SACK]: new SingleSprite(
    toolSpriteSrcs[ToolType.ZAPHIRE_SACK],
    SPRITE_64,
    SPRITE_64,
  ),
  [ToolType.EMERALD_SACK]: new SingleSprite(
    toolSpriteSrcs[ToolType.EMERALD_SACK],
    SPRITE_64,
    SPRITE_64,
  ),
  [ToolType.RUBI_SACK]: new SingleSprite(toolSpriteSrcs[ToolType.RUBI_SACK], SPRITE_64, SPRITE_64),
  [ToolType.CAULDRON]: new SingleSprite(toolSpriteSrcs[ToolType.CAULDRON], SPRITE_64, SPRITE_64),
};
