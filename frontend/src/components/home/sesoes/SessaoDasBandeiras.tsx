import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const CompaniasParceiras = () => {
  const plugin = React.useRef(
    Autoplay({
      delay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );

  const parceiros = [
    { src: "/visa.png", alt: "logo da visa" },
    { src: "/logo_governo_federal.png", alt: "logo do governo federal" },
    { src: "/logo_nubank.png", alt: "logo do banco nubank" },
    { src: "/logo_rudia.png", alt: "logo do rudia" },
    { src: "/logo_ifrn.jpg", alt: "logo do ifrn" },
    { src: "/logo_flamengo.png", alt: "logo do flamengo" },
    { src: "/logo_51.png", alt: "logo da cachaça 51" },
    { src: "/logo_call_of_duty.png", alt: "logo do call of duty" },
    { src: "/o_messi.png", alt: "foto do messi" },
    { src: "/fot_jao.jpeg", alt: "João vitor" },
  ];

  return (
    <section className="my-0 md:my-4 lg:my-8 mx-4 md:mx-8 lg:mx-16">
      <h4 className="text-2xl text-limao font-bold text-center mb-8 font-assistant">
        Companhias Parceiras
      </h4>

      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl mx-auto"
        opts={{
          align: "start",
          loop: true,
          duration: 10000,
        }}
      >
        <CarouselContent className="-ml-2">
          {parceiros.map((parceiro, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-2 flex justify-center items-center h-24">
                <img
                  src={parceiro.src}
                  alt={parceiro.alt}
                  className="w-28 h-16 object-contain filter brightness-110 grayscale hover:filter-none hover:scale-105 transition-all duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
