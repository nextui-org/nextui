import {createContext} from "@nextui-org/react-utils";

import {UseRatingReturn} from "./use-rating";

export const [RatingProvider, useRatingContext] = createContext<UseRatingReturn>({
  name: "RatingContext",
  errorMessage:
    "useRatingContext: `context` is undefined. Seems like you forgot to wrap all rating components within `<Rating />`",
});
