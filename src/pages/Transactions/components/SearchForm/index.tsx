import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchFormContainer } from "./style";

export default function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque por transações" />

      <button type="submit">
        <MagnifyingGlass size={20} />
        buscar
      </button>
    </SearchFormContainer>
  );
}
