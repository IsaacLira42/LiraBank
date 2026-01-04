export const Hero = () => {
  return (
    <div className="my-0 md:my-4 lg:my-8 mx-4 md:mx-8 lg:mx-16 rounded-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-limao text-4xl md:text-5xl lg:text-7xl font-bold font-rubik mb-4 md:mb-6">
            Banco digital feito para você
          </h1>
          <p className="text-limao font-semibold text-lg md:text-xl leading-relaxed font-assistant">
            No LiraBank, unimos tecnologia avançada e segurança para oferecer a
            melhor experiência bancária digital. Tenha controle total do seu
            dinheiro com contas 100% digitais, investimentos simplificados e
            transações instantâneas, sem complicações.
          </p>
          <button className="mt-6 md:mt-8 px-8 py-3 bg-limao text-branco font-bold rounded-2xl hover:bg-verde-floresta transition-all duration-200 w-fit cursor-pointer">
            Saiba Mais
          </button>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 lg:p-8">
          <div
            className="relative flex justify-center items-center w-full rounded-2xl px-6 pt-6 lg:px-8 lg:pt-8 my-4 lg:my-0
						bg-linear-to-br from-limao to-pistache"
          >
            {/* Formas geométricas decorativas */}
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-verde-floresta/20 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-verde-floresta/15 -z-10"></div>

            {/* Glow atrás da imagem */}
            <div className="absolute w-48 md:w-60 lg:w-72 h-48 md:h-60 lg:h-72 rounded-2xl bg-verde-floresta/20 blur-3xl -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

            {/* Imagem da mulher */}
            <img
              className="w-48 md:w-60 lg:w-80 max-w-full h-auto pt-10 relative z-10"
              src="/mulher_no_celular.png"
              alt="Mulher usando celular moderno"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
