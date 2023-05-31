const MailFilledIcon = `export const MailFilledIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
      fill="currentColor"
    />
  </svg>
);`;

const App = `import {Input} from "@nextui-org/react";
import {MailFilledIcon} from './MailFilledIcon';

export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          startContent={
            <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          type="number"
          label="Price"
          placeholder="0.00"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-sm">$</span>
            </div>
          }
        />
        <Input
          type="url"
          label="Website"
          placeholder="nextui.org"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-sm">https://</span>
            </div>
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          endContent={
            <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          type="number"
          label="Price"
          placeholder="0.00"
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-sm">$</span>
            </div>
          }
        />
        <Input
          type="url"
          label="Website"
          placeholder="nextui"
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-sm">.org/</span>
            </div>
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          label="Email"
          placeholder="nextui"
          labelPlacement="outside"
          startContent={
            <MailFilledIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-sm">@gmail.com</span>
            </div>
          }
        />
        <Input
          label="Price"
          placeholder="0.00"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-sm">$</span>
            </div>
          }
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="currency">
                Currency
              </label>
              <select
                className="outline-none border-0 bg-transparent text-default-400 text-sm"
                id="currency"
                name="currency"
              >
                <option>USD</option>
                <option>ARS</option>
                <option>EUR</option>
              </select>
            </div>
          }
          type="number"
        />
        <Input
          type="url"
          label="Website"
          placeholder="nextui"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-sm">https://</span>
            </div>
          }
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-sm">.org</span>
            </div>
          }
        />
      </div>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
  "/MailFilledIcon.jsx": MailFilledIcon,
};

export default {
  ...react,
};
