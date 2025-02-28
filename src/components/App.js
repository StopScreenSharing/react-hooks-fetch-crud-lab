import React, { useState, useEffect, use } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/questions')
    .then((r) => r.json())
    .then((questions) => setQuestions(questions))
  }, [])

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://127.0.0.1:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
    setQuestions((prevQuestions) => 
      prevQuestions.map((question) => 
        question.id === id ? { ...question, correctIndex } : question 
    )
  );

}

  function handleDeleteQuestion(id) {
    fetch(`http://127.0.0.1:4000/questions/${id}`, {
      method: 'DELETE',
    })
    setQuestions((prevQuestions) => prevQuestions.filter(q => q.id !== id));
  };

  function addQuestion(newQuestion) {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  }





  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList 
      
                                                                    questions={questions} 
                                                                    onDelete={handleDeleteQuestion} 
                                                                    onUpdate={handleUpdateQuestion}
                                                                    />}
    </main>
  );
}

export default App;
