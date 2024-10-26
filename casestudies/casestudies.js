document.addEventListener("DOMContentLoaded", function() {
    const fruit = document.querySelector('.movingfruit');
  
    function moveFruit() {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
  
      const randomTop = Math.random() * (viewportHeight - fruit.offsetHeight);
      const randomLeft = Math.random() * (viewportWidth - fruit.offsetWidth);
  
      fruit.style.top = `${randomTop}px`;
      fruit.style.left = `${randomLeft}px`;
    }
  
    setInterval(moveFruit, 100); // Move the fruit every 1 second
  });