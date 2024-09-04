import Badge from '@/components/Badge/Badge';
import S from './ListItem.module.css';
import { string, number } from 'prop-types';

function formatKrTime(date) {
  const offset = 9 * 60 * 60 * 1000; // 한국 시간은 UTC+9
  return new Date(date.getTime() + offset);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const koreanDate = formatKrTime(date);

  const month = koreanDate.getUTCMonth() + 1; // 월은 0부터 시작
  const day = koreanDate.getUTCDate();
  const hours = koreanDate.getUTCHours();
  const minutes = koreanDate.getUTCMinutes();

  const ampm = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 || 12; // 0시를 12시로 변환

  return `${month < 10 ? '0' : ''}${month}.${
    day < 10 ? '0' : ''
  }${day} ${ampm} ${hour12}시 ${minutes < 10 ? '0' : ''}${minutes}분`;
}

function formatTimeAgo(dateString) {
  const now = new Date();
  const koreanNow = formatKrTime(now);
  const postedDate = new Date(dateString);
  const koreanPostedDate = formatKrTime(postedDate);

  const differenceInMillis = koreanNow - koreanPostedDate;
  const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
  const differenceInDays = Math.floor(
    differenceInMillis / (1000 * 60 * 60 * 24)
  );

  if (differenceInMinutes < 1) {
    return '방금 전'; // 1분 이내의 경우
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  } else if (differenceInDays < 7) {
    return `${differenceInDays}일 전`;
  } else {
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    return `${differenceInWeeks}주 전`;
  }
}

function ListItem({
  state,
  category,
  title,
  currentPeopleCount,
  peopleCount,
  date,
  place,
  writeDate,
}) {
  const badgeStateVariant = state === '모집중' ? 'recruit' : 'end_recruit';
  const badgeCateVariant = state === '모집중' ? 'category' : 'end_category';

  const formattedDate = formatDate(date);

  const timeSincePost = formatTimeAgo(writeDate);

  return (
    <>
      <li role="listitem" className={S.list_item}>
        <ul aria-label="카테고리" className={S.category}>
          <li>
            <Badge text={state} variant={badgeStateVariant} />
          </li>
          <li>
            <Badge text={category} variant={badgeCateVariant} />
          </li>
        </ul>
        <h2 className="para-md">{title}</h2>
        <div className={`${S.info} para-sm`}>
          <p>
            <time dateTime={date}>{formattedDate}</time>
          </p>
          <span>&middot;</span>
          <p>{place}</p>
        </div>
        <div className={S.info_sub}>
          <p className={S.people_count}>
            <span className={`i_people_line`} aria-hidden="true"></span>
            <span className={`${S.current} para-sm`}>{currentPeopleCount}</span>
            <span aria-hidden="true" className="para-sm">
              &#47;
            </span>
            <span className="para-sm">{peopleCount}</span>
          </p>
          <p className="para-sm">{timeSincePost}</p>
        </div>
      </li>
    </>
  );
}

ListItem.propTypes = {
  state: string,
  category: string,
  title: string,
  currentPeopleCount: number,
  peopleCount: number,
  date: string,
  place: string,
  writeDate: string,
};

export default ListItem;