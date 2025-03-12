import { Button } from "@/components/Button";
import { Carousel } from "@/components/carousel";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import type { InputSubmitContent } from "@/types";
import { isMediumContainer, isMobile } from "@/utils/isMobileSignal";
import type { CardsBlock } from "@typebot.io/blocks-inputs/cards/schema";
import { cn } from "@typebot.io/ui/lib/cn";
import { For, Index, type JSX, Show } from "solid-js";

type Props = {
  block: CardsBlock;
  onSubmit: (value: InputSubmitContent) => void;
  onTransitionEnd: () => void;
};

export const CardsCaroussel = (props: Props) => {
  const onButtonClick = (itemIndex: number, pathIndex: number) => {
    props.onSubmit({
      type: "text",
      value: props.block.items[itemIndex].paths?.[pathIndex]?.id ?? "",
      label: props.block.items[itemIndex].paths?.[pathIndex]?.text ?? "",
      attachments: props.block.items[itemIndex].imageUrl
        ? [{ url: props.block.items[itemIndex].imageUrl, type: "image" }]
        : undefined,
    });
  };

  return (
    <Carousel.Root
      slideCount={props.block.items.length}
      slidesPerPage={isMobile() ? 1.2 : isMediumContainer() ? 1.5 : 2.2}
      slidesPerMove={1}
      spacing="12px"
      class="w-[min(calc(var(--slides-per-page)*270px),100%)] -mr-5"
    >
      <div class="flex w-full justify-end mb-2 pr-2">
        <Carousel.Control class="flex gap-2">
          <Carousel.PrevTrigger
            asChild={(props) => (
              <Button variant="secondary" {...props}>
                <ArrowLeftIcon class="w-4 h-4" />
              </Button>
            )}
          ></Carousel.PrevTrigger>
          <Carousel.NextTrigger
            asChild={(props) => (
              <Button variant="secondary" {...props}>
                <ArrowRightIcon class="w-4 h-4" />
              </Button>
            )}
          ></Carousel.NextTrigger>
        </Carousel.Control>
      </div>
      <Carousel.ItemGroup class="rounded-host-bubble">
        <Index each={props.block.items}>
          {(item, index) => (
            <Carousel.Item index={index}>
              <Card>
                <Show when={item().imageUrl}>
                  {(imageUrl) => (
                    <img
                      src={imageUrl()}
                      alt="Card image"
                      class="aspect-[16/11] object-cover"
                    />
                  )}
                </Show>
                <div class="flex flex-col gap-2">
                  <Show when={item().title}>
                    {(title) => <h2 class="px-4 font-semibold">{title()}</h2>}
                  </Show>
                  <Show when={item().description}>
                    {(description) => <p class="px-4">{description()}</p>}
                  </Show>
                </div>
                <div class="px-3 pb-2">
                  <For each={item().paths}>
                    {(path, idx) => (
                      <Button
                        variant="secondary"
                        class={cn(
                          "w-full font-normal text-sm border-host-bubble-border rounded-none",
                          idx() === 0 &&
                            "rounded-t-host-bubble border border-b-0",
                          idx() !== 0 && "border border-b-0",
                          idx() === (item().paths?.length ?? 1) - 1 &&
                            "rounded-b-host-bubble border-b",
                        )}
                        size="sm"
                        on:click={() => onButtonClick(index, idx())}
                      >
                        {path.text}
                      </Button>
                    )}
                  </For>
                </div>
              </Card>
            </Carousel.Item>
          )}
        </Index>
      </Carousel.ItemGroup>
    </Carousel.Root>
  );
};

const Card = (props: { children: JSX.Element }) => {
  return <div class="typebot-card flex flex-col gap-4">{props.children}</div>;
};
