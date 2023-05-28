import { useState } from "react";
import RessourceCategorie from "./RessourceCategorie";

const Categorie = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [name, setName] = useState("");

  const category = [
    { id: 1, name: `programmation` },
    { id: 2, name: `Foot` },
    { id: 3, name: `Actualité` },
  ];

  const handleAddCategory = (newCategory) => {
    setCategories([...category, newCategory]);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCategory = { id: category.length + 1, name };
    handleAddCategory(newCategory);
    setName("");
  };
  // probleme à regler : a chaque raffraichiseement les categories disparaissent ,
  // il faut ajouter un form qui permet aux users d'ajouter directement leur link ds la catégorie
  // il faut regler l'affichage des link des lors que je clique sur catégorie
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="nom de la catégorie"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" />
      </form>
      <section>
        {categories.map((category) => (
          <article
            key={category.id}
            onClick={() => handleSelectCategory(category.id)}
          >
            <p>{category.name}</p>
          </article>
        ))}
      </section>
      <section>
        <RessourceCategorie selectedCategory={selectedCategory} />
      </section>
    </div>
  );
};
export default Categorie;
