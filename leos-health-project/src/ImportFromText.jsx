import React, { useState } from "react";

function ImportFromText({ addNotes }) {
  const [importText, setImportText] = useState("");

  const handleImport = () => {
    try {
      const importedNotes = JSON.parse(importText);
      if (!Array.isArray(importedNotes)) {
        alert("Invalid format: The imported data must be an array.");
        return;
      }
      addNotes(importedNotes);
      setImportText("");
    } catch (error) {
      alert("Invalid JSON format: " + error.message);
    }
  };
  return (
    <div>
      <h3>Import from Text</h3>
      <textarea
        value={importText}
        onChange={(e) => setImportText(e.target.value)}
        rows={5}
        cols={50}
      />
      <button onClick={handleImport}>Import</button>
    </div>
  );
}

export default ImportFromText;
