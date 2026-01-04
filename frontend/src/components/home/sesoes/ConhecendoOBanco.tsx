export const ConhecendoOBanco = () => {
  return (
    <section className="my-0 md:my-4 lg:my-8 mx-4 md:mx-8 lg:mx-16 ">
      <h4 className="text-3xl font-bold font-assistant text-verde-floresta mb-8">
        Conhecendo o LiraBank
      </h4>
      <div className="flex flex-col md:flex-row lg:flex-row gap-4">
        {/* Total de usuários */}
        <div className="w-full lg:w-6/12 md:w-6/12 bg-verde-floresta p-8 rounded-2xl text-limao flex flex-col justify-between min-h-52 md:min-h-60">
          <h5 className="text-6xl md:text-7xl font-bold">8 milhões</h5>
          <p>O LiraBank possui mais de 8 milhões de usuários ativos</p>
        </div>

        {/* Porcentagem de usuários satisfeitos */}
        <div className="w-full lg:w-3/12 md:w-3/12 bg-limao p-8 rounded-2xl text-verde-floresta flex flex-col justify-between min-h-52 md:min-h-60">
          <h5 className="text-6xl md:text-7xl font-bold">95%</h5>
          <p>Cerca de 95% dos nossos clientes estão satisfeitos</p>
        </div>

        {/* Total de caixas eletrônicos */}
        <div className="w-full lg:w-3/12 md:w-3/12 bg-pistache p-8 rounded-2xl text-verde-floresta flex flex-col justify-between min-h-52 md:min-h-60">
          <h5 className="text-6xl md:text-7xl font-bold">0</h5>
          <p>Possui 0 agências físicas, um banco totalmente digital</p>
        </div>
      </div>
    </section>
  );
};
