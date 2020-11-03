import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import useForms from '../../Hooks/useForms';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import styles from './UserPhotoPost.module.css';

const UserPhotoPost = () => {

  const nome = useForms();
  const peso = useForms('number');
  const idade = useForms('number');
  const [img, setImg] = React.useState({});
  const {data, error, loading, request} = useFetch();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const {url, options} = PHOTO_POST(formData, token);
    request(url, options);
  }

  const handleImgChange = ({target}) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title='Poste sua Foto' />
      <form onSubmit={handleSubmit}>
        <Input label='Nome' type='text' name='nome' {...nome}/>
        <Input label='Peso' type='number' name='peso' {...peso}/>
        <Input label='Idade' type='number' name='idade' {...idade}/>
        <input className={styles.file} type='file' name='img' id='img' onChange={handleImgChange}/>
        {loading ? <Button disabled>Postando...</Button> : <Button>Postar</Button>}
        {error && <Error error={error} />}
      </form>
      <div>
        {img.preview && 
          <div 
            className={styles.preview}
            style={{backgroundImage: `url('${img.preview}')`}}>
          </div>}
      </div>
    </section>
  )
}

export default UserPhotoPost
