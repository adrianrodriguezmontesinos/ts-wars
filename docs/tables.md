# GAME LOGIC

## RESOURCES

### RESOURCES AVALIABLES PER TERRAIN

| Terrain | Rare | Coal | Bronze | Iron | Gold | Turquoise | Zaphire | Emerald | Rubi | Diamond |
| ------- | ---- | ---- | ------ | ---- | ---- | --------- | ------- | ------- | ---- | ------- |
| grass   | 100  | 1M   | 500k   | 100k | 50k  | 1         | 0       | 0       | 0    | 0       |
| grass2  | 50   | 10M  | 1M     | 500k | 100k | 2         | 0       | 0       | 0    | 0       |
| grass3  | 25   | 50M  | 10M    | 1M   | 500k | 4         | 1       | 0       | 0    | 0       |
| grass4  | 12   | 100M | 100M   | 10M  | 1M   | 8         | 2       | 1       | 0    | 0       |
| grass5  | 6    | 500M | 900M   | 50M  | 10M  | 10        | 3       | 2       | 0    | 0       |
| desert  | 80   | 100k | 50k    | 5M   | 100k | 2         | 20      | 0       | 0    | 0       |
| desert2 | 40   | 100k | 100k   | 50M  | 500k | 4         | 200     | 0       | 0    | 0       |
| desert3 | 20   | 100k | 500k   | 100M | 1M   | 8         | 600     | 1       | 0    | 0       |
| desert4 | 10   | 100k | 1M     | 500M | 10M  | 16        | 2K      | 2       | 1    | 0       |
| desert5 | 5    | 100k | 10M    | 800M | 20M  | 32        | 20k     | 4       | 2    | 0       |
| soil    | 60   | 500k | 1M     | 1M   | 100k | 10        | 30      | 20      | 1    | 0       |
| soil2   | 30   | 5M   | 10M    | 10M  | 500k | 100       | 300     | 200     | 2    | 0       |
| soil3   | 15   | 50M  | 80M    | 50M  | 2M   | 1K        | 900     | 600     | 3    | 0       |
| soil4   | 7    | 300M | 300M   | 500M | 100M | 10k       | 3K      | 2k      | 5    | 0       |
| soil5   | 3    | 900M | 600M   | 800M | 200M | 100k      | 30k     | 20k     | 10   | 1       |
| wax     | 40   | 1k   | 1k     | 1k   | 1k   | 1k        | 100     | 50      | 10   | 1       |
| wax2    | 20   | 8k   | 4k     | 2k   | 2k   | 10k       | 1k      | 10k     | 50   | 2       |
| wax3    | 10   | 32k  | 16k    | 4k   | 3k   | 100k      | 50k     | 20k     | 100  | 4       |
| wax4    | 5    | 256k | 64k    | 8k   | 4k   | 500k      | 100k    | 30k     | 500  | 8       |
| wax5    | 2    | 1M   | 256k   | 16k  | 5k   | 1M        | 500k    | 50k     | 1k   | 16      |

- There's a resource variation +-10%.


### RESOURCES MINING AT MINES (EACH 5 SEG)

| Type  | Coal | Bronze | Iron | Gold |
| ----- | ---- | ------ | ---- | ---- |
| mine  | 20   | 10     | 15   | 5    |
| mine2 | 20   | 16     | 15   | 12   |
| mine3 | 10   | 10     | 10   | 10   |

### RESOURCES MINING AT MINES (EACH 1 MIN)

| Type  | Turquoise | Zaphire | Emerald | Rubi | Diamond |
| ----- | --------- | ------- | ------- | ---- | ------- |
| mine  | 2         | 1       | 1       | 0    | 0       |
| mine2 | 10        | 5       | 2       | 0    | 0       |
| mine3 | 20        | 10      | 5       | 2    | 1       |

### PLAYER INITIAL RESOURCES

