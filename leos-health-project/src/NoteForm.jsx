import React, { useState } from "react";
import { Form, Input, Select, Button, Space } from "antd";

function NoteForm({ addNote, editMode, note, onSave }) {
  const [key, setKey] = useState(editMode ? note.key : "");
  const [title, setTitle] = useState(editMode ? note.title : "");
  const [fields, setFields] = useState(editMode ? note.fields || [] : []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!key || !title) return;
    const newNote = { key, title, type, options };
    if (editMode) {
      onSave(newNote);
    } else {
      addNote(newNote);
      setKey("");
      setTitle("");
      setFields([]);
    }
  };

  const addField = (type) => {
    setFields([...fields, { type, title: "", options: [] }]);
  };

  const editField = (index, updatedField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Form onSubmit={handleSubmit}>
        <label>
          Key:
          <Input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </label>
        <label>
          Title:
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <h3>Fields:</h3>
        {fields.map((field, index) => (
          <div key={index}>
            <Form.Item label='Type'>
              Type:
              <Select
                value={field.type}
                onChange={(e) => {
                  const updatedField = { ...field, type: e.target.value };
                  editField(index, updatedField);
                }}
              >
                <option value="textarea">Textarea</option>
                <option value="dropdown">Dropdown</option>
                <option value="radio">Radio</option>
              </Select>
            </Form.Item>
            <Form.Item label='Title'>
              Title:
              <Input
                type="text"
                value={field.title}
                onChange={(e) => {
                  const updatedField = { ...field, title: e.target.value };
                  editField(index, updatedField);
                }}
              />
            </Form.Item>
            {(field.type === "dropdown" || field.type === "radio") && (
              <>
                <Form.Item label='Options'>
                  Options:
                  <Input
                    type="text"
                    value={field.options.join(",")}
                    onChange={(e) => {
                      const options = e.target.value.split(",");
                      const updatedField = { ...field, options };
                      editField(index, updatedField);
                    }}
                  />
                </Form.Item>
              </>
            )}
            <Button type="button" onClick={() => removeField(index)}>
              Remove Field
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => addField("textarea")}>
          Add Textarea Field
        </Button>
        <Button type="button" onClick={() => addField("dropdown")}>
          Add Dropdown Field
        </Button>
        <Button type="button" onClick={() => addField("radio")}>
          Add Radio Field
        </Button>
        <Button type="submit">{editMode ? "Save" : "Add"}</Button>
      </Form>
    </div>
  );
}

export default NoteForm;
