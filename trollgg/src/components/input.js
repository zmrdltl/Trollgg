import React, { useState } from "react";

const InputText = (props) => {
  const [name, setName] = useState("");
  const [isSubmitted, setIssumbitted] = useState(false);
  const handleChange = (e) => setName(e.value);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setIssumbitted(true);
    props.onCreate(name);
  };

  return (
    <div>
      <form>
        <input
          placeholder="소환사 이름"
          value={name}
          onChange={handleChange}
          name="name"
        />
      </form>

      <button type="submit" onSubmit={handleSubmit}>
        제출
      </button>
      
      <p>{isSubmitted ? name : ""}</p>
    </div>
  );
};

export default InputText;