| Building    | Coal | Bronze | Iron | Gold | Turquoise | Zaphire | Emerald | Rubi | Diamond |
| ----------- | ---- | ------ | ---- | ---- | --------- | ------- | ------- | ---- | ------- |
| house       | 1000 | 1000   | 400  | 100  | 0         | 0       | 0       | 0    | 0       |

## COSTS - BUILDINGS

### BUILDING COSTS

| Building    | Coal | Bronze | Iron | Gold | Turquoise | Zaphire | Emerald | Rubi | Diamond |
| ----------- | ---- | ------ | ---- | ---- | --------- | ------- | ------- | ---- | ------- |
| house       | 100  | 0      | 50   | 0    | 0         | 0       | 0       | 0    | 0       |
| house2      | 100k | 0      | 50k  | 0    | 2         | 0       | 0       | 0    | 0       |
| house3      | 1M   | 0      | 500k | 0    | 1k        | 10      | 10      | 0    | 0       |
| farm        | 0    | 100    | 0    | 10   | 0         | 0       | 0       | 0    | 0       |
| farm2       | 0    | 100k   | 0    | 10k  | 0         | 3       | 0       | 0    | 0       |
| farm3       | 0    | 1M     | 0    | 100k | 0         | 3k      | 3       | 0    | 0       |
| mine        | 100  | 50     | 50   | 10   | 0         | 0       | 0       | 0    | 0       |
| mine2       | 500k | 100k   | 50k  | 10k  | 50        | 30      | 10      | 0    | 0       |
| mine3       | 10M  | 5M     | 500k | 100k | 50k       | 30k     | 10k     | 0    | 0       |
| barracks    | 200  | 100    | 80   | 50   | 0         | 0       | 0       | 0    | 0       |
| barracks2   | 200k | 100k   | 100k | 50k  | 80        | 60      | 30      | 1    | 0       |
| barracks3   | 20M  | 10M    | 8M   | 500k | 200       | 60k     | 3k      | 5    | 0       |
| blacksmith  | 1k   | 500    | 200  | 100  | 2         | 0       | 0       | 0    | 0       |
| blacksmith2 | 200k | 100k   | 100k | 50k  | 200       | 80      | 100     | 2    | 0       |
| blacksmith3 | 20M  | 10M    | 8M   | 500k | 200k      | 80k     | 10k     | 8    | 0       |
| church      | 10k  | 2k     | 1k   | 500  | 3         | 1       | 0       | 0    | 0       |
| church2     | 2M   | 200k   | 100k | 500k | 300       | 150     | 100     | 20   | 0       |
| church3     | 40M  | 2M     | 1M   | 1M   | 300k      | 150k    | 20k     | 100  | 0       |
| castle      | 1k   | 1k     | 1k   | 1k   | 1         | 1       | 1       | 1    | 1       |
| castle2     | 1M   | 1M     | 1M   | 1M   | 600       | 400     | 300     | 100  | 4       |
| castle3     | 100M | 100M   | 100M | 50M  | 600k      | 200k    | 30k     | 600  | 8       |

- There's a building cost variation depending on the terrain.

## COSTS - UPGRADES

### BOOK COSTS

