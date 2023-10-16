"use client";

import {
  RadioGroup,
  Radio,
  Button,
  // Accordion,
  // Tabs,
  // Textarea,
  Input,
  // Tab,
  // AccordionItem,
  Pagination,
  extendVariants,
  PaginationItem,
} from "@nextui-org/react";
import NextLink from "next/link";
import {useState} from "react";
import {useSearchParams} from "next/navigation";

// import {SearchLinearIcon} from "@/components/icons";

const MyRadioGroup = () => {
  const [radio, setRadio] = useState("1");

  return (
    <RadioGroup value={radio} onValueChange={setRadio}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
      <Radio value="4">Radio 4</Radio>
      <Radio value="5">Radio 5</Radio>
      <Radio value="6">Radio 6</Radio>
      <Radio value="7">Radio 7</Radio>
      <Radio value="8">Radio 8</Radio>
      <Radio value="9">Radio 9</Radio>
      <Radio value="10">Radio 10</Radio>
      <Radio value="11">Radio 11</Radio>
      <Radio value="12">Radio 12</Radio>
      <Radio value="13">Radio 13</Radio>
      <Radio value="14">Radio 14</Radio>
      <Radio value="15">Radio 15</Radio>
      <Radio value="16">Radio 16</Radio>
      <Radio value="17">Radio 17</Radio>
      <Radio value="18">Radio 18</Radio>
      <Radio value="19">Radio 19</Radio>
      <Radio value="20">Radio 20</Radio>
      <Radio value="21">Radio 21</Radio>
      <Radio value="22">Radio 22</Radio>
      <Radio value="23">Radio 23</Radio>
      <Radio value="24">Radio 24</Radio>
      <Radio value="25">Radio 25</Radio>
      <Radio value="26">Radio 26</Radio>
      <Radio value="27">Radio 27</Radio>
      <Radio value="28">Radio 28</Radio>
      <Radio value="29">Radio 29</Radio>
      <Radio value="30">Radio 30</Radio>
      <Radio value="31">Radio 31</Radio>
      <Radio value="32">Radio 32</Radio>
      <Radio value="33">Radio 33</Radio>
      <Radio value="34">Radio 34</Radio>
      <Radio value="35">Radio 35</Radio>
      <Radio value="36">Radio 36</Radio>
      <Radio value="37">Radio 37</Radio>
      <Radio value="38">Radio 38</Radio>
      <Radio value="39">Radio 39</Radio>
      <Radio value="40">Radio 40</Radio>
      <Radio value="41">Radio 41</Radio>
      <Radio value="42">Radio 42</Radio>
      <Radio value="43">Radio 43</Radio>
      <Radio value="44">Radio 44</Radio>
      <Radio value="45">Radio 45</Radio>
      <Radio value="46">Radio 46</Radio>
      <Radio value="47">Radio 47</Radio>
      <Radio value="48">Radio 48</Radio>
      <Radio value="49">Radio 49</Radio>
      <Radio value="50">Radio 50</Radio>
      <Radio value="51">Radio 51</Radio>
      <Radio value="52">Radio 52</Radio>
      <Radio value="53">Radio 53</Radio>
      <Radio value="54">Radio 54</Radio>
      <Radio value="55">Radio 55</Radio>
      <Radio value="56">Radio 56</Radio>
      <Radio value="57">Radio 57</Radio>
      <Radio value="58">Radio 58</Radio>
      <Radio value="59">Radio 59</Radio>
      <Radio value="60">Radio 60</Radio>
      <Radio value="61">Radio 61</Radio>
      <Radio value="62">Radio 62</Radio>
    </RadioGroup>
  );
};

