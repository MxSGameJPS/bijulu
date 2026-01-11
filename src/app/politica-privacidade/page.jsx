import styles from "../../styles/InformationPages.module.css";

export const metadata = {
  title: "Política de Privacidade | BijuLu",
  description: "Como tratamos os seus dados na BijuLu.",
};

export default function PoliticaPrivacidade() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Política de Privacidade</h1>

      <div className={styles.content}>
        <p>
          Na <strong>BijuLu</strong>, privacidade é coisa séria. Queremos que
          você se sinta confortável e segura ao navegar pelo nosso catálogo
          virtual. Esta política explica de forma clara como cuidamos das suas
          informações.
        </p>

        <h2>1. Coleta de Dados</h2>
        <p>
          Nosso site funciona principalmente como um catálogo digital. Não
          coletamos dados de cartão de crédito ou bancários diretamente pela
          plataforma web, pois o pagamento é finalizado de forma segura via
          WhatsApp ou presencialmente.
        </p>
        <p>
          Podemos coletar dados básicos de navegação (cookies) para melhorar a
          performance do site e entender quais produtos vocês mais amam.
        </p>

        <h2>2. Uso das Informações</h2>
        <p>
          Os dados fornecidos por você no momento do contato pelo WhatsApp (como
          nome, endereço e telefone) são utilizados exclusivamente para:
        </p>
        <ul>
          <li>Processar e entregar seu pedido;</li>
          <li>Enviar o código de rastreio;</li>
          <li>Tirar dúvidas e prestar suporte.</li>
        </ul>

        <h2>3. Compartilhamento</h2>
        <p>
          Nós <strong>não vendemos nem compartilhamos</strong> seus dados
          pessoais com terceiros para fins de marketing. Seus dados de endereço
          são compartilhados apenas com as empresas de logística
          (Correios/Transportadoras) estritamente para que a entrega seja
          realizada.
        </p>

        <h2>4. Segurança</h2>
        <p>
          Adotamos as melhores práticas para manter seus dados seguros. Se tiver
          qualquer dúvida sobre como protegemos suas informações, fique à
          vontade para nos chamar.
        </p>

        <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#999" }}>
          Última atualização: Janeiro de 2026.
        </p>
      </div>
    </div>
  );
}
