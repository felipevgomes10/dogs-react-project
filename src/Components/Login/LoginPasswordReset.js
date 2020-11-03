import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForms from '../../Hooks/useForms'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_RESET } from '../../api'
import Error from '../Helper/Error'
import { useNavigate } from 'react-router-dom'
import Head from '../Helper/Head'

const LoginPasswordReset = () => {

  const [ login, setLogin ] = React.useState('');
  const [ key, setKey ] = React.useState('');
  const password = useForms();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
    }
  }

  return (
    <section className='animeLeft'>
      <Head title='Redefinir senha' />
      <h1 className='title'>Redefina a sua senha</h1>
      <Input label='Usuário' type='text' name='usuario' value={login} disabled />
      <form onSubmit={handleSubmit}>
        <Input label='Nova senha' type='password' name='password' {...password} />
        {loading ? <Button disabled>Redefinindo...</Button> : <Button>Redefinir</Button>}
      </form>
      <Error error={error} />
    </section>
  )
}

export default LoginPasswordReset
