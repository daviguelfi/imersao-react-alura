import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const history = useHistory();
  const { handleChange, values } = useForm({
    titulo: 'Titulo padrão',
    url: 'https://www.youtube.com/watch?v=QBNMKPJ74uw',
    categoria: 'Front end',
  });

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);
  console.log(categoryTitles);
  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const categoriaEscolhida = categorias.find(
            // eslint-disable-next-line comma-dangle
            (categoria) => categoria.titulo === values.categoria
          );
          videosRepository
            .create({
              titulo: values.titulo,
              url: values.url,
              categoriaEscolhida,
            })
            .then(() => {
              history.push('/');
            });
        }}
      >
        <FormField
          label="Titulo do Vídeo"
          name="titulo"
          type="text"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Url do Vídeo"
          name="url"
          type="text"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          type="text"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">Cadastrar</Button>
      </form>
      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </PageDefault>
  );
}

export default CadastroVideo;
