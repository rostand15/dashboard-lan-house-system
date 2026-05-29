import MainLayout from "../../components/layout/MainLayout";

export default function Alerts() {
  const alerts = [
    "Sistema atualizado",
    "Novo evento adicionado",
    "Manutenção programada",
  ];

  return (
    <MainLayout>
      <h1>Alertas</h1>

      <ul>
        {alerts.map((alert, i) => (
          <li key={i}>{alert}</li>
        ))}
      </ul>
    </MainLayout>
  );
}