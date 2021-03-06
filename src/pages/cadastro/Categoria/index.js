import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://guelflix.herokuapp.com/categorias';
    fetch(URL).then(async (res) => {
      if (res.ok) {
        const resposta = await res.json();
        setCategorias([...resposta]);
      }
    });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.titulo}
      </h1>

      <form
        onSubmit={function handleSubmit(e) {
          e.preventDefault();
          setCategorias([...categorias, values]);
          clearForm(valoresIniciais);
        }}
      >
        <FormField
          label="Nome da Categoria"
          name="titulo"
          type="text"
          value={values.titulo}
          onChange={handleChange}
        />
        <FormField
          label="Descrição"
          name="descricao"
          type="textarea"
          value={values.descricao}
          onChange={handleChange}
        />
        <FormField
          label="Cor"
          name="cor"
          type="color"
          value={values.cor}
          onChange={handleChange}
        />

        <Button type="submit">Cadastrar</Button>
      </form>

      {categorias.length === 0 && <div>Carregando...</div>}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>{categoria.titulo}</li>
        ))}
      </ul>

      <Link to="/">Voltar pra home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
