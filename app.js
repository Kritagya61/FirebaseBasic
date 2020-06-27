const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

function rendercafe(doc) {
  let city = document.createElement("span");
  let li = document.createElement("li");
  let name = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "X";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  cafeList.appendChild(li);

  cross.addEventListener("click", e => {
      
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes")
      .doc(id)
      .delete();
  });
}

db.collection("cafes")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      rendercafe(doc);
    });
  });

form.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form.name-name.value,
    city: form.city.value
  });
  form.name-name.value = "";
  form.city.value = "";
});