const MyInput = extendVariants(Input, {
  variants: {
    color: {
      stone: {
        inputWrapper: [
          "bg-zinc-100",
          "border",
          "shadow",
          "transition-colors",
          "focus-within:bg-zinc-100",
          "data-[hover=true]:border-zinc-600",
          "data-[hover=true]:bg-zinc-100",
          "group-data-[focus=true]:border-zinc-600",
          // dark theme
          "dark:bg-zinc-900",
          "dark:border-zinc-800",
          "dark:data-[hover=true]:bg-zinc-900",
          "dark:focus-within:bg-zinc-900",
        ],
        input: [
          "text-zinc-800",
          "placeholder:text-zinc-600",
          // dark theme
          "dark:text-zinc-400",
          "dark:placeholder:text-zinc-600",
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-unit-6 min-h-unit-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-unit-10 min-h-unit-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "h-unit-14 min-h-unit-14",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[4px]",
      },
    },
    textSize: {
      base: {
        input: "text-base",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {},
    },
  },
  defaultVariants: {
    color: "stone",
    textSize: "base",
    removeLabel: true,
  },
});

const MyButton2 = extendVariants(Button, {
  variants: {
    color: {
      foreground:
        "bg-foreground text-background data-[hover=true]:bg-foreground/90 data-[pressed=true]:bg-foreground/80",
    },
    isScalable: {
      true: "scale-125",
      false: "",
    },
    size: {
      xl: "size--xl",
      "2xl": "size--2xl",
    },
    mySize: {
      lg: "px-12 py-6 text-lg",
      xl: "px-12 py-6 text-xl",
    },
  },
  defaultVariants: {},
});

export default function NextUIPerf() {
  const [textA, setTextA] = useState<string>("");
  const [textB, setTextB] = useState<string>("");
  const [textC, setTextC] = useState<string>("");

  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page"));

  return (
    <div className="w-full p-24 gap-4 flex flex-col">
      {/* <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
          cupidatat voluptate eu officia. Ut laborum sunt nostrud magna. Ex magna esse cillum enim
          incididunt pariatur qui veniam dolor. Exercitation id culpa et enim mollit duis duis
          aliquip. Magna ullamco est cupidatat laboris irure pariatur aliquip duis aute cillum.
          Officia irure do laboris ea nisi sunt reprehenderit laboris irure. Ex eiusmod in duis
          veniam excepteur. Sunt et et laboris culpa. Mollit excepteur occaecat elit anim officia.
          Laborum commodo proident cupidatat pariatur eu veniam id qui do culpa. Quis consectetur
          adipisicing anim ex ea velit excepteur. Deserunt laboris ex aute sunt laborum tempor ea
          enim dolore ut in. Id aliqua Lorem exercitation qui velit nostrud anim reprehenderit enim.
          Nisi elit fugiat deserunt elit. Sit excepteur ipsum enim excepteur irure irure sint veniam
          elit consequat ea id. Lorem ea qui sunt enim occaecat excepteur officia ex consequat
          nostrud. Tempor sint Lorem est culpa do.
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
          cupidatat voluptate eu officia. Ut laborum sunt nostrud magna. Ex magna esse cillum enim
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          Non est aliqua tempor occaecat laborum. Lorem culpa minim irure mollit. Est qui
          reprehenderit commodo magna proident anim ipsum ex. Mollit id amet officia nisi excepteur
          eu. Commodo elit commodo nisi nisi aute eu aliquip aliquip voluptate exercitation ullamco
          ipsum eiusmod veniam. Magna in laborum anim amet anim ex elit aliqua nostrud mollit.
          Pariatur ullamco cillum proident aliqua nostrud. Labore ea veniam cillum duis veniam in
        </AccordionItem>
      </Accordion>
      <Tabs classNames={{panel: "flex flex-col gap-5"}} variant="underlined">
        <Tab title="Test 1">
          <Textarea defaultValue="ASdasd" label="Default value (uncontrolled)" />
          <Input label="Text B Tab 1" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 1" value={textC} onValueChange={setTextC} />
        </Tab>
        <Tab title="Test 2">
          <Textarea label="Text B Tab 2" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 2" value={textC} onValueChange={setTextC} />
        </Tab>
        <Tab title="Test 3">
          <Textarea label="Text B Tab 3" value={textB} onValueChange={setTextB} />
          <Textarea label="Text C Tab 3" value={textC} onValueChange={setTextC} />
        </Tab>
      </Tabs>

      <h2>Outside</h2>
      <Textarea label="Text A" placeholder="Text A" value={textA} onValueChange={setTextA} />
      <Textarea label="Text B" placeholder="Text B" value={textB} onValueChange={setTextB} />
      <Textarea label="Text C" placeholder="Text C" value={textC} onValueChange={setTextC} />

      <MyRadioGroup />

      <MyInput
        isClearable
        placeholder="Search..."
        radius="md"
        size="md"
        startContent={<SearchLinearIcon className="text-zinc-500" size={16} />}
      />

      <Button>Click Me!</Button>

      <MyButton2 color="foreground">Press Me!</MyButton2> */}

      <Pagination
        showControls
        initialPage={page ?? 1}
        renderItem={({page, ...itemProps}) => {
          return (
            <PaginationItem as={NextLink} href={`/examples/perf?page=${page}`} {...itemProps} />
          );
        }}
        total={10}
      />
    </div>
  );
}
