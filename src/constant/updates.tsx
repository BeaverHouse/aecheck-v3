export const pickups = [356, 357];
export const new_manifests = [108];
export const new_buddies = [2011];
export const new_aligns = [357];
export const version = "3.5.60";

export const announceDate = "20240208";

export const announceTitleKo = announceDate + " 업데이트";
export const announceContentKo = (
  <div className="announce">
    <h2>예고대로 사이트가 변경되었습니다!</h2>
    <span>1. 문제가 있다면 캐시를 삭제하고 다시 접속해 보세요.</span>
    <br />
    <span>2. 그래도 해결되지 않는다면 제보 부탁드립니다.</span>
    <br />
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
    <h2>Site has been changed as announced before!</h2>
    <span>1. Delete the cache if you have some problems.</span>
    <br />
    <span>2. If you still have an issue, please let me know.</span>
    <br />
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
