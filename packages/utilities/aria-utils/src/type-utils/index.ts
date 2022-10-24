import {Node} from "@react-types/shared";

export type NodeWithProps<T extends object, P = {}> = Omit<Node<T>, "props"> & {props?: P};
