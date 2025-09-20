import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJobMutation } from "../lib/graphql/mutations";

function CreateJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newJob = await createJobMutation({ title, description });
      navigation(`/jobs/${newJob.id}`);
    } catch (error) {
      setError(error.errors[0].message);
    }
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      {error && <div className="notification is-danger">{error}</div>}
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
