"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/config.ts
  var API_URL = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";

  // src/photoloader.ts
  function loadPicture(idPicture) {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(`${API_URL}/photos/${idPicture}/`, {
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = yield response.json();
        return data.photo;
      } catch (error) {
        console.error("Erreur lors de la r\xE9cup\xE9ration de la photo:", error);
        throw error;
      }
    });
  }

  // src/index.ts
  function getPicture(id) {
    return __async(this, null, function* () {
      try {
        const photo = yield loadPicture(id);
        console.log(`
--- Informations sur la photo ${id} ---`);
        console.log("Titre:", photo.titre);
        console.log("Type:", photo.type || photo.format);
        console.log("URL:", photo.url.href);
      } catch (error) {
        console.error(`Impossible d'afficher la photo ${id}:`, error);
      }
    });
  }
  getPicture(105);
  function checkHashForPicture() {
    const hash = window.location.hash;
    if (hash) {
      const id = parseInt(hash.substring(1));
      if (!isNaN(id)) {
        getPicture(id);
      }
    }
  }
  checkHashForPicture();
  window.addEventListener("hashchange", checkHashForPicture);
})();
//# sourceMappingURL=index.js.map
