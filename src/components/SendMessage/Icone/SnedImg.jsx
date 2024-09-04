import S from './SendImg.module.css';

export function SendImg() {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // 여기에 파일 처리 로직을 추가할 수 있습니다.
    }
  };

  return (
    <div className={S.components}>
      <input
        id="file"
        type="file"
        className={S.fileInput}
        onChange={handleChange}
        accept="image/*"
      />
      <label
        htmlFor="file"
        className={`${S.component} i_plus`}
        aria-label="파일첨부"
      ></label>
    </div>
  );
}