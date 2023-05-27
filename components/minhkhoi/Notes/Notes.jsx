import "./Notes.css";



const Notes = ({ noteType, text, colorText }) => {
  return (
    <div className={`note__wrapper note__wrapper--${noteType} ${noteType%2===0 && 'self-end'}`}>
      <div className="note__background">
        {noteType === 1 && <img src={`/minhkhoi/assets/images/notes/Note1.png`} alt={noteType} />}
        {noteType === 2 && <img src={'/minhkhoi/assets/images/notes/Note2.png'}  alt={noteType} />}
        {noteType === 3 && <img src={'/minhkhoi/assets/images/notes/Note3.png'} alt={noteType} />}
        {noteType === 4 && <img src={'/minhkhoi/assets/images/notes/Note4.png'} alt={noteType} />}
        {noteType === 5 && <img src={'/minhkhoi/assets/images/notes/Note5.png'} alt={noteType} />}
      </div>
      <p className="note__text" style={{ color: colorText }}>
        {text}
      </p>
    </div>
  );
};

export default Notes;
