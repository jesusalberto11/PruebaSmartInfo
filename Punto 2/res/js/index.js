const editMenu = (id, name, url, parentId, itemOrder) => {
  document.getElementById("edit-form-container").style.display = "block";
  document.getElementById("create-menu-form").style.display = "none";

  document.getElementById("editName").value = name;
  document.getElementById("editUrl").value = url;
  document.getElementById("EditingParentId").value = parentId;
  document.getElementById("editItemOrder").value = itemOrder;

  const select = document.getElementById("EditingParentId");

  for (let i = 0; i < select.options.length; i++) {
    select.options[i].disabled = select.options[i].value == id;
  }

  document.getElementById("EditingParentId").value = parentId;

  document.getElementById("edit-menu-form").onsubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      id: id,
      name: document.getElementById("editName").value,
      url: document.getElementById("editUrl").value,
      parentId: document.getElementById("EditingParentId").value,
      itemOrder: document.getElementById("editItemOrder").value,
    };

    try {
      await fetch(
        `../../api/update.php?id=${updatedData.id}&name=${updatedData.name}&url=${updatedData.url}&parentId=${updatedData.parentId}&itemOrder=${updatedData.itemOrder}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
          },
        }
      ).then(() => {
        alert("Menú actualizado con éxito");
        window.location = "/index.php";
      });
    } catch (error) {
      console.error("[ERROR] - Can't update menu into API!:", error);
    }
  };
};

const deleteMenu = async (id) => {
  if (!window.confirm("¿Realmente deseas eliminar este elemento?")) return;

  try {
    await fetch(`../../api/delete.php?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    }).then(() => {
      alert("Menu eliminado");
      window.location = "/index.php";
    });
  } catch (error) {
    console.error("[ERROR] - Can't delete menu into API!: ", error);
    throw error;
  }
};