| Book                 | Coal | Bronze | Iron | Gold | Turquoise | Zaphire | Emerald | Rubi | Diamond |
| -------------------- | ---- | ------ | ---- | ---- | --------- | ------- | ------- | ---- | ------- |
| coal papyrus         | 1k   | 0      | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| coal pergamine       | 50k  | 0      | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| coal manuscript      | 200k | 0      | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| coal tome            | 1M   | 0      | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| coal scripture       | 10M  | 0      | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| coal grimoire        | 50M  | 0      | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| coal bible           | 100M | 0      | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| coal codex           | 500M | 0      | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| bronze papyrus       | 0    | 1k     | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| bronze pergamine     | 0    | 50k    | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| bronze manuscript    | 0    | 200k   | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| bronze tome          | 0    | 1M     | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| bronze scripture     | 0    | 10M    | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| bronze grimoire      | 0    | 50M    | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| bronze bible         | 0    | 100M   | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| bronze codex         | 0    | 500M   | 0    | 0    | 0         | 0       | 0       | 0    | 0       |
| iron papyrus         | 0    | 0      | 1k   | 0    | 0         | 0       | 0       | 0    | 0       |
| iron pergamine       | 0    | 0      | 40k  | 0    | 0         | 0       | 0       | 0    | 0       |
| iron manuscript      | 0    | 0      | 200k | 0    | 0         | 0       | 0       | 0    | 0       |
| iron tome            | 0    | 0      | 900k | 0    | 0         | 0       | 0       | 0    | 0       |
| iron scripture       | 0    | 0      | 8M   | 0    | 0         | 0       | 0       | 0    | 0       |
| iron grimoire        | 0    | 0      | 40M  | 0    | 0         | 0       | 0       | 0    | 0       |
| iron bible           | 0    | 0      | 90M  | 0    | 0         | 0       | 0       | 0    | 0       |
| iron codex           | 0    | 0      | 400M | 0    | 0         | 0       | 0       | 0    | 0       |
| gold papyrus         | 0    | 0      | 0    | 800  | 0         | 0       | 0       | 0    | 0       |
| gold pergamine       | 0    | 0      | 0    | 30k  | 0         | 0       | 0       | 0    | 0       |
| gold manuscript      | 0    | 0      | 0    | 100k | 0         | 0       | 0       | 0    | 0       |
| gold tome            | 0    | 0      | 0    | 700k | 0         | 0       | 0       | 0    | 0       |
| gold scripture       | 0    | 0      | 0    | 3M   | 0         | 0       | 0       | 0    | 0       |
| gold grimoire        | 0    | 0      | 0    | 10M  | 0         | 0       | 0       | 0    | 0       |
| gold bible           | 0    | 0      | 0    | 50M  | 0         | 0       | 0       | 0    | 0       |
| gold codex           | 0    | 0      | 0    | 100M | 0         | 0       | 0       | 0    | 0       |
| turqouise papyrus    | 0    | 0      | 0    | 0    | 50        | 0       | 0       | 0    | 0       |
| turqouise pergamine  | 0    | 0      | 0    | 0    | 100       | 0       | 0       | 0    | 0       |
| turqouise manuscript | 0    | 0      | 0    | 0    | 500       | 0       | 0       | 0    | 0       |
| turqouise tome       | 0    | 0      | 0    | 0    | 5k        | 0       | 0       | 0    | 0       |
| turqouise scripture  | 0    | 0      | 0    | 0    | 40k       | 0       | 0       | 0    | 0       |
| turqouise grimoire   | 0    | 0      | 0    | 0    | 80k       | 0       | 0       | 0    | 0       |
| turqouise bible      | 0    | 0      | 0    | 0    | 100k      | 0       | 0       | 0    | 0       |
| turqouise codex      | 0    | 0      | 0    | 0    | 500k      | 0       | 0       | 0    | 0       |
| zaphire papyrus      | 0    | 0      | 0    | 0    | 0         | 50      | 0       | 0    | 0       |
| zaphire pergamine    | 0    | 0      | 0    | 0    | 0         | 100     | 0       | 0    | 0       |
| zaphire manuscript   | 0    | 0      | 0    | 0    | 0         | 300     | 0       | 0    | 0       |
| zaphire tome         | 0    | 0      | 0    | 0    | 0         | 3k      | 0       | 0    | 0       |
| zaphire scripture    | 0    | 0      | 0    | 0    | 0         | 10k     | 0       | 0    | 0       |
| zaphire grimoire     | 0    | 0      | 0    | 0    | 0         | 40k     | 0       | 0    | 0       |
| zaphire bible        | 0    | 0      | 0    | 0    | 0         | 80k     | 0       | 0    | 0       |
| zaphire codex        | 0    | 0      | 0    | 0    | 0         | 250k    | 0       | 0    | 0       |
| emerald papyrus      | 0    | 0      | 0    | 0    | 0         | 0       | 50      | 0    | 0       |
| emerald pergamine    | 0    | 0      | 0    | 0    | 0         | 0       | 100     | 0    | 0       |
| emerald manuscript   | 0    | 0      | 0    | 0    | 0         | 0       | 250     | 0    | 0       |
| emerald tome         | 0    | 0      | 0    | 0    | 0         | 0       | 100     | 0    | 0       |
| emerald scripture    | 0    | 0      | 0    | 0    | 0         | 0       | 400     | 0    | 0       |
| emerald grimoire     | 0    | 0      | 0    | 0    | 0         | 0       | 4k      | 0    | 0       |
| emerald bible        | 0    | 0      | 0    | 0    | 0         | 0       | 8k      | 0    | 0       |
| emerald codex        | 0    | 0      | 0    | 0    | 0         | 0       | 25k     | 0    | 0       |
| rubi papyrus         | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 10   | 0       |
| rubi pergamine       | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 20   | 0       |
| rubi manuscript      | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 40   | 0       |
| rubi tome            | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 80   | 0       |
| rubi scripture       | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 100  | 0       |
| rubi grimoire        | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 200  | 0       |
| rubi bible           | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 300  | 0       |
| rubi codex           | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 500  | 0       |


