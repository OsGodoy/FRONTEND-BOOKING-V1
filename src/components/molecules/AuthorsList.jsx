import { useApiData } from "../../hooks/useApiData";
import { UlContainerCenter } from "../atoms/UlContainer";

const AuthorsList = () => {
  const { authors = [], isLoading, error } = useApiData();

  return (
    <UlContainerCenter className="p-2 gap-4 text-neutral-400 text-sm">
      {isLoading && <li>Cargando...</li>}
      {error && <li>Error</li>}
      {!isLoading && !error && authors.length === 0 && <li>No hay autores</li>}

      {authors.map((author) => (
        <li key={author.id}>
          <h3>
            {author.name} {author.lastname}
          </h3>
        </li>
      ))}
      {authors.map((author) => (
        <li key={author.id}>
          <h3>
            {author.name} {author.lastname}
          </h3>
        </li>
      ))}
      {authors.map((author) => (
        <li key={author.id}>
          <h3>
            {author.name} {author.lastname}
          </h3>
        </li>
      ))}
    </UlContainerCenter>
  );
};

export default AuthorsList;
