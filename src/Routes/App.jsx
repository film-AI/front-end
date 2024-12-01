import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import MovieBanner from '../Components/MovieBanner';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import ResponseOlivia from '../Components/ResponseOlivia';
import ChatUser from '../Components/ChatUser';
import Scroll_to_bottom from '../Components/Scroll_to_bottom';
import { Outlet } from 'react-router-dom';
import LoadResponseFilmai from '../Components/LoadResponseFilmai';
import { useContextHook } from '../context/context';
function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filmesFetch, setFilmesFetch] = useState([]);
  const [is_loading_response, set_is_loading_response] = useState(false);
  const { nightMode } = useContextHook();

  const generos = [
    { id: 28, name: 'Ação' },
    { id: 12, name: 'Aventura' },
    { id: 16, name: 'Animação' },
    { id: 35, name: 'Comédia' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentário' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Família' },
    { id: 14, name: 'Fantasia' },
    { id: 36, name: 'História' },
    { id: 27, name: 'Terror' },
    { id: 10402, name: 'Música' },
    { id: 9648, name: 'Mistério' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Ficção científica' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'Guerra' },
    { id: 37, name: 'Faroeste' },
  ];

  const getGenreNameById = (genreId) => {
    const genre = generos.find((g) => g.id === genreId);
    return genre ? genre.name : false;
  };
  // Função para adicionar uma nova mensagem
  const handleAddPrompt = async (Mensagem) => {
    if (inputValue.trim() !== '' || Mensagem) {
      var categoria = '';
      var mensagemIA = '';

      const newMessage = Mensagem
        ? { content: Mensagem, type: 'UserInput' }
        : { content: inputValue, type: 'UserInput' }; // tipo 1 para o usuário
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue(''); // Limpa o campo de input
      set_is_loading_response(true);
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 0);

      // Adiciona a mensagem do usuário e a resposta inicial da IA
      try {
        const response = await fetch(
          'http://127.0.0.1:5000/get_category_and_response',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Aqui você coloca os dados que deseja enviar
              valor: Mensagem,
            }),
          }
        );
        const data = await response.json();
        mensagemIA = data.conversation;
        categoria = data.category[0];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      // Requisição para buscar filmes e adicioná-los como um prompt

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=506ef0ac17c7aaa97f0421390a8ff530&with_genres=${categoria}&page=1&language=pt-BR`
        );
        const data = await response.json();

        setFilmesFetch(data.results);
        console.log(data.results);

        const responseIA = {
          content: `${
            mensagemIA ? mensagemIA + ',' : ''
          } Aqui estão os Filmes de ${getGenreNameById(
            categoria
          )} que eu irei te indicar!🍿😸:`,
          type: 'IAResponse',
        }; // tipo 2 para IA
        const response_not_found_IA = {
          content: mensagemIA
            ? mensagemIA
            : `desculpe não consegui achar oque vc está procurando 😓😬`,
          type: 'IAResponse',
        }; // tipo 2 para IA
        setMessages((prevMessages) => [
          ...prevMessages,
          getGenreNameById(categoria) ? responseIA : response_not_found_IA,
        ]);
        if (!categoria) {
          set_is_loading_response(false);
          return;
        }
        // Adiciona os filmes como um prompt adicional
        const filmesPrompt = {
          content: data.results,
          type: 'filmes',
        };

        setMessages((prevMessages) => [...prevMessages, filmesPrompt]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      set_is_loading_response(false);
    }
  };

  // Manipulador de evento para o Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddPrompt(inputValue);
    }
  };

  return (
    <>
      <div className='flex items-center gap-9 flex-col pb-[200px] pt-4 mt-[60px]'>
        <div className='relative flex w-full justify-center flex-col items-center gap-4'>
          {/* Chat */}

          <ResponseOlivia response='Olá, com o que eu posso te ajudar?' />
          {messages.map((message, index) => {
            if (message.type === 'UserInput') {
              return <ChatUser key={index} question={message.content} />;
            } else if (message.type === 'IAResponse') {
              return <ResponseOlivia key={index} response={message.content} />;
            } else if (message.type === 'filmes') {
              return (
                <div
                  key={index}
                  className='flex flex-wrap max-w-[500px] justify-center gap-10'
                >
                  {message.content.map((e) => (
                    <MovieBanner
                      key={e.id}
                      img={e.poster_path}
                      title={e.title}
                      description={e.overview}
                      vote_average={e.vote_average}
                    />
                  ))}
                </div>
              );
            }
          })}
          {is_loading_response && <LoadResponseFilmai />}
        </div>
      </div>

      <div className='w-full fixed bottom-0  flex flex-col items-center justify-center  '>
        <div className='flex gap-4 mb-2  max-w-[645px]'>
          <p
            className='text-white  p-2 text-[11px] hover:bg-corPrincipal cursor-pointer bg-[#000000c7] '
            onClick={() => {
              handleAddPrompt('Olá tudo bem?');
            }}
          >
            Olá tudo bem?
          </p>
          <p
            className='text-white text-[11px] p-2  hover:bg-corPrincipal cursor-pointer bg-[#000000c7] '
            onClick={() => {
              handleAddPrompt('Me indique filmes de Terror');
            }}
          >
            Me indique filmes de Terror
          </p>
          <p
            className='text-white  p-2  text-[11px] hover:bg-corPrincipal cursor-pointer bg-[#000000c7] '
            onClick={() => {
              handleAddPrompt('Me indique filmes de Ação');
            }}
          >
            Me indique filmes de Ação
          </p>
          <p
            className='text-white text-[11px]  p-2  hover:bg-corPrincipal cursor-pointer bg-[#000000c7] '
            onClick={() => {
              handleAddPrompt('Quem é você?');
            }}
          >
            Quem é você?
          </p>
        </div>
        <div className='flex'>
          <input
            type='text'
            placeholder='Digite aqui'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className='bg-UserInputColor text-center w-[100vh] h-10 outline-none'
          />
          <button
            onClick={() => {
              handleAddPrompt(inputValue);
            }}
            className='bg-corPrincipal h-10 w-10 flex justify-center items-center text-white cursor-pointer'
          >
            <FaMagnifyingGlass />
          </button>
        </div>
        <p
          className={`p-1 text-[10px]  w-[645px] text-center  ${
            nightMode ? 'text-white' : 'text-black'
          } 
          ${nightMode ? 'bg-black' : 'bg-white'}  
          `}
        >
          A FilmAí é um prototipo em desenvolvimento portanto está sujeita a
          erros.
        </p>
      </div>
      <Scroll_to_bottom />
    </>
  );
}

export default App;
