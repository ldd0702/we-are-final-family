import S from './ChatProfileCard.module.css';
import { node, string } from 'prop-types';
import { ProfileTitle } from '../ProfileTitle/ProfileTitle';
import { ProfileImg } from '../ProfileImg/ProfileImg';

ChatProfileCard.propTypes = {
  children: node,
  description: string,
};

export function ChatProfileCard({ children, description = '최신 채팅 내역' }) {
  return (
    <div className={S.wrapper}>
      <ProfileImg></ProfileImg>
      <div className={S.component}>
        <ProfileTitle name="고명한">{children}</ProfileTitle>
        <p>{description}</p>
      </div>
    </div>
  );
}
