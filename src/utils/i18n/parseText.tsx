import { Fragment } from "react";

export const parseBoldText = (text: string) => {
  const parts = text.split("[bold]");
  return parts.map((part, idx) => {
    if (part.includes("[/bold]")) {
      const [boldText, rest] = part.split("[/bold]");
      return (
        <Fragment key={idx}>
          <strong>{boldText}</strong>
          {rest}
        </Fragment>
      );
    }
    return part;
  });
};
