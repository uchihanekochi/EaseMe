import Notes from "../minhkhoi/Notes/Notes";

const NoteBoard = () => {
  return (
    <div
      className="flex flex-col p-4"

    >
      <Notes
        noteType={1}
        text="Hôm nay cậu đã làm rất tốt rồi"
        colorText={"#87A173"}
      />
      <Notes
        noteType={2}
        text="Hãy tin vào chính mình, bạn có thể vượt qua mọi khó khăn"
        colorText={"#87A173"}
      />
      <Notes
        noteType={3}
        text="Hãy nhìn về phía trước và không hối tiếc về quá khứ."
        colorText={"#87A173"}
      />
      <Notes
        noteType={4}
        text="Thay đổi không dễ dàng, nhưng nó đáng giá."
        colorText={"#87A173"}
      />
      <Notes
        noteType={5}
        text="Cuộc sống là món quà, hãy sống một cách trọn vẹn."
        colorText={"#87A173"}
      />
    </div>
  );
};

export default NoteBoard;