  const initializeHearts = () => {
    // Haal al de html elementen op met de klasse 'heart' en steek ze in een array.
  const hearts = document.getElementsByClassName("heart");
  
  // loop over de array en voeg een eventListener aan elk html element toe.
  // voeg de class red toe, als deze die al heeft wordt die verwijderdt.
  for (const heart of hearts) {
    heart.addEventListener("click", function () {
      heart.classList.toggle("red");
    });
  }
  };
  
  export default initializeHearts;