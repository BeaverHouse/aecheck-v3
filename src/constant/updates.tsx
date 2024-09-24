export const pickups = [391,392];
export const new_manifests = [214];
export const new_buddies = [2016];
export const new_aligns = [81, 392];
export const version = "3.9.0";

export const announceDate = "20240925";

export const announceTitleKo = announceDate + " 업데이트";
export const announceContentKo = (
  <div className="announce">
    <p>Version : {version}</p>
    <br />
    <p>이시층 셰이네 데이터 오류 수정</p>
    <br />
    <a href="https://aecheck.tistory.com/" target="_blank" rel="noreferrer">
      사이트 안내용 블로그
    </a>
    <br />
    <a href="https://aecheck.tistory.com/9" target="_blank" rel="noreferrer">
      오류 제보
    </a>
    <br />
    이메일 : haulrest@gmail.com
  </div>
);

export const announceTitleEN = announceDate + " Update";
export const announceContentEN = (
  <div className="announce">
    <p>Version : {version}</p>
    <br />
    <p>Fix the data error (Shanie AC)</p>
    <br />
    <a
      href="https://github.com/BeaverHouse/aecheck-v3/wiki"
      target="_blank"
      rel="noreferrer"
    >
      About AE Check
    </a>
    <br />
    <a
      href="https://github.com/BeaverHouse/aecheck-v3"
      target="_blank"
      rel="noreferrer"
    >
      Issues (GitHub)
    </a>
    <br />
    Contact : haulrest@gmail.com
  </div>
);
