import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4444/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
        enqueueSnackbar('Book Is Updated Successfully',{variant : 'success'});
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error',{variant : 'error'});
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:4444/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4 flex flex-col">
          <label className="text-xl text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full mt-2"
          />
        </div>
        <div className="my-4 flex flex-col">
          <label className="text-xl text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full mt-2"
          />
        </div>
        <div className="my-4 flex flex-col">
          <label className="text-xl text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full mt-2"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 rounded-lg hover:bg-sky-400"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
