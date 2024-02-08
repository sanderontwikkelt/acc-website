/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import InfoTooltip from "~/components/info-tooltip";
import Slider from "~/components/slider";
import { Checkbox } from "~/components/ui/checkbox";
import DynamicButtonList from "~/components/ui/dynamic-button-list";
import DynamicImageGridList from "~/components/ui/dynamic-image-grid-list";
import DynamicLinkImages from "~/components/ui/dynamic-link-images";
import DynamicLinks from "~/components/ui/dynamic-links";
import DynamicList from "~/components/ui/dynamic-list";
import DynamicListWithButton from "~/components/ui/dynamic-list-with-button";
import DynamicStringList from "~/components/ui/dynamic-string-list";
import DynamicTeachers from "~/components/ui/dynamic-teachers";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import MediaSelect from "~/components/ui/media-select";
import RichInput from "~/components/ui/rich-input";
import RichText from "~/components/ui/rich-text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import SizePicker from "~/components/ui/size-picker";
import StyleForm from "~/components/ui/style-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { BlockType } from "~/lib/html-blocks";
import { CollapsibleButton } from "./collapsable-button";

const AsideEditor = ({
  open,
  setOpen,
  block,
  setBlock,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
  block: BlockType | null;
  setBlock: (b: BlockType | null) => void;
}) => {
  const fields = block ? block.fields : null;
  const handleFields = (field: string, value: any) => {
    block &&
      setBlock({
        ...block,
        fields: {
          ...block?.fields,
          [field]: {
            ...((block.fields as any)[field] || {}),
            value,
          },
        },
      } as BlockType);
  };

  const handleBlock = useCallback(
    (field: string, value: any) => {
      block && setBlock({ ...block, [field]: value });
    },
    [block],
  );

  return (
    <Slider
      title={block?.label || ""}
      open={open}
      setOpen={setOpen}
      onDelete={() => setBlock(null)}
    >
      <div className="flex flex-1 flex-col justify-between">
        <div className="divide-y divide-gray-700">
          <Tabs defaultValue="fields" className="w-full py-5">
            <TabsList className="mr-5 grid grid-cols-2 max-md:mx-5">
              <TabsTrigger value="fields">Block velden</TabsTrigger>
              <TabsTrigger value="general">Algemeen</TabsTrigger>
            </TabsList>
            <TabsContent value="fields">
              <div className="max-h-[calc(100vh-9.9rem)] space-y-8 overflow-auto py-2 pl-1 pr-5 max-md:px-5">
                {fields && Object.entries(fields).length ? (
                  Object.entries(fields)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .map(
                      (
                        [
                          fieldName,
                          { label, type, options, value, showOnVariants },
                        ]: any,
                        i: number,
                      ) => {
                        if (
                          showOnVariants &&
                          !showOnVariants.includes(
                            block?.fields.variant?.value || "default",
                          )
                        )
                          return null;
                        const uuid = block?.id + fieldName + i;
                        return (
                          <div className="space-y-2" key={fieldName}>
                            {!["button"].includes(type) && (
                              <Label htmlFor={uuid}>{label}</Label>
                            )}
                            {{
                              boolean: (
                                <Checkbox
                                  className="block"
                                  checked={value}
                                  id={uuid}
                                  onCheckedChange={(checked) =>
                                    handleFields(fieldName, checked)
                                  }
                                />
                              ),
                              string: (
                                <RichInput
                                  value={value}
                                  id={uuid}
                                  onChange={(v) => handleFields(fieldName, v)}
                                />
                              ),
                              input: (
                                <Input
                                  value={value}
                                  id={uuid}
                                  onChange={(e) =>
                                    handleFields(fieldName, e.target.value)
                                  }
                                />
                              ),
                              number: (
                                <Input
                                  number
                                  value={value}
                                  id={uuid}
                                  onChange={(e) =>
                                    handleFields(fieldName, e.target.value)
                                  }
                                />
                              ),
                              // text: (
                              //   <Textarea
                              //     value={value}
                              //     id={uuid}
                              //     onChange={(e) =>
                              //       handleFields(fieldName, e.target.value)
                              //     }
                              //   />
                              // ),
                              text: (
                                <RichText
                                  value={value}
                                  id={uuid}
                                  onChange={(e) => handleFields(fieldName, e)}
                                />
                              ),
                              enum: (
                                <Select
                                  value={value}
                                  onValueChange={(v) =>
                                    handleFields(fieldName, v)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecteer een variant" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {options?.map(
                                      ({
                                        key,
                                        label,
                                      }: {
                                        key: string;
                                        label: string;
                                      }) => (
                                        <SelectItem key={key} value={key}>
                                          {label}
                                        </SelectItem>
                                      ),
                                    )}
                                  </SelectContent>
                                </Select>
                              ),
                              image: (
                                <MediaSelect
                                  values={value ? [value] : null}
                                  onChange={([media]) =>
                                    handleFields(fieldName, media)
                                  }
                                />
                              ),
                              strings: (
                                <DynamicStringList
                                  values={value?.length ? value : []}
                                  onChange={(list) =>
                                    handleFields(fieldName, list)
                                  }
                                />
                              ),
                              list: (
                                <DynamicList
                                  values={value?.length ? value : []}
                                  onChange={(list) =>
                                    handleFields(fieldName, list)
                                  }
                                />
                              ),
                              imagesWithLink: (
                                <DynamicLinkImages
                                  values={value?.length ? value : []}
                                  onChange={(list) =>
                                    handleFields(fieldName, list)
                                  }
                                />
                              ),
                              links: (
                                <DynamicLinks
                                  values={value?.length ? value : []}
                                  onChange={(list) =>
                                    handleFields(fieldName, list)
                                  }
                                />
                              ),
                              teachers: (
                                <DynamicTeachers
                                  values={value?.length ? value : []}
                                  onChange={(list) =>
                                    handleFields(fieldName, list)
                                  }
                                />
                              ),
                              imageGrid: (
                                <DynamicImageGridList
                                  values={value?.length ? value : []}
                                  onChange={(list) =>
                                    handleFields(fieldName, list)
                                  }
                                />
                              ),
                              listWithButton: (
                                <DynamicListWithButton
                                  values={value?.length ? value : []}
                                  onChange={(list) =>
                                    handleFields(fieldName, list)
                                  }
                                />
                              ),
                              buttons: (
                                <DynamicButtonList
                                  values={value?.length ? value : []}
                                  onChange={(list) =>
                                    handleFields(fieldName, list)
                                  }
                                />
                              ),
                              images: (
                                <MediaSelect
                                  multiple
                                  values={value}
                                  onChange={(media) =>
                                    handleFields(fieldName, media)
                                  }
                                />
                              ),
                              video: (
                                <MediaSelect
                                  type="video"
                                  values={value ? [value] : null}
                                  onChange={([media]) =>
                                    handleFields(fieldName, media)
                                  }
                                />
                              ),
                              button: (
                                <CollapsibleButton
                                  value={value}
                                  setValue={(media) =>
                                    handleFields(fieldName, media)
                                  }
                                >
                                  <Label>{label}</Label>
                                </CollapsibleButton>
                              ),
                            }[type as "string" | "text" | "image" | "enum"] ||
                              null}
                          </div>
                        );
                      },
                    )
                ) : (
                  <p className="mx-auto max-w-[20rem] text-center text-sm">
                    Geen velden beschikbaar voor dit Block
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="general">
              <div className="max-h-[calc(100vh-9.9rem)] space-y-8 overflow-auto py-2 pl-1 pr-5 max-md:px-5">
                <div className="space-y-2">
                  <Label>
                    ID
                    <InfoTooltip>
                      Stuur een gebruiker naar een ID door bij een Knop de Href
                      met # + ID in te vullen.
                    </InfoTooltip>
                  </Label>
                  <Input
                    value={block?.id}
                    id={uuidv4()}
                    onChange={(e) => handleBlock("id", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maximale breedte</Label>
                  <SizePicker
                    value={block?.maxWidth || ""}
                    onChange={(e) => handleBlock("maxWidth", e)}
                  />
                </div>
                <StyleForm
                  value={block?.style}
                  onChange={(style) => handleBlock("style", style)}
                  append="Buiten"
                />
                <StyleForm
                  value={block?.innerStyle}
                  onChange={(style) => handleBlock("innerStyle", style)}
                  append="Binnen"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Slider>
  );
};

export default AsideEditor;
