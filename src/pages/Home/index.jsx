import MainLayout from "../../components/layout/MainLayout";
import EventCalendar from "../../components/events/EventCalendar";

export default function Home() {
  return (
    <MainLayout>

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px",
          color: "#0f172a",
        }}
      >
        Agenda Turística de Campina Grande
      </h1>

      <p
        style={{
          color: "#475569",
          marginBottom: "30px",
          fontSize: "18px",
        }}
      >
        Descubra eventos culturais, shows,
        feiras e atrações da cidade.
      </p>

      <EventCalendar />

    </MainLayout>
  );
}