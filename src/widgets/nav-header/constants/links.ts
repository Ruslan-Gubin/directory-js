import appConstants from "../../../app/constants/appConstants";
import { ILink } from "../types/ILink";

const LINKS: ILink[] = [
  { href: appConstants.routes.index, name: "Home", class: "home-link" },
  { href: appConstants.routes.javascript, name: "JavaScript", class: "javascript-link" },
  { href: appConstants.routes.react, name: "React", class: "react-link" },
  { href: appConstants.routes.functions, name: "Functions", class: "functions-link" },
];

export { LINKS }
