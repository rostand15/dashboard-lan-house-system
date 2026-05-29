import MainLayout from "../../components/layout/MainLayout";

export default function Events() {
  const events = [
    { id: 1, title: "São João", date: "2026-06-20" },
    { id: 2, title: "Festival Cultural", date: "2026-06-25" },
    { id: 3, title: "Show Regional", date: "2026-07-01" },
  ];

  return (
    <MainLayout>
      <h1>Eventos</h1>

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{event.title}</h3>
          <p>{event.date}</p>
        </div>
      ))}
    </MainLayout>
  );
}