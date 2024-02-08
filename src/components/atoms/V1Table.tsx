import React from "react";
import { useTranslation } from "react-i18next";
import { elements, weapons } from "../../constant/fixedData";
import CharacterCheck from "./CharacterCheck";
import { characters } from "../../constant/parseData";
import { arrAllIncludes, arrOverlap } from "../../util/arrayUtil";
import Box from "@mui/material/Box/Box";
import { getShortName } from "../../util/func";

/**
 * V1Table
 *
 * 캐릭터 보유 현황을 테이블로 보여주는 Component입니다.
 * 5성 캐릭터만 표시합니다.
 */
function V1Table() {
  const { t, i18n } = useTranslation();
  const baseCharacters = characters.sort((a, b) =>
    getShortName(t(`c${a.code}`), i18n.language).localeCompare(
      getShortName(t(`c${b.code}`), i18n.language)
    )
  );

  return (
    <div
      style={{
        maxWidth: "90%",
        maxHeight: "90vh",
        margin: "10px auto",
        overflow: "scroll",
      }}
    >
      <table
        style={{
          backgroundColor: "white",
          whiteSpace: "normal",
          textAlign: "center",
        }}
        id="chartable"
      >
        <thead>
          <tr>
            <th style={{ width: 70 }}></th>
            {elements.map((element, idx) => (
              <th key={idx} style={{ minWidth: 280 }}>
                <img
                  style={{ width: 30 }}
                  src={`/image/icon/${element}.png`}
                  alt={element}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weapons.map((weapon, idx) => (
            <tr key={idx}>
              <td>
                <img
                  style={{ width: 30 }}
                  src={`/image/icon/${weapon}.png`}
                  alt={weapon}
                />
              </td>
              {elements.map((element, idx2) => (
                <td
                  key={idx2}
                  className={(idx + idx2) % 2 === 1 ? "odd" : "even"}
                  style={{
                    padding: "5px",
                  }}
                >
                  <Box
                    sx={{
                      width: "99%",
                      display: "grid",
                      justifyContent: "center",
                      gridTemplateColumns: "repeat(auto-fill, 75px)",
                      columnGap: 1.5,
                      rowGap: 1.5,
                    }}
                  >
                    {baseCharacters
                      .filter(
                        (c) =>
                          arrAllIncludes(c.tags, [weapon, element]) &&
                          arrOverlap(c.tags, [
                            "style.normal",
                            "style.another",
                            "style.extra",
                          ])
                      )
                      .map((info) => (
                        <CharacterCheck
                          key={info.id}
                          info={info}
                          isCheck={false}
                          disableBorder={true}
                          makeNotOwnedGray={true}
                        />
                      ))}
                  </Box>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default V1Table;
