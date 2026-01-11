import { FaWhatsapp } from "react-icons/fa";
import styles from "../../styles/InformationPages.module.css";

export const metadata = {
  title: "Prazos e Entregas | BijuLu",
  description: "Informações sobre envios e prazos de entrega.",
};

export default function PrazosEntrega() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Prazos e Entregas</h1>

      <div className={styles.content}>
        <p>
          Nossas peças são enviadas com todo o carinho e cuidado que você
          merece. Abaixo, explicamos como funciona nosso processo de envio e
          entrega.
        </p>

        <h2>1. Cálculo de Frete</h2>
        <p>
          O valor do frete e o prazo de entrega variam de acordo com o seu
          endereço e a modalidade de envio escolhida (Sedex, PAC ou Loggi).
        </p>
        <p>
          No momento de finalizar seu pedido pelo <strong>WhatsApp</strong>,
          nossa equipe fará a cotação em tempo real e informará as opções
          disponíveis para o seu CEP.
        </p>

        <h2>2. Retirada na Loja</h2>
        <p>
          Se você mora na região, oferecemos a opção de{" "}
          <strong>Retirada Grátis</strong> em nossa loja física. Assim que seu
          pedido estiver separado e embalado, avisaremos para que você possa
          buscá-lo.
        </p>
        <ul>
          <li>
            <strong>Endereço:</strong> Rua das Flores, 123 - Centro, São Paulo -
            SP
          </li>
          <li>
            <strong>Horário:</strong> Segunda a Sexta das 09h às 18h / Sábado
            das 09h às 13h
          </li>
        </ul>

        <h2>3. Envio e Rastreio</h2>
        <p>
          Após a confirmação do pagamento, temos um prazo de até{" "}
          <strong>2 dias úteis</strong> para separação e postagem do seu pedido.
          Assim que postado, você receberá o código de rastreio diretamente no
          seu WhatsApp para acompanhar a chegada das suas joias.
        </p>

        <p>Está com dúvida sobre o frete para sua cidade? Chame a gente!</p>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          <FaWhatsapp size={20} />
          Cotar Frete no WhatsApp
        </a>
      </div>
    </div>
  );
}