### TOOLS COSTS

| Upgrade        | Coal | Bronze | Iron | Gold | Turquoise | Zaphire | Emerald | Rubi | Diamond |
| -------------- | ---- | ------ | ---- | ---- | --------- | ------- | ------- | ---- | ------- |
| small shove    | 800  | 600    | 400  | 100  | 0         | 0       | 0       | 0    | 0       |
| small pickaxe  | 1k   | 1k     | 500  | 500  | 0         | 0       | 0       | 0    | 0       |
| shove          | 5k   | 4k     | 3k   | 2k   | 0         | 0       | 0       | 0    | 0       |
| axe            | 10k  | 8k     | 5k   | 5k   | 0         | 0       | 0       | 0    | 0       |
| pickaxe        | 20k  | 20k    | 10k  | 10k  | 0         | 0       | 0       | 0    | 0       |
| rake           | 40k  | 40k    | 30k  | 20k  | 0         | 0       | 0       | 0    | 0       |
| big shove      | 80k  | 70k    | 70k  | 60k  | 0         | 0       | 0       | 0    | 0       |
| gold sack      | 100k | 100k   | 90k  | 70k  | 1         | 0       | 0       | 0    | 0       |
| turquoise sack | 200k | 200k   | 100k | 80k  | 5         | 1       | 0       | 0    | 0       |
| zaphire sack   | 400k | 300k   | 200k | 100k | 50        | 5       | 0       | 0    | 0       |
| emerald sack   | 600k | 300k   | 200k | 100k | 500       | 50      | 1       | 0    | 0       |
| rubi sack      | 1M   | 600k   | 300k | 200k | 1k        | 200     | 10      | 1    | 0       |
| cauldron       | 0    | 0      | 0    | 0    | 0         | 0       | 0       | 100  | 4       |

## UPGRADES

### TOOLS

| Upgrade        | Desc                                          |
| -------------- | --------------------------------------------- |
| small shove    | Increase coal and bronze producction at 30%   |
| small pickaxe  | Increase iron and gold producction at 30%     |
| shove          | Increase coal and bronze producction at 60%   |
| axe            | Increase iron producction at 60%              |
| pickaxe        | Increase gold producction at 60%              |
| rake           | Increase iron production at 100%              |
| big shove      | Increase coal and bronze producction at 100%  |
| gold sack      | Increase gold producction at 100%             |
| turquoise sack | Increase turquoise producction at 100%        |
| zaphire sack   | Increase zaphire producction at 100%          |
| emerald sack   | Increase emerald producction at 100%          |
| rubi sack      | Increase rubi producction at 100%             |
| cauldron       | Increase all producction at 200%              |

