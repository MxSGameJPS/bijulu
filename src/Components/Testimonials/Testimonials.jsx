import { Star } from "lucide-react";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ana Clara",
      location: "São Paulo, SP",
      text: "Amei as semijoias! O acabamento é perfeito e a entrega foi super rápida. Com certeza comprarei mais vezes.",
      rating: 5,
    },
    {
      id: 2,
      name: "Beatriz Souza",
      location: "Curitiba, PR",
      text: "Estava procurando algo delicado para presentear minha mãe e a BijuLu foi a escolha ideal. O atendimento no WhatsApp fez toda a diferença.",
      rating: 5,
    },
    {
      id: 3,
      name: "Carla Mendes",
      location: "Rio de Janeiro, RJ",
      text: "As peças são ainda mais lindas pessoalmente. Dá para ver o carinho em cada detalhe da embalagem. Virei fã!",
      rating: 5,
    },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.title}>O que Nossas Clientes Dizem</h2>

      <div className={styles.container}>
        {testimonials.map((item) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.stars}>
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className={styles.text}>{item.text}</p>
            <div className={styles.author}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.location}>{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
