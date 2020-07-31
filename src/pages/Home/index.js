import React, { useEffect, useState } from 'react';

import categoriasRepository from '../../repositories/categorias';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriasRepository
      .getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && <div>Loading...</div>}

      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <>
              <BannerMain
                videoTitle={dadosIniciais[0].videos[0].titulo}
                url={dadosIniciais[0].videos[0].url}
                videoDescription="Se liga nesse lugar insano que vai ter de competição de drone até simulador de caminhão: BARBARIUS. Eu e Cavaco fizemos a festa e zuamos muito no carrinho!"
              />

              <Carousel ignoreFirstVideo category={dadosIniciais[0]} />
            </>
          );
        }
        return <Carousel key={categoria.id} category={categoria} />;
      })}
    </PageDefault>
  );
}

export default Home;
