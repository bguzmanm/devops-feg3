export default function About() {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log("Latitud es :", position.coords.latitude);
    console.log("Longitud es :", position.coords.longitude);
  });

  return (
    <div>
      <h2>Acerca de</h2>
      <p>Esta es la página de acerca de</p>
    </div>
  );
}
