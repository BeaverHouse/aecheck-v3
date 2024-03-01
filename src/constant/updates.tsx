export const pickups = [358];
export const new_manifests = [108];
export const new_buddies = [2011];
export const new_aligns = [358];
export const version = "3.5.70";

export const announceDate = "20240301";

export const announceTitleKo = announceDate + " 업데이트";
export const announceContentKo = (
  <div className="announce">
    <span>1. 배포 캐릭터의 VC 글래스터를 추가했습니다.</span>
    <br />
    <span>2. 글래스터 체크 메뉴 이름을 명확하게 변경했습니다.</span>
    <br />
    <span>
      3. 셀렉트 박스를 통해 다른 페이지로 이동할 수 있도록 변경했습니다.
    </span>
    <br />
    <span>4. 기타 수정 및 조정</span>
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
    <span>1. Added VC Grasta for free characters</span>
    <br />
    <span>2. Changed the grasta menu name to "VC Grasta".</span>
    <br />
    <span>3. Added feature to navigate to other pages by select box.</span>
    <br />
    <span>4. Other tranlation and minor fixes</span>
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
