import { FaWhatsapp } from "react-icons/fa";
import styles from "../../styles/InformationPages.module.css";

export const metadata = {
  title: "Trocas e Devoluções | BijuLu",
  description: "Política de trocas e devoluções da BijuLu.",
};

export default function TrocasDevolucoes() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trocas e Devoluções</h1>

      <div className={styles.content}>
        <p>
          A <strong>BijuLu</strong> preza pela total satisfação de seus clientes
          e pelo respeito ao Código de Defesa do Consumidor. Criamos uma
          política de trocas e devoluções transparente para que você se sinta
          seguro(a) ao adquirir nossas peças exclusivas.
        </p>

        <h2>1. Condições Gerais</h2>
        <p>
          Para que a troca ou devolução seja efetuada, o produto deve estar nas
          mesmas condições em que foi recebido:
        </p>
        <ul>
          <li>Na embalagem original;</li>
          <li>Sem indícios de uso, odores ou danos acidentais;</li>
          <li>Acompanhado de todas as etiquetas e acessórios (se houver).</li>
        </ul>

        <h2>2. Prazo para Solicitação</h2>
        <p>
          <strong>Arrependimento da Compra:</strong> Conforme o art. 49 do CDC,
          você tem até <strong>7 (sete) dias corridos</strong>, contados a
          partir do recebimento, para solicitar a devolução por arrependimento.
        </p>
        <p>
          <strong>Defeito de Fabricação:</strong> Caso a peça apresente algum
          defeito, o prazo para solicitação de troca é de até{" "}
          <strong>30 (trinta) dias corridos</strong> após o recebimento.
        </p>

        <h2>3. Como Solicitar</h2>
        <p>
          Como nosso atendimento é personalizado, todo o processo é feito
          diretamente pelo nosso WhatsApp. Entre em contato conosco informando
          seu nome e o motivo da troca/devolução. Nossa equipe irá orientá-lo(a)
          sobre os próximos passos, incluindo como nos enviar a peça de volta.
        </p>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          <FaWhatsapp size={20} />
          Solicitar Troca via WhatsApp
        </a>
      </div>
    </div>
  );
}
