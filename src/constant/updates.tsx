export const pickups = [371, 372];
export const new_manifests = [149];
export const new_buddies = [2014, 2015];
export const new_aligns = [372];
export const version = "3.8.0";

export const announceDate = "20240608";

export const announceTitleKo = announceDate + " 업데이트";
export const announceContentKo = (
  <div className="announce">
    <p>Version : {version}</p>
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
