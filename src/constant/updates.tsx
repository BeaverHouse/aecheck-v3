export const pickups = [356, 357];
export const new_manifests = [108];
export const new_buddies = [2011];
export const new_aligns = [357];
export const version = "3.5.60";

export const announceDate = "20240213";

export const announceTitleKo = announceDate + " 오류 수정";
export const announceContentKo = (
  <div className="announce">
    <span>1. 멜리사의 성도각성 이미지가 누락되어 추가했습니다.</span>
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

export const announceTitleEN = announceDate + " Error fix";
export const announceContentEN = (
  <div className="announce">
    <span>1. Melissa's stellar panel image was missing so it was added.</span>
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
