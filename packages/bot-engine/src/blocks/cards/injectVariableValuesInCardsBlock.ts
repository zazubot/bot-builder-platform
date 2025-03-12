import type {
  CardsBlock,
  CardsItem,
} from "@typebot.io/blocks-inputs/cards/schema";
import { deepParseVariables } from "@typebot.io/variables/deepParseVariables";
import { findUniqueVariable } from "@typebot.io/variables/findUniqueVariable";
import type { Variable } from "@typebot.io/variables/schemas";
import { filterCardsItems } from "./filterCardItems";

type DynamicProps = {
  pictureSrcs: Variable["value"];
  titles: Variable["value"];
  descriptions: Variable["value"];
};

export const injectVariableValuesInCardsBlock =
  (variables: Variable[]) =>
  (block: CardsBlock): CardsBlock => {
    const dynamicProps = getDynamicProps(variables)(block);
    if (!dynamicProps)
      return deepParseVariables(variables)(filterCardsItems(variables)(block));
    return deepParseVariables(variables)({
      ...block,
      items: createDynamicCards(block.items[0], dynamicProps),
    });
  };

const getDynamicProps =
  (variables: Variable[]) =>
  (block: CardsBlock): DynamicProps | undefined => {
    if (block.items.length !== 1) return;
    const item = block.items[0];
    const pictureSrcsVariable = findUniqueVariable(variables)(item.imageUrl);
    const titlesVariable = findUniqueVariable(variables)(item.title);
    const descriptionsVariable = findUniqueVariable(variables)(
      item.description,
    );
    const dynamicItems = {
      pictureSrcs: pictureSrcsVariable?.value,
      titles: titlesVariable?.value,
      descriptions: descriptionsVariable?.value,
    };
    if (
      !Array.isArray(dynamicItems.pictureSrcs) &&
      !Array.isArray(dynamicItems.titles) &&
      !Array.isArray(dynamicItems.descriptions)
    )
      return;
    return dynamicItems;
  };

const createDynamicCards = (
  item: CardsItem,
  dynamicProps: DynamicProps,
): CardsItem[] => {
  const cards: CardsItem[] = [];
  let idx = 0;
  if (Array.isArray(dynamicProps.titles)) {
    for (const title of dynamicProps.titles) {
      cards.push({
        ...item,
        title,
        description: Array.isArray(dynamicProps.descriptions)
          ? dynamicProps.descriptions[idx]
          : dynamicProps.descriptions,
        imageUrl: Array.isArray(dynamicProps.pictureSrcs)
          ? dynamicProps.pictureSrcs[idx]
          : dynamicProps.pictureSrcs,
      });
      idx += 1;
    }
  }
  if (Array.isArray(dynamicProps.pictureSrcs)) {
    for (const pictureSrc of dynamicProps.pictureSrcs) {
      cards.push({
        ...item,
        imageUrl: pictureSrc,
        title: Array.isArray(dynamicProps.titles)
          ? dynamicProps.titles[idx]
          : dynamicProps.titles,
        description: Array.isArray(dynamicProps.descriptions)
          ? dynamicProps.descriptions[idx]
          : dynamicProps.descriptions,
      });
      idx += 1;
    }
  }
  if (Array.isArray(dynamicProps.descriptions)) {
    for (const description of dynamicProps.descriptions) {
      cards.push({
        ...item,
        description,
        imageUrl: Array.isArray(dynamicProps.pictureSrcs)
          ? dynamicProps.pictureSrcs[idx]
          : dynamicProps.pictureSrcs,
        title: Array.isArray(dynamicProps.titles)
          ? dynamicProps.titles[idx]
          : dynamicProps.titles,
      });
      idx += 1;
    }
  }
  return cards;
};
