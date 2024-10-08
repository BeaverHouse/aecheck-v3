export const pickups = [393];
export const new_manifests = [214];
export const new_buddies = [2016];
export const new_aligns = [393];
export const version = "3.9.10";

export const announceDate = "20241010";

export const announceTitleKo = announceDate + " 업데이트";
export const announceContentKo = (
  <div className="announce">
    <p>Version : {version}</p>
    <br />
    <p>알테나 기억의 서 데이터 추가</p>
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
    <p>Add missing data for Altena</p>
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
