import React, { useState, useEffect } from 'react';
import { BsArrowDownCircleFill } from 'react-icons/bs';

function ScrollToBottom() {
  const [isVisible, setIsVisible] = useState(false);

  // Função para rolar para o final da página
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Função para verificar se está no final da página
  const handleScroll = () => {
    const isBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10;
    setIsVisible(!isBottom); // Mostra ou esconde o botão
  };

  // useEffect para monitorar a rolagem da página
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Se não estiver visível, retorna null para não renderizar o botão
  if (!isVisible) return null;

  return (
    <div
      className='fixed bottom-[75px] ml-[400px] left-1/2 transform -translate-x-1/2 cursor-pointer'
      onClick={scrollToBottom}
    >
      <BsArrowDownCircleFill color='var(--maincolor)' size={32} />
    </div>
  );
}

export default ScrollToBottom;
