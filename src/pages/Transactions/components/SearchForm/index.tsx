import { MagnifyingGlass } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./style";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormScheme = z.object({
  query: z.string(),
});

type SeachFormInputs = z.infer<typeof searchFormScheme>;

export default function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SeachFormInputs>({
    resolver: zodResolver(searchFormScheme),
  });

  async function handleSearchTransactions(data: SeachFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        buscar
      </button>
    </SearchFormContainer>
  );
}
