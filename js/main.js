function addToDo() {
  const input = document.getElementById("text");
  const text = input.value.trim();
if(text === "")return ;
  const li = document.createElement("li");

  li.innerHTML = `<span> ${text}</span><button onclick = "deleteToDo(this)">delete</button>`;

  const ul = document.getElementById("taskList");
  ul.appendChild(li);
  input.value = "";
}

function deleteToDo(button) {
  const li = button.parentElement;
  li.remove();
}
