import { FaWhatsapp } from "react-icons/fa";
import styles from "../../styles/InformationPages.module.css";

export const metadata = {
  title: "Perguntas Frequentes (FAQ) | BijuLu",
  description: "Tire suas dúvidas sobre compras, pagamentos e produtos.",
};

export default function FAQ() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Perguntas Frequentes</h1>

      <div className={styles.content}>
        <h2>Como faço para comprar?</h2>
        <p>
          É muito simples! Navegue pelo nosso site, escolha as peças que você
          amou e clique em "Comprar" ou "Ver Detalhes". Como prezamos por um
          atendimento humanizado, a finalização da compra é feita diretamente
          com nossa equipe pelo <strong>WhatsApp</strong>. Lá confirmamos
          estoque, formas de pagamento e dados de envio.
        </p>

        <h2>Quais são as formas de pagamento?</h2>
        <p>
          Aceitamos pagamentos via <strong>PIX</strong> (com 5% de desconto),
          transferência bancária e cartão de crédito (link de pagamento seguro),
          podendo parcelar suas compras conforme as condições vigentes.
        </p>

        <h2>A BijuLu possui loja física?</h2>
        <p>
          Sim! Temos um espaço físico onde você pode ver e provar nossas peças
          pessoalmente. Ficamos na Rua das Flores, 123 - Centro, São Paulo - SP.
          Será um prazer te receber!
        </p>

        <h2>As peças possuem garantia?</h2>
        <p>
          Sim. Todas as nossas peças possuem garantia contra defeitos de
          fabricação e problemas no banho. A garantia não cobre mau uso, como
          quebras, arranhões ou desgaste natural por contato com produtos
          químicos, água do mar/piscina, etc.
        </p>

        <h2>É seguro comprar?</h2>
        <p>
          Totalmente. Atuamos com transparência e temos endereço físico. Todas
          as transações são verificadas e seus dados são tratados com sigilo
          absoluto.
        </p>

        <p>Sua dúvida não está aqui?</p>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          <FaWhatsapp size={20} />
          Falar com Atendente
        </a>
      </div>
    </div>
  );
}
