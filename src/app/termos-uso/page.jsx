import styles from "../../styles/InformationPages.module.css";

export const metadata = {
  title: "Termos de Uso | BijuLu",
  description: "Regras de utilização do site BijuLu.",
};

export default function TermosUso() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Termos de Uso</h1>

      <div className={styles.content}>
        <p>
          Ao acessar o site da <strong>BijuLu</strong>, você concorda com os
          termos descritos abaixo. Nosso objetivo é oferecer um catálogo virtual
          organizado e transparente para facilitar suas compras.
        </p>

        <h2>1. Catálogo Virtual</h2>
        <p>
          Este site atua como uma vitrine virtual dos nossos produtos
          disponíveis na loja física. Embora nos esforcemos para manter o
          estoque e as informações sempre atualizados, pode haver pequenas
          divergências.
        </p>

        <h2>2. Disponibilidade e Preços</h2>
        <p>
          Os preços e a disponibilidade dos produtos exibidos no site estão
          sujeitos a alteração sem aviso prévio. A confirmação final da compra,
          valores e estoque é feita no momento do atendimento pelo{" "}
          <strong>WhatsApp</strong>.
        </p>
        <p>
          Caso um produto exibido já tenha sido vendido na loja física, nossa
          equipe informará prontamente e poderá sugerir peças similares.
        </p>

        <h2>3. Imagens dos Produtos</h2>
        <p>
          Trabalhamos com fotos reais de alta qualidade. No entanto, as cores
          podem sofrer pequenas variações dependendo da configuração da tela do
          seu celular ou monitor.
        </p>

        <h2>4. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo deste site (fotos, textos, logotipos) pertence à
          BijuLu. A reprodução sem autorização prévia é proibida.
        </p>

        <h2>5. Compras e Pagamentos</h2>
        <p>
          O site não processa pagamentos automáticos. Todas as transações
          financeiras são realizadas em ambiente seguro externo (link de
          pagamento, transferência bancária ou maquininha física), garantindo
          sua segurança.
        </p>
      </div>
    </div>
  );
}
