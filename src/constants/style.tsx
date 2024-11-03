import { SxProps, Theme } from "@mui/material/styles";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { GridComponents } from "react-virtuoso";

export const FlexCenter: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const MainWrapperSx: SxProps<Theme> = {
  width: "99%",
  maxWidth: 1600,
  margin: "10px auto",
  textAlign: "center",
};

export const DashboardWrapperSx: SxProps<Theme> = {
  ...FlexCenter,
  flexDirection: "column",
  height: "100%",
  padding: "2px",
  textAlign: "center",
};

export const VirtuosoGridStyle: React.CSSProperties = {
  flexGrow: 1,
  width: "100%",
  height: 500,
  marginTop: 10,
};

const GridList: GridComponents["List"] = React.forwardRef(
  (
    {
      style,
      children,
    }: Pick<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "style" | "children" | "className"
    >,
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          ...FlexCenter,
          flexWrap: "wrap",
          gap: "10px",
          margin: "5px",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

GridList.displayName = "GridList";

export { GridList };
