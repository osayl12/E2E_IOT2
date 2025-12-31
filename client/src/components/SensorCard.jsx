export default function SensorCard({ label, value, unit }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h4>{label}</h4>
      <p>{value} {unit}</p>
    </div>
  );
}
