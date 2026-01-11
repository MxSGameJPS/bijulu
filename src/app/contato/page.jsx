import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import styles from "../../styles/InformationPages.module.css";

export const metadata = {
  title: "Fale Conosco | BijuLu",
  description: "Entre em contato com a equipe BijuLu.",
};

export default function Contato() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fale Conosco</h1>

      <div className={styles.content}>
        <p>
          Adoramos conversar com nossas clientes! Se você tem alguma dúvida
          sobre um produto, quer uma consultoria de estilo rápida ou precisa de
          ajuda com seu pedido, estamos à disposição.
        </p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: 0,
              }}
            >
              <FaWhatsapp style={{ color: "#25D366" }} /> WhatsApp
            </h2>
            <p>
              Nosso canal principal de vendas e atendimento. Respondemos
              rapidinho!
              <br />
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-destaque)", fontWeight: "bold" }}
              >
                (11) 99999-9999
              </a>
            </p>
          </div>

          <div>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: 0,
              }}
            >
              <FaInstagram style={{ color: "#C13584" }} /> Instagram
            </h2>
            <p>
              Siga a gente para ver novidades diárias, dicas de uso e
              bastidores.
              <br />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-destaque)", fontWeight: "bold" }}
              >
                @bijulu.oficial
              </a>
            </p>
          </div>

          <div>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: 0,
              }}
            >
              <FaEnvelope style={{ color: "#555" }} /> E-mail
            </h2>
            <p>
              Para assuntos administrativos ou parcerias.
              <br />
              <a
                href="mailto:contato@bijulu.com.br"
                style={{ color: "var(--color-destaque)", fontWeight: "bold" }}
              >
                contato@bijulu.com.br
              </a>
            </p>
          </div>

          <div>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: 0,
              }}
            >
              <FaMapMarkerAlt style={{ color: "#D4AF37" }} /> Loja Física
            </h2>
            <p>
              Venha tomar um café com a gente!
              <br />
              Rua das Flores, 123 - Centro, São Paulo - SP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
