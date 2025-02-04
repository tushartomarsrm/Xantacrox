import { useState } from "react";
import testScores from "../../json-content/Accomplishments/test-scores.json";
import TestScoreDialog from "../CommonDialogs/TestScoreDialog";

const TestScores = () => {
  const [scores, setScores] = useState(testScores);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddScore = () => {
    setCurrentScore(null);
    setEditIndex(null);
    setIsDialogOpen(true);
  };

  const handleSaveScore = (score) => {
    if (editIndex !== null) {
      const updatedScores = [...scores];
      updatedScores[editIndex] = score;
      setScores(updatedScores);
    } else {
      setScores([...scores, score]);
    }
    setIsDialogOpen(false);
  };

  const handleEditScore = (index) => {
    setCurrentScore(scores[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteScore = (index) => {
    setScores(scores.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-xl shadow-md w-full">
  <h2 className="text-2xl font-bold">Test Scores</h2>

  <div className="flex justify-between items-center mt-4">
    <button
      className="flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-500 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={handleAddScore}
    >
      <span className="text-sm font-bold mr-2">+</span>
      <span className="font-medium text-sm">Test Score</span>
    </button>
  </div>

  <div className="mt-8">
    {scores.length === 0 && <p>No test scores added yet.</p>}
    {scores.map((score, index) => (
      <div
        key={index}
        className="border p-4 rounded-lg bg-gray-100 mt-6"
      >
        <div className="flex justify-between items-center">
          {/* Title and Action Buttons */}
          <h3 className="font-semibold text-lg flex-1 truncate mr-2">
            {score.title}
          </h3>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white p-1 rounded-full"
              onClick={() => handleEditScore(index)}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button
              className="bg-red-500 text-white p-1 rounded-full"
              onClick={() => handleDeleteScore(index)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
          Type: {score.scoreType}
        </p>
        {score.scoreType === "Percentile" && (
          <p className="text-sm text-gray-600 line-clamp-1">
            Percentile: {score.percentile}
          </p>
        )}
        {score.scoreType === "Rank" && (
          <p className="text-sm text-gray-600 line-clamp-1">
            Rank: {score.rank}
          </p>
        )}
        {score.scoreType === "Score" && (
          <>
            <p className="text-sm text-gray-600 line-clamp-1">
              Score: {score.yourScore} / {score.maxScore} ({score.percentage}%)
            </p>
          </>
        )}
        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
          Associated With: {score.associatedWith}
        </p>
        <p className="text-sm text-gray-600 line-clamp-1">
          Exam Date: {score.examDate}
        </p>

        <div
          className="text-sm mt-2 max-w-full overflow-hidden line-clamp-1"
          dangerouslySetInnerHTML={{ __html: score.description }}
        ></div>
      </div>
    ))}
  </div>

  {isDialogOpen && (
    <TestScoreDialog
      score={currentScore}
      onSave={handleSaveScore}
      onCancel={() => setIsDialogOpen(false)}
    />
  )}
</div>

  );
};

export default TestScores;
