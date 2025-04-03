import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/spinner';
import { useNavigate } from 'react-router-dom';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPulishYear] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
  const handleSaveBook=()=>{
    const data ={
      title,
      author,
      publishYear
    }
    setLoading(true);
    axios
    .post('http://loacalhost:4444/books', data)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false);
      alert('something happend please check the console for more infor');
      console.log(error);
    })
  }
  return (
    <div>CreateBooks</div>
  )
}

export default CreateBooks