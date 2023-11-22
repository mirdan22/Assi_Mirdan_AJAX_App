(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialList = document.querySelector("#material-list");
  const materialTemplate = document.querySelector("#material-template");
  const spinner = `<svg width="70" height="20" xmlns="http://www.w3.org/2000/svg" fill="#3498db">
  <circle cx="7" cy="15" r="7" />
  <circle cx="35" cy="15" r="7" />
  <circle cx="63" cy="15" r="7" />
</svg>`;

  // Links
  // API URLs
  const infoBoxesURL = "https://swiftpixel.com/earbud/api/materials";
  const dataURL = "https://randomuser.me/api/?results=20";
  const materialsBoxURL = "https://swiftpixel.com/earbud/api/material";

  // Flag to track error
  let errorOccurred = false;

  // Functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {
    function getData() {
      fetch(infoBoxesURL)
        .then(response => response.json())
        .then(info => {
          info.forEach((infoBox, index) => {
            let infoElement = document.querySelector(`#hotspot-${index + 1}`);

            const titleElement = document.createElement('h2');
            titleElement.textContent = infoBox.heading;

            const textElement = document.createElement('p');
            textElement.textContent = infoBox.description;

            const imgElement = document.createElement('img');
            imgElement.src = `images/${infoBox.thumbnail}`;

            infoElement.appendChild(titleElement);
            infoElement.appendChild(textElement);
            infoElement.appendChild(imgElement);
          });
        })
        .catch(error => {
          if (!errorOccurred) {
            console.error("Error loading info boxes:", error);
            alert("Something is wrong. Try again in a bit.");
            errorOccurred = true;
          }
        });
    }
    getData();
  }

  function getData() {
    materialList.innerHTML = spinner;
    fetch(dataURL)
      .then(response => response.json())
      .then(material => {
        let ul = document.createElement("ul");
        ul.id = "material-list";

        material.results.forEach(result => {
          var li = document.createElement("li");

          var img = document.createElement("img");
          img.src = result.picture.thumbnail;

          var h2 = document.createElement("h3");
          h2.textContent = `${result.name.first} ${result.name.last}`;

          var p = document.createElement("p");
          p.textContent = result.email;

          li.appendChild(img);
          li.appendChild(h2);
          li.appendChild(p);

          ul.appendChild(li);
        });

        materialList.innerHTML = "";
        materialList.appendChild(ul);
      })
      .catch(error => {
        if (!errorOccurred) {
          console.error("Error loading data:", error);
          alert("Something is wrong. Try again in a bit.");
          errorOccurred = true;
        }
      });
  }

  function loadMaterialsBox() {
    function getData() {
      fetch(materialsBoxURL)
        .then(response => response.json())
        .then(material => {
          let ul = document.createElement("ul");

          material.forEach(materialBox => {
            const li = document.createElement("li");

            const h3 = document.createElement("h3");
            h3.textContent = materialBox.heading;

            const p = document.createElement("p");
            p.textContent = materialBox.description;

            li.appendChild(h3);
            li.appendChild(p);
            ul.appendChild(li);
            materialList.appendChild(ul);
          });
        })
        .catch(error => {
          if (!errorOccurred) {
            console.error("Error loading materials box:", error);
            alert("Error, Please try again");
            errorOccurred = true;
          }
        });
    }
    getData();
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event Listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Initial Data Loading
  loadInfoBoxes();
  getData();
  loadMaterialsBox();
})();
