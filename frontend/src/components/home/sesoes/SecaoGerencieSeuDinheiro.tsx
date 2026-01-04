import { FaUserPlus, FaCheckCircle, FaChartLine } from "react-icons/fa";

export const SecaoGerencieSeuDinheiro = () => {
	return (
		<section
			className="relative my-0 md:my-4 lg:my-8 mx-4 md:mx-8 lg:mx-16 flex 
			flex-col lg:flex-row items-center gap-8 py-12 px-8 rounded-2xl
			bg-linear-to-r from-limao to-pistache overflow-hidden"
		>
			{/* Formas geométricas decorativas */}
			<div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-verde-floresta/20 -z-10"></div>
			<div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-verde-floresta/15 -z-10"></div>

			{/* Glow atrás do cartão */}
			<div className="absolute w-80 lg:w-96 h-48 lg:h-60 rounded-2xl bg-verde-floresta/20 blur-3xl -z-10 top-1/2 left-1/4 transform -translate-y-1/2"></div>

			{/* Imagem do cartão */}
			<figure className="w-full lg:w-1/2 flex justify-center relative z-10">
				<img
					className="w-80 lg:w-96 rounded-2xl"
					src="/Frente_Cartao.png"
					alt="Cartão bamerindus"
				/>
			</figure>

			{/* Parte dos Textos */}
			<div className="w-full lg:w-1/2 space-y-8 z-10">
				<h3 className="text-3xl font-bold font-assistant mb-4 text-verde-floresta">
					Comece a gerenciar seu dinheiro em 3 etapas simples
				</h3>

				<ul className="space-y-6 text-lg font-assistant text-verde-floresta">
					<li className="flex items-start gap-4">
						<div className="flex items-center justify-center w-12 h-12 rounded-full bg-verde-floresta text-branco shrink-0">
							<FaUserPlus size={22} />
						</div>
						<div>
							<p className="font-semibold">Crie sua conta</p>
							<p>
								Cadastre-se em poucos minutos e comece a usar sem burocracia.
							</p>
						</div>
					</li>

					<li className="flex items-start gap-4">
						<div className="flex items-center justify-center w-12 h-12 rounded-full bg-verde-floresta text-branco shrink-0">
							<FaCheckCircle size={22} />
						</div>
						<div>
							<p className="font-semibold">Ative sua conta</p>
							<p>
								Finalize seu cadastro e comece a movimentar seu dinheiro com
								segurança.
							</p>
						</div>
					</li>

					<li className="flex items-start gap-4">
						<div className="flex items-center justify-center w-12 h-12 rounded-full bg-verde-floresta text-branco shrink-0">
							<FaChartLine size={22} />
						</div>
						<div>
							<p className="font-semibold">Controle suas finanças</p>
							<p>
								Acompanhe gastos, metas e investimentos com relatórios claros e
								intuitivos.
							</p>
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
};
