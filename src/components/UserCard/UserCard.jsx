import S from './UserCard.module.css';
import { node, string } from 'prop-types';
import { ProfileTitle } from '../ProfileTitle/ProfileTitle';
import { ProfileImg } from '../ProfileImg/ProfileImg';
import { useState, number } from 'react';

UserCard.propTypes = {
  children: node,
  description: node || string,
  userId: number,
  states: string,
};

export function UserCard({ description = '연남동', userId, states }) {
  const [state] = useState(states);

  switch (state) {
    case 'pending':
      return (
        <div className={S.wrapper}>
          <ProfileImg></ProfileImg>
          <div className={S.component}>
            <ProfileTitle name="고명한" className={'para-md'}>
              <div className={S.agreeWrapper}>
                <button className={`${S.agree} lbl-sm`}>승인</button>
                <button className={`${S.disagree} lbl-sm`}>거절</button>
              </div>
            </ProfileTitle>
          </div>
        </div>
      );
    case 'join':
      return (
        <div className={S.wrapper}>
          <ProfileImg></ProfileImg>
          <div className={S.component}>
            <ProfileTitle name="고명한" className={'lbl-md'}>
              {userId === userId ? (
                <div className={S.iconwrapper}>
                  <span className="i_certificate" />
                  파티장
                </div>
              ) : (
                ''
              )}
            </ProfileTitle>
            <p className="para-sm" style={{ color: 'var(--gray-600)' }}>
              {description}
            </p>
          </div>
        </div>
      );
  }
}