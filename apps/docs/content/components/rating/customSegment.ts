const AngryEmojicon = `export const AngryEmojicon = ({...props}) => {
  return (
    <svg
      viewBox="-5.28 -5.28 26.56 26.56"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 4H4V5.5C4 6.32843 4.67157 7 5.5 7C6.32843 7 7 6.32843 7 5.5L5 4ZM12 4H11L9 5.5C9 6.32843 9.67157 7 10.5 7C11.3284 7 12 6.32843 12 5.5V4ZM8 10C6.89543 10 6 10.8954 6 12H4C4 9.79086 5.79086 8 8 8C10.2091 8 12 9.79086 12 12H10C10 10.8954 9.10457 10 8 10Z"
        fillRule="evenodd"
      />
    </svg>
  );
};
`;

const SadEmojicon = `export const SadEmojicon = ({...props}) => {
  return (
    <svg
      viewBox="-11.3 -11.3 56.85 56.85"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path d="M17.125,0C7.668,0,0,7.667,0,17.125S7.668,34.25,17.125,34.25c9.459,0,17.125-7.667,17.125-17.125S26.584,0,17.125,0z M23.445,11.422c1.355,0,2.453,1.099,2.453,2.453s-1.098,2.453-2.453,2.453c-1.354,0-2.451-1.099-2.451-2.453 S22.093,11.422,23.445,11.422z M10.806,11.422c1.354,0,2.453,1.099,2.453,2.453s-1.099,2.453-2.453,2.453s-2.453-1.099-2.453-2.453 S9.453,11.422,10.806,11.422z M26.457,25.641c-0.26,0.492-0.77,0.801-1.328,0.801H9.121c-0.559,0-1.067-0.309-1.328-0.801 c-0.26-0.494-0.225-1.09,0.093-1.549c2.098-3.046,5.551-4.865,9.239-4.865c3.689,0,7.146,1.819,9.24,4.866 C26.684,24.55,26.718,25.146,26.457,25.641z" />
    </svg>
  );
}
`;

const StraightEmojicon = `export const StraightEmojicon = ({...props}) => {
  return (
    <svg
      viewBox="-5.28 -5.28 26.56 26.56"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.5 7C6.32843 7 7 6.32843 7 5.5C7 4.67157 6.32843 4 5.5 4C4.67157 4 4 4.67157 4 5.5C4 6.32843 4.67157 7 5.5 7ZM12 5.5C12 6.32843 11.3284 7 10.5 7C9.67157 7 9 6.32843 9 5.5C9 4.67157 9.67157 4 10.5 4C11.3284 4 12 4.67157 12 5.5ZM4 9V11H12V9H4Z"
        fillRule="evenodd"
      />
    </svg>
  );
};
`;

const HappyEmojicon = `export const HappyEmojicon = ({...props}) => {
  return (
    <svg
      viewBox="-5.28 -5.28 26.56 26.56"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7 5.5C7 6.32843 6.32843 7 5.5 7C4.67157 7 4 6.32843 4 5.5C4 4.67157 4.67157 4 5.5 4C6.32843 4 7 4.67157 7 5.5ZM10.5 7C11.3284 7 12 6.32843 12 5.5C12 4.67157 11.3284 4 10.5 4C9.67157 4 9 4.67157 9 5.5C9 6.32843 9.67157 7 10.5 7ZM4 9C4 11.2091 5.79086 13 8 13C10.2091 13 12 11.2091 12 9H4Z"
        fillRule="evenodd"
      />
    </svg>
  );
};
`;

const App = `import {Rating} from "@nextui-org/react";
import {AngryEmojicon} from "./AngryEmojicon";
import {SadEmojicon} from "./SadEmojicon";
import {StraightEmojicon} from "./StraightEmojicon";
import {HappyEmojicon} from "./HappyEmojicon";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Rating length={4} isSingleSelection>
        <RatingSegment fillColor="red" icon={AngryEmojicon({})} index={0}/>
        <RatingSegment fillColor="orange" icon={SadEmojicon({})} index={1} />
        <RatingSegment icon={StraightEmojicon({})} index={2} />
        <RatingSegment fillColor="green" icon={HappyEmojicon({})} index={3} />
      </Rating>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/AngryEmojicon.jsx": AngryEmojicon,
  "/SadEmojicon.jsx": SadEmojicon,
  "/StraightEmojicon.jsx": StraightEmojicon,
  "/HappyEmojicon.jsx": HappyEmojicon,
};

export default {
  ...react,
};
