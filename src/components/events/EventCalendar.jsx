import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = [
  {
    title: "Maior São João do Mundo",
    date: "2026-06-10",
  },

  {
    title: "Festival de Inverno",
    date: "2026-07-15",
  },

  {
    title: "Feira de Artesanato",
    date: "2026-08-02",
  },

  {
    title: "Show Cultural no Parque do Povo",
    date: "2026-06-18",
  },
];

export default function EventCalendar() {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
      />
    </div>
  );
}