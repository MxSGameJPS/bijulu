import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import styles from "../../styles/AdminDashboard.module.css";

// Este layout se aplica a TODAS as páginas dentro de /admin/*
export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
