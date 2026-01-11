import { Truck, CreditCard, Gift, Gem } from "lucide-react";
import styles from "./FeaturesBar.module.css";

export default function FeaturesBar() {
  const features = [
    {
      icon: <Truck size={32} strokeWidth={1.5} />,
      title: "FRETE GRÁTIS",
      subtitle: "nas compras acima de R$100",
    },
    {
      icon: <CreditCard size={32} strokeWidth={1.5} />,
      title: "10% DE DESCONTO",
      subtitle: "NA PRIMEIRA COMPRA",
    },
    {
      icon: <Gift size={32} strokeWidth={1.5} />,
      title: "EMBALAGEM DE PRESENTE",
      subtitle: "por apenas R$10,00",
    },
    {
      icon: <Gem size={32} strokeWidth={1.5} />, // Usando Gem como icone de losango/pix aproximado
      title: "5% DE DESCONTO",
      subtitle: "PAGAMENTO VIA PIX",
    },
  ];

  return (
    <div className={styles.barWrapper}>
      <div className={styles.container}>
        {features.map((feature, index) => (
          <div className={styles.feature} key={index}>
            <div className={styles.iconWrapper}>{feature.icon}</div>
            <div className={styles.title}>{feature.title}</div>
            <div className={styles.subtitle}>{feature.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
