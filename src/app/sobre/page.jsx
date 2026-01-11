import Image from "next/image";
import styles from "../../styles/InformationPages.module.css";

export const metadata = {
  title: "Sobre Nós | BijuLu",
  description: "Conheça a história da BijuLu Joias e Acessórios.",
};

export default function Sobre() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sobre a BijuLu</h1>

      <div className={styles.content}>
        <p>
          Bem-vinda ao mundo <strong>BijuLu</strong>!
        </p>
        <p>
          Muito mais do que uma loja de joias e acessórios, somos um espaço
          dedicado a realçar a beleza e a autoestima de cada mulher. Nascemos do
          sonho de oferecer peças exclusivas, que unem sofisticação, qualidade e
          aquele toque especial que faz toda a diferença no seu look.
        </p>
        <p>
          Nossa curadoria é feita com todo o carinho, buscando sempre as últimas
          tendências do mercado sem abrir mão do clássico e do atemporal.
          Trabalhamos com semijoias de alto padrão, banhadas a ouro 18k e prata,
          além de uma linha completa de maquiagens e acessórios para você se
          sentir completa.
        </p>

        <h2>Nossa Missão</h2>
        <p>
          Proporcionar elegância e confiança através de acessórios acessíveis e
          de alta qualidade, oferecendo um atendimento próximo e personalizado
          que faz você se sentir em casa.
        </p>

        <h2>Loja Física</h2>
        <p>
          Acreditamos no poder do olho no olho. Por isso, além do nosso catálogo
          virtual, convidamos você a conhecer nosso espaço físico. Aqui você
          pode provar, combinar e sentir a qualidade de cada peça de pertinho.
        </p>
        <p>
          <strong>Estamos te esperando:</strong>
          <br />
          Rua das Flores, 123 - Centro
          <br />
          São Paulo - SP
        </p>
      </div>
    </div>
  );
}
